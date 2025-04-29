"use client";
import { motion } from "framer-motion"; // NOT "motion/react-client"
import { useEffect, useState } from "react";

interface Props {
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

interface NavbarItemProp {
    title: string;
}


export const AnimatedLeftBar = ({ children, isOpen = false }: Props) => {
    return (
        <>
            <motion.div
                initial={{ x: -300 }} // Sidebar starts off-screen
                animate={{ x: isOpen ? 0 : -300 }} // Slide in/out
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="animated-left-bar min-h-screen max-w-[25rem] w-[14rem] flex flex-col justify-start items-start bg-white dark:bg-gray-800 p-2 rounded-r-lg fixed top-0 left-0 z-50"
            >
                {children}
            </motion.div>
        </>
    );
};
