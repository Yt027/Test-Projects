import TaskHeatmap from "../components/heatmap";
import Histogram from "../components/histogram";
import MonthlyTasks from "../components/monthlyTasks";

function Stats() {
    return (
        <div className="bg-base-300 p-4 rounded-xl shadow-md">
            <h2 className="text-center text-lg font-semibold mb-6">Statistiques</h2>
            <div className="charts flex flex-col gap-6">
                <TaskHeatmap />
                <Histogram />
                <MonthlyTasks />
            </div>
        </div>
    )
}

export default Stats