import TaskHeatmap from "../components/heatmap";
import Histogram from "../components/histogram";
import MonthlyTasks from "../components/monthlyTasks";

function Stats() {
    return (
        <>
            <TaskHeatmap />
            <Histogram />
            <MonthlyTasks />
        </>
    )
}

export default Stats