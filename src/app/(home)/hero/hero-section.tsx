import { Link, MoveRight, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";
import localFont from "next/font/local";


const interFont = Inter({
    subsets: ["latin"],
});

const gramatikaFont = localFont({ src: "./gramatika.ttf" });

export const HeroSection = () => {
    return (
        <>
            <Image src="/arrow.png" alt="arrow" height={40} width={95} className="rotate-280 relative top-74 left-60 z-99 " />


            {/* Sparkles locked in place, not floating like your GPA */}

            <Sparkle
                className="absolute top-[60%] left-[10%] md:top-[55%] md:left-[15%]"
                color="#65c47b"
            />
            <Sparkle
                className="absolute top-[60%] left-[80%] md:top-[52%] md:left-[75%]"
                color="#f2cc73"
            />
            <Sparkle
                className="absolute top-[85%] left-[20%] md:top-[80%] md:left-[25%]"
                color="#f2cc73"
            />
            <Sparkle
                className="absolute top-[83%] left-[75%] md:top-[78%] md:left-[70%]"
                color="#4566ee"
            />


            <div className="flex flex-col justify-center items-center mt-16 relative ">
                {/* Glowy Background Blob */}
                {/* Top Text */}
                <div className="flex flex-row justify-center items-center z-10">
                    <h2 className={`${gramatikaFont.className} text-6xl font-semibold text-white`}>
                        bring
                    </h2>

                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="bg-[#60c97d] ml-4 rounded-full h-16 w-16 flex items-center justify-center shadow-lg"
                    >
                        <MoveRight size={40} className="text-white" />
                    </motion.div>

                    <EmojiComponent />
                </div>

                {/* Bottom Row */}
                <div className="flex flex-row mt-4 justify-center items-center relative z-10">
                    <div className="h-20 w-20 rounded-full mr-8 bg-[#fec846] shadow-md flex items-center justify-center scale-110 cursor-pointer hover:scale-125 transition-all duration-300" />

                    <h2 className={`${gramatikaFont.className} font-semibold text-6xl text-white mt-2`}>
                        a team
                    </h2>

                    <LinkComponent />
                </div>


                {/* Bottom Row */}
                <div className="flex flex-row mt-4 justify-center items-center relative z-10">
                    {/* gradient disks */}

                    <div className="h-30 w-30  rounded-full bg-gradient-to-br from-25% from-[#8f5aea] to-80% to-[#bb6fa0]  "></div>
                    <div className="h-30 w-30 ml-[-45px] rounded-full bg-gradient-to-br from-25% from-[#91cefb] to-80% to-[#93c8f6]  "></div>
                    <h2 className={`${gramatikaFont.className} font-semibold text-6xl ml-4 text-white mt-2`}>
                        together
                    </h2>
                </div>


                <div className="flex flex-col justify-center items-center ">
                    <h3 className={`${interFont.className} text-gray-600 mt-16`}>Trile helps connect everyone in the team and organize tasks or whatever!</h3>
                    <h3 className={`${interFont.className} text-gray-600 `}>can deliver better stuff, faster.🙌 </h3>
                    <input type="button" value="Try it for free" className={`${gramatikaFont.className} text-sm cursor-pointer hover:bg-[#e9e9e9] transition-all font-semibold w-32 mt-8 text-black h-10 rounded-2xl border-black text-center bg-[#f8f9f8]`} />
                    <h4 className="text-[#b3b3b3] underline mt-2 cursor-pointer">See how it works</h4>
                </div>



            </div>
        </>
    );
};

const EmojiComponent = () => {
    return (
        <div className="flex items-center justify-end flex-row w-60 h-20 ml-4 rounded-full bg-gradient-to-br from-[#abafc7] to-[#3553da] shadow-xl p-2 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
            <Image
                src="https://cdn-icons-png.flaticon.com/128/2584/2584606.png"
                alt="star struck emoji"
                height={46}
                width={70}
                className="mr-2 drop-shadow-md"
            />
            <Image
                src="https://cdn-icons-png.flaticon.com/128/742/742920.png"
                alt="laughing emoji"
                height={46}
                width={70}
                className="mr-2 drop-shadow-md"
            />
        </div>
    );
};

const LinkComponent = () => {
    return (
        <div className="w-44 h-14 ml-8 rounded-full border-2 border-white bg-white/10 backdrop-blur-md flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-md">
            <div className="w-[50%] h-1 bg-white flex flex-row justify-center items-center relative">
                <div className="h-5 w-5 bg-[#63c87f] rounded-full shadow-sm" />
            </div>
        </div>
    );
};
