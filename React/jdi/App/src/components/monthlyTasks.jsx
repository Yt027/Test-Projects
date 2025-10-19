import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";

const MonthlyTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // --- 1️⃣ Lire dynamiquement les couleurs DaisyUI
  const readCSS = (name) =>
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || null
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
    text: pick(["--bc", "--base-content"], "#1f2937"),
    bg: pick(["--b1", "--base-100"], "#ffffff"),
  });

  const [colors, setColors] = useState(getThemeColors());

  // Observer les changements de thème DaisyUI
  useEffect(() => {
    const reload = () => setColors(getThemeColors());
    const obs = new MutationObserver(reload);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("load", reload);
    return () => {
      obs.disconnect();
      window.removeEventListener("load", reload);
    };
  }, []);

  // --- 2️⃣ Générer les 30 derniers jours
  const last30Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d);
    }
    return days;
  }, []);

  // --- 3️⃣ Calculer le nombre de tâches accomplies chaque jour
  const dailyCounts = useMemo(() => {
    const map = {};
    last30Days.forEach((d) => {
      const key = d.toISOString().split("T")[0];
      map[key] = 0;
    });

    tasks.forEach((task) => {
      if (task.done) {
        const key = new Date(task.registration).toISOString().split("T")[0];
        if (map[key] !== undefined) map[key] += 1;
      }
    });

    return map;
  }, [tasks, last30Days]);

  const seriesData = last30Days.map((d) => {
    const key = d.toISOString().split("T")[0];
    return dailyCounts[key] || 0;
  });

  const categories = last30Days.map((d) =>
    d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
  );

  // --- 4️⃣ Config ApexCharts (line chart)
  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      background: "transparent",
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    title: {
      text: "Tâches du mois dernier",
      align: "center",
      style: {
        color: colors.text,
        fontSize: "14px",
        fontWeight: 600,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      colors: colors.primary,
      strokeColors: colors.bg,
      strokeWidth: 2,
    },
    colors: [colors.primary],
    xaxis: {
      categories,
      labels: {
        rotate: -45,
        style: { colors: Array(30).fill(colors.text), fontSize: "10px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      labels: { style: { colors: [colors.text], fontSize: "12px" } },
    },
    grid: {
      borderColor: colors.bg,
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
    }
  };

  const series = [{ name: "Tâches accomplies", data: seriesData }];

  return (
    <div className="overflow-y-hidden pr-5">
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
};

export default MonthlyTasks;