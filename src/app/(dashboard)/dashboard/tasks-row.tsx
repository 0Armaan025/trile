import { Loader, CheckCircle, Grid, MessageSquare } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";

const interFont = Inter({
    subsets: ["latin"],
});

export const TasksRow = () => {
    return (
        <div className="tasks-row flex flex-col md:flex-row justify-start mt-4 items-start w-full gap-4">
            {/* Tasks Left */}
            <TasksLeft />

            {/* Tasks Report */}
            <TasksReport />

            {/* On Review Tasks */}
            <OnReviewTasks />
        </div>
    );
}

const TasksLeft = () => {
    return (
        <div className="bg-[#1a1a1a] w-full md:w-56 h-60 px-1 py-4 flex flex-col justify-start items-start rounded-xl">
            <h4 className={`ml-4 mt-4 ${interFont.className} text-gray-400`}>Tasks Left</h4>
            <h2 className="ml-4 text-3xl mt-2 font-semibold">4</h2>
            <div className="relative w-full h-16">
                <Image src="https://cdn-icons-png.flaticon.com/256/6857/6857494.png" alt="tasks" height={120} width={120} className="absolute left-30 bottom-4 z-9" />
            </div>
            <div className="flex flex-row justify-center items-center mt-4 w-full">
                <button className={`mx-4 bg-[#1c182b] cursor-pointer hover:bg-[#29243d] transition-all w-full h-12 rounded-lg text-white ${interFont.className}`}>
                    Add a task
                </button>
            </div>
        </div>
    );
}

const taskData = [
    {
        label: "Done",
        count: 12,
        Icon: CheckCircle,
    },
    {
        label: "In Progress",
        count: 12,
        Icon: Loader,
    },
    {
        label: "To do",
        count: 12,
        Icon: Grid,
    },
];

const TasksReport = () => {
    return (
        <div className="flex flex-wrap justify-between bg-[#1a1a1a] w-full md:flex-1 h-60 rounded-xl p-4 md:p-8">
            {taskData.map(({ label, count, Icon }, idx) => (
                <div key={idx} className="flex flex-col justify-center items-center flex-1 my-2">
                    <div className="bg-[#d6fef4] w-12 h-12 p-2 rounded-full flex items-center justify-center mb-2">
                        <Icon color="black" size={24} />
                    </div>
                    <h3 className="text-gray-400">{label}</h3>
                    <h3 className={`mt-2 text-3xl md:text-5xl font-semibold ${interFont.className}`}>{count}</h3>
                </div>
            ))}
        </div>
    );
};

const reviewTasks = [
    {
        task: "Fix homepage layout",
        comments: 3,
        assignee: "Sarah Kim"
    },
    {
        task: "Update API endpoints",
        comments: 5,
        assignee: "John Doe"
    },
    {
        task: "Create new dashboard",
        comments: 2,
        assignee: "Priya Sharma"
    }
];

const OnReviewTasks = () => {
    return (
        <div className="bg-[#1a1a1a] w-[35rem] md:w-[35rem] h-[28rem] overflow-y-scroll rounded-xl p-4 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h4 className={`${interFont.className} text-gray-400`}>On Review</h4>
                <span className="bg-[#1c182b] px-2 py-1 rounded-md text-sm">{reviewTasks.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto">
                {reviewTasks.map((task, idx) => (
                    <div key={idx} className="border-b border-gray-800 py-2 last:border-none">
                        <h5 className="font-medium truncate">{task.task}</h5>
                        <div className="flex justify-between mt-1">
                            <div className="flex items-center text-gray-400 text-xs">
                                <MessageSquare size={12} className="mr-1" />
                                <span>{task.comments} comments</span>
                            </div>
                            <div className="bg-[#29243d] px-2 py-1 rounded-md text-xs">
                                {task.assignee}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};