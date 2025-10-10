import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";

const Histogram = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // --- 1️⃣ Lire les variables DaisyUI dynamiquement
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
  });

  const [colors, setColors] = useState(getThemeColors());

  // Observer le changement de thème DaisyUI
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

  // --- 2️⃣ Calculer les tâches accomplies sur les 7 derniers jours
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

  // --- 3️⃣ Config ApexCharts
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
      borderColor: colors.bg,
      strokeDashArray: 4,
      padding: { left: 10, right: 10 },
    },
    tooltip: {
      theme:
        document.documentElement.getAttribute("data-theme") === "night"
          ? "dark"
          : "light",
      y: {
        formatter: (val) => `${val} tâche${val > 1 ? "s" : ""}`,
      },
    },
  };

  const series = [{ name: "Tâches accomplies", data: seriesData }];

  // --- 4️⃣ Rendu
  return (
    <div className="bg-base-300 p-4 rounded-xl shadow-md">
      <Chart options={options} series={series} type="bar" height={260} />
    </div>
  );
};

export default Histogram;
