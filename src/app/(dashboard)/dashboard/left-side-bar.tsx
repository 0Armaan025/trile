import Image from "next/image";
import localFont from 'next/font/local';
import { useState } from "react";

const gramatikaFont = localFont({ src: './gramatika.ttf' });

interface SideBarItemProps {
    onChangeItem: (item: string) => void;
}

const SideBarItems = [
    {
        logo: "https://cdn-icons-png.flaticon.com/128/1632/1632670.png",
        title: "Projects"
    },
    {
        title: "Teams",
        logo: "https://cdn-icons-png.flaticon.com/128/19003/19003339.png"
    },
    {
        title: "Messages",
        logo: "https://cdn-icons-png.flaticon.com/128/1041/1041916.png"
    },
];

export const LeftSideBar = ({ onChangeItem }: SideBarItemProps) => {
    const [selectedItem, changeSelectedItem] = useState('Projects');

    const handleItemChange = (item: string) => {
        changeSelectedItem(item);
        onChangeItem(item);
    };

    return (
        <div className="leftSideBar min-h-screen bg-[#1c1a27] w-16 md:w-48 rounded-r-xl flex flex-col transition-all duration-300">
            <div className="flex justify-center md:justify-start">
                <Image src="/logo.svg" alt="logo" height={160} width={160} className="mt-4 mx-auto md:mx-4" />
            </div>
            <SideBarItemsRender
                selectedItem={selectedItem}
                onChangeItemHere={handleItemChange}
            />
            <div className="mt-auto mb-4 px-2 md:px-4">
                <button className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all text-xs md:text-sm">
                    <span className="hidden md:inline">Log Out</span>
                    <span className="md:hidden">🚪</span>
                </button>
            </div>
        </div>
    );
};

const SideBarItemsRender = ({
    selectedItem,
    onChangeItemHere
}: {
    selectedItem: string;
    onChangeItemHere: (item: string) => void;
}) => {
    return (
        <div className="sidebar-item flex flex-col justify-between mt-4 space-y-1">
            {SideBarItems.map((item, index) => {
                const isSelected = selectedItem === item.title;

                return (
                    <div
                        key={index}
                        className={`flex items-center space-x-2 px-2 md:px-4 py-2 cursor-pointer transition-all 
                        ${isSelected ? "bg-[#38364c]" : "hover:bg-[#38364c]"}`}
                        onClick={() => onChangeItemHere(item.title)}
                    >
                        <Image src={item.logo} alt={item.title} className="h-6 w-6" height={24} width={24} />
                        <span className={`text-white hidden md:inline text-sm md:text-base ${gramatikaFont.className}`}>
                            {item.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
