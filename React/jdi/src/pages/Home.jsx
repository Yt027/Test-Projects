import { useState, useEffect } from 'react';
import { CheckCircle2, ListTodo, Target } from 'lucide-react';

function Home() {
    const [summary, setSummary] = useState({
        username: "Utilisateur",
        todaysPendingTasks: 0,
        completedTasks: 0,
    });

    useEffect(() => {
        // On utilise un écouteur pour mettre à jour le résumé si les tâches changent dans un autre onglet
        const handleStorageChange = () => {
            const storedUsername = localStorage.getItem("username") || "Utilisateur";
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            const today = new Date();
            const todaysPendingTasks = tasks.filter(task => task.done === false).length;

            const completedTasks = tasks.filter(task => task.done).length;

            setSummary({
                username: storedUsername,
                todaysPendingTasks,
                completedTasks,
            });
        };

        handleStorageChange(); // Appel initial
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="self-center flex flex-col gap-8 p-4 bg-base-300 rounded-2xl">
            {/* --- Header --- */}
            <header className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    Bonjour, {summary.username} !
                </h1>
                <p className="text-base-content/70">
                    Prêt à conquérir votre journée ? Voici un résumé de votre activité.
                </p>
            </header>

            {/* --- Stats Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="stat-card bg-base-100 p-5 rounded-2xl flex flex-direction-[row-reverse] items-center gap-5">
                    <div className="stat-icon bg-primary text-primary-content w-14 h-14 rounded-full flex items-center justify-center">
                        <Target className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-base-content/70 font-medium">À faire</h3>
                        <p className="text-3xl font-bold">{summary.todaysPendingTasks}</p>
                    </div>
                </div>

                <div className="stat-card bg-base-100 p-5 rounded-2xl flex items-center gap-5">
                    <div className="stat-icon bg-success text-success-content w-14 h-14 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-base-content/70 font-medium">Accomplies</h3>
                        <p className="text-3xl font-bold">{summary.completedTasks}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;