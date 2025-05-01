import { Inter } from "next/font/google";
import { LeftSideBar } from "./left-side-bar";
import { TasksRow } from "./tasks-row";

const interFont = Inter({
    subsets: ["latin"],
});

const DashboardPage = () => {
    return (
        <div className="dashboardPage flex flex-col md:flex-row  min-h-screen">
            <LeftSideBar />
            <div className="content w-full px-4 md:ml-4 flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col justify-start items-start">
                        <h4 className={`font-semibold text-2xl mt-4 ${interFont.className}`}>Welcome back, Armaan</h4>
                        <h5 className={`text-gray-400 ${interFont.className}`}>May 1, 2025</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center">
                    <TasksRow />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;