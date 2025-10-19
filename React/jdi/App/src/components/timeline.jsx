import React, { useMemo } from "react";

/**
 * TaskTimeline
 * Affiche toutes les tâches sous forme de timeline chronologique.
 *
 * Les tâches doivent avoir la structure :
 * { name, priority, done, registration }
 */
const TaskTimeline = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // --- Trier les tâches par date croissante
  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => new Date(a.registration) - new Date(b.registration)
    );
  }, [tasks]);

  // --- Fallback si aucune tâche
  if (sortedTasks.length === 0) {
    return (
      <div className="p-6 text-center text-base-content/70 italic">
        Aucune tâche enregistrée pour le moment...
      </div>
    );
  }

  // --- Fonction utilitaire pour afficher la date lisible
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- Couleur selon priorité ou statut
  const getBadgeClass = (task) => {
    if (task.done) return "badge-success";
    if (task.priority === 3) return "badge-error";
    if (task.priority === 2) return "badge-warning";
    return "badge-soft";
  };

  // --- Rendu principal
  return (
    <div className="bg-base-300 p-4 rounded-xl shadow-md">
      <h2 className="text-center text-lg font-semibold mb-6">
        Historique des tâches
      </h2>

      <div className="relative border-l border-base-content/20 pl-6 space-y-6">
        {sortedTasks.map((task, i) => (
          <div key={i} className="relative">
            {/* Point de la timeline */}
            <div className="absolute -left-[32px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-base-300" />

            {/* Carte de tâche */}
            <div
              className={`p-3 rounded-lg bg-base-100 shadow-sm border border-base-200 ${
                task.done ? "opacity-80" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-semibold ${
                    task.done ? "line-through text-base-content/70" : ""
                  }`}
                >
                  {task.name}
                </h3>
                <span className={`badge ${getBadgeClass(task)} text-xs`}>
                  {task.done ? "Terminée" : "En cours"}
                </span>
              </div>
              <p className="text-sm text-base-content/70 mt-1">
                Créée le {formatDate(task.registration)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTimeline;
