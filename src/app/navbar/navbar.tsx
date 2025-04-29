"use client";
import { Tally1 } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { AnimatedLeftBar } from "./animated-left-bar";

interface NavbarItemProp {
    title: string;
}

const PoppinsFont = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
})

const NavbarItem = ({ title }: NavbarItemProp) => {
    return (
        <h4 className={`text-gray-500 ml-2 p-1 hover:text-white transition-all cursor-pointer ${PoppinsFont.className}`}>{title}</h4>
    );
}

const NavbarItems = [
    { title: "Home" },
    { title: "About" },
    { title: "Contact" },
    { title: "Blog" },
];

export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex flex-row justify-between items-center p-2 px-4">
            <div className="left-part items-center flex flex-row">

                <Image src="/logo.svg" alt="logo" height={40} width={180} />
                <Tally1 color="gray" className="hidden md:flex ml-8" height={30} width={30} />



                <div className="hidden flex-row mr-8 md:flex ">
                    {NavbarItems.map((item, index) => (
                        <NavbarItem key={index} title={item.title} />
                    ))}
                </div>

            </div>

            <div className="hidden md:flex flex-row justify-center items-center">
                <input type="button" value="Login" className="bg-transparent  outline-none px-4 py-2 rounded-2xl hover:border-1 hover:border-white transition-all cursor-pointer" />

                <input type="button" value="Sign up" className="bg-transparent  outline-none px-4 py-2 rounded-2xl ml-2 border-white hover:bg-white hover:text-black transition-all cursor-pointer" />
            </div>




            <button className="md:hidden text-2xl p-2 cursor-pointer" onClick={toggleSidebar}>
                ☰

            </button>

            {isOpen && (
                <>
                    <AnimatedLeftBar children={

                        <div className="w-full">
                            {NavbarItems.map((item, index) => (
                                <NavbarItem key={index} title={item.title} />
                            ))}

                            <input type="button" value="Sign Up" className="ml-2 mt-2 text-gray-400 hover:text-white transition-all cursor-pointer" />
                            <br />
                            <input type="button" value="Log In" className="ml-2 mt-2 text-gray-400 hover:text-white transition-all cursor-pointer" />
                        </div>

                    }
                        setIsOpen={toggleSidebar} isOpen={isOpen} />
                </>
            )}
        </nav>
    );
}