import React, { useEffect, useMemo, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

/**
 * TaskHeatmapDaisy
 * Props:
 *  - tasks: [{ name, priority, done, registration }]
 *  - numDays: nombre de jours à afficher (par défaut 365)
 */
const TaskHeatmapDaisy = ({ numDays = 365 }) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // --- 1️⃣ Lecture des variables CSS DaisyUI
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

  const getColorsFromTheme = () => ({
    base: pick(["--b2", "--base-200", "--b1"], "#e5e7eb"), // case vide
    successLight: pick(["--su", "--success", "--success-200"], "#bbf7d0"),
    success: pick(["--sa", "--accent", "--success-500"], "#4ade80"),
    successStrong: pick(["--p", "--primary", "--success-700"], "#15803d"),
    text: pick(["--bc", "--base-content"], "#1f2937"),
    bg: pick(["--b1", "--base-100"], "#ffffff"),
  });

  const [colors, setColors] = useState(getColorsFromTheme());

  // --- 2️⃣ Surveiller le thème DaisyUI
  useEffect(() => {
    const reload = () => setColors(getColorsFromTheme());
    const obs = new MutationObserver(reload);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("load", reload);
    return () => {
      obs.disconnect();
      window.removeEventListener("load", reload);
    };
  }, []);

  // --- 3️⃣ Compter les tâches accomplies par jour
  const dailyCounts = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (t.done) {
        const key = new Date(t.registration).toISOString().split("T")[0];
        map[key] = (map[key] || 0) + 1;
      }
    });
    return map;
  }, [tasks]);

  // --- 4️⃣ Préparer les dates et valeurs
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (numDays - 1));

  const values = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split("T")[0];
    values.push({ date: key, count: dailyCounts[key] || 0 });
  }

  // --- 5️⃣ Déterminer la couleur selon le nombre de tâches
  const getColorForCount = (count) => {
    if (!count || count <= 0) return colors.base;
    if (count === 1) return colors.successLight;
    if (count <= 3) return colors.success;
    return colors.successStrong;
  };

  // --- 6️⃣ Customisation des cellules SVG
  const transformDayElement = (rect, value) => {
    const date = value?.date ?? "";
    const count = value?.count ?? 0;
    const fill = getColorForCount(count);
    const stroke = colors.bg;
    const title = `${date}: ${count} tâche${count > 1 ? "s" : ""}`;
    return React.cloneElement(rect, {
      style: { fill, stroke, rx: 4, ry: 4 },
      title,
    });
  };

  // --- 7️⃣ Rendu
  return (
    <div
      className="
        bg-base-300 
        p-3 
        rounded-xl 
        shadow-md 
        overflow-x-auto 
        overflow-y-hidden 
        scrollbar-thin 
        scrollbar-thumb-base-300 
        scrollbar-track-base-200
      "
    >
      <div className="min-w-[800px]">
        <CalendarHeatmap
          startDate={start}
          endDate={end}
          values={values}
          gutterSize={6}
          showWeekdayLabels={true}
          transformDayElement={transformDayElement}
        />
      </div>
    </div>
  );
};

export default TaskHeatmapDaisy;