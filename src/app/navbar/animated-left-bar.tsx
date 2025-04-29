"use client";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // NOT "motion/react-client"
import { useEffect, useState, useRef } from "react";

interface Props {
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

interface NavbarItemProp {
    title: string;
}


export const AnimatedLeftBar = ({ children, isOpen = false, setIsOpen }: Props) => {

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    return (
        <>

            <AnimatePresence >
                {isOpen && (
                    <motion.div
                        ref={sidebarRef}
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="animated-left-bar min-h-screen z-[10000] max-w-[25rem] w-[14rem] flex flex-col justify-start items-start bg-white dark:bg-gray-800 p-2 rounded-r-lg fixed top-0 left-0 z-50"
                    >
                        <div className="w-full flex flex-row justify-end items-end">
                            <XIcon onClick={() => setIsOpen(false)} className="cursor-pointer" />
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
