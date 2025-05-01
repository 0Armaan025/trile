import Image from "next/image";
import localFont from 'next/font/local';


const gramatikaFont = localFont({ src: './gramatika.ttf' });


interface SideBarItemProps {
    logo: string;
    title: string;
}

const SideBarItems = [
    {
        logo: "https://cdn-icons-png.flaticon.com/128/1632/1632670.png",
        title: "Tasks"
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

export const LeftSideBar = () => {
    return (
        <div className="leftSideBar min-h-screen bg-[#1c1a27] w-48 rounded-r-xl flex flex-col">
            <Image src="/logo.svg" alt="logo" height={160} width={160} className="mt-4" />
            <SideBarItemsRender />
            <div className="mt-auto mb-4 px-4">
                <button className="w-full py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition-all">
                    Log Out
                </button>
            </div>
        </div>
    );
}


const SideBarItemsRender = () => {
    return (
        <div className="sidebar-item flex flex-col justify-between mt-4">
            {SideBarItems.map((item, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2 px-4 py-2 hover:bg-[#38364c] cursor-pointer transition-all">
                        <Image src={item.logo} alt={item.title} className="h-6 w-6" height={40} width={40} />
                        <span className={`text-white ${gramatikaFont.className}`}>{item.title}</span>
                    </div>
                );
            })}

        </div>
    );
}   
