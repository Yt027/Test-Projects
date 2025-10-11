import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";

const Histogram = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // --- 1️⃣ Lecture des variables CSS DaisyUI dynamiquement
  const readCSS = (name) =>
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim() || null
      : null;

  const pick = (names, fallback) => {
    for (const n of names) {
      const v = readCSS(n);
      if (v) return v;
    }
    return fallback;
  };

  const getThemeColors = () => ({
    primary: pick(["--p", "--primary"], "#22c55e"),
    accent: pick(["--a", "--accent"], "#4ade80"),
    text: pick(["--bc", "--base-content"], "#1f2937"),
    bg: pick(["--b1", "--base-100"], "#ffffff"),
    surface: pick(["--b2", "--base-200"], "#e5e7eb"),
    hover: pick(["--pf", "--primary-focus"], "#16a34a"),
  });

  const [colors, setColors] = useState(getThemeColors());

  // --- 2️⃣ Observer le changement de thème DaisyUI
  useEffect(() => {
    const reload = () => setColors(getThemeColors());
    const obs = new MutationObserver(reload);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("load", reload);
    return () => {
      obs.disconnect();
      window.removeEventListener("load", reload);
    };
  }, []);

  // --- 3️⃣ Calcul des données
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d);
    }
    return days;
  }, []);

  const dataByDay = useMemo(() => {
    const counts = {};
    last7Days.forEach((d) => {
      const key = d.toISOString().split("T")[0];
      counts[key] = 0;
    });

    tasks.forEach((task) => {
      if (task.done) {
        const key = new Date(task.registration).toISOString().split("T")[0];
        if (counts.hasOwnProperty(key)) {
          counts[key] += 1;
        }
      }
    });

    return counts;
  }, [tasks, last7Days]);

  const seriesData = last7Days.map((d) => {
    const key = d.toISOString().split("T")[0];
    return dataByDay[key] || 0;
  });

  const categories = last7Days.map((d) =>
    d.toLocaleDateString("fr-FR", { weekday: "short" })
  );

  // --- 4️⃣ Config ApexCharts stylée avec DaisyUI
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    title: {
      text: "Tâches des 7 derniers jours",
      align: "center",
      style: {
        color: colors.text,
        fontSize: "14px",
        fontWeight: 600,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "50%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    colors: Array(7).fill(colors.primary),
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.5,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.8,
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: Array(7).fill(colors.text),
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: [colors.text],
          fontSize: "12px",
        },
      },
      min: 0,
      forceNiceScale: true,
    },
    grid: {
      borderColor: colors.surface,
      strokeDashArray: 4,
      padding: { left: 10, right: 10 },
    },
    tooltip: {
      theme:
        document.documentElement.getAttribute("data-theme") === "night"
          ? "dark"
          : "light",
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      fillSeriesColor: false,
      marker: { show: false },
      y: {
        formatter: (val) => `${val} tâche${val > 1 ? "s" : ""}`,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const label = w.globals.labels[dataPointIndex];
        const bg = colors.surface;
        const text = colors.text;
        return `
          <div style="
            background:${bg};
            color:${text};
            padding:6px 10px;
            border-radius:6px;
            font-size:12px;
            box-shadow:0 2px 6px rgba(0,0,0,0.15);
          ">
            <strong>${label}</strong><br/>
            ${value} tâche${value > 1 ? "s" : ""}
          </div>`;
      },
    },
  };

  const series = [{ name: "Tâches accomplies", data: seriesData }];

  // --- 5️⃣ Rendu
  return (
    <div className="">
      <Chart options={options} series={series} type="bar" height={260} />
    </div>
  );
};

export default Histogram;