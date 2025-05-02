"use client";
import { Inter } from "next/font/google";
import { LeftSideBar } from "./left-side-bar";
import { useState } from "react";
import { ProjectsComponent } from "./projects-component";


const interFont = Inter({
    subsets: ["latin"],
});



const DashboardPage = () => {


    const [selectedItem, setSelectedItem] = useState("Projects");

    const onItemChange = (item: string) => {
        setSelectedItem(item);
    }


    return (
        <div className="flex flex-row md:flex-row min-h-screen bg-gray-900 text-white">
            <LeftSideBar onChangeItem={onItemChange} />
            <div className="w-full flex-1 p-3 md:p-6 overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
                    <div className="flex flex-col justify-start items-start">
                        <h4 className={`font-semibold text-xl md:text-2xl ${interFont.className}`}>
                            Welcome back, Armaan
                        </h4>
                        <h5 className={`text-gray-400 text-sm ${interFont.className}`}>
                            May 1, 2025
                        </h5>
                    </div>

                </div>
                <div className="w-full">
                    {selectedItem == "Projects" && (
                        <>
                            <ProjectsComponent />
                        </>
                    )}

                    {selectedItem == "Messages" && (
                        <>
                            hi im msgses
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;