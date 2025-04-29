import { Link, MoveRight, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import Image from "next/image";
import localFont from "next/font/local";

const interFont = Inter({ subsets: ["latin"] });
const gramatikaFont = localFont({ src: "./gramatika.ttf" });

export const HeroSection = () => {
    return (
        <>
            <Image
                src="/arrow.png"
                alt="arrow"
                height={40}
                width={95}
                className="absolute top-[28%] left-[16%] rotate-[280deg] z-[99]
                    md:top-[29%] md:left-[25%]
                    lg:top-[22%] lg:left-[30%]"
            />

            {/* Sparkles - shining harder than your future */}
            <Sparkle className="absolute top-[60%] left-[10%] md:top-[55%] md:left-[15%] z-[999]" color="#65c47b" />
            <Sparkle className="absolute top-[60%] left-[80%] md:top-[54%] md:left-[75%] z-[999]" color="#f2cc73" />
            <Sparkle className="absolute top-[85%] left-[20%] md:top-[80%] md:left-[25%] z-[999]" color="#f2cc73" />
            <Sparkle className="absolute top-[83%] left-[81%] md:top-[78%] md:left-[78%] z-[999]" color="#4566ee" />

            <div className="flex flex-col justify-center items-center mt-16 relative">
                {/* Top Text */}
                <div className="flex flex-row justify-center items-center z-10">
                    <h2 className={`${gramatikaFont.className} text-4xl md:text-5xl lg:text-6xl font-semibold text-white`}>
                        bring
                    </h2>

                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="bg-[#60c97d] ml-4 rounded-full h-12 w-12 md:h-16 md:w-16 flex items-center justify-center shadow-lg"
                    >
                        <MoveRight size={30} className="text-white md:size-10" />
                    </motion.div>

                    <EmojiComponent />
                </div>

                {/* Mid Text */}
                <div className="flex flex-row mt-4 justify-center items-center relative z-10">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full mr-4 md:mr-8 bg-[#fec846] shadow-md flex items-center justify-center scale-110 cursor-pointer hover:scale-125 transition-all duration-300" />
                    <h2 className={`${gramatikaFont.className} font-semibold text-4xl md:text-5xl lg:text-6xl text-white mt-2`}>
                        a team
                    </h2>
                    <LinkComponent />
                </div>

                {/* Bottom Text */}
                <div className="flex flex-row mt-4 justify-center items-center relative z-10">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-25% from-[#8f5aea] to-80% to-[#bb6fa0]" />
                    <div className="h-24 w-24 ml-[-45px] rounded-full bg-gradient-to-br from-25% from-[#91cefb] to-80% to-[#93c8f6]" />
                    <h2 className={`${gramatikaFont.className} font-semibold text-4xl md:text-5xl lg:text-6xl ml-4 text-white mt-2`}>
                        together
                    </h2>
                </div>

                {/* Description */}
                <div className="flex flex-col justify-center items-center text-center px-4">
                    <h3 className={`${interFont.className} text-gray-600 mt-12 text-sm md:text-base`}>
                        Trile helps connect everyone in the team and organize tasks or whatever!
                    </h3>
                    <h3 className={`${interFont.className} text-gray-600 text-sm md:text-base`}>
                        can deliver better stuff, faster. 🙌
                    </h3>
                    <input
                        type="button"
                        value="Try it for free"
                        className={`${gramatikaFont.className} text-sm md:text-base cursor-pointer hover:bg-[#e9e9e9] transition-all font-semibold w-36 md:w-40 mt-8 text-black h-10 rounded-2xl border-black bg-[#f8f9f8]`}
                    />
                    <h4 className="text-[#b3b3b3] underline mt-2 cursor-pointer text-sm">See how it works</h4>
                </div>

                {/* Feature Cards */}
                <div className="flex mt-20 flex-wrap justify-center items-center gap-6">
                    <FeatureCard index={1} title="Notes" url="https://cdn-icons-png.flaticon.com/128/889/889648.png" />
                    <FeatureCard index={2} title="Kanban board" url="https://cdn-icons-png.flaticon.com/128/2387/2387679.png" />
                    <FeatureCard index={3} title="Add friends" url="https://cdn-icons-png.flaticon.com/128/3791/3791146.png" />
                </div>
            </div>
        </>
    );
};

const EmojiComponent = () => {
    return (
        <div className="flex items-center justify-end flex-row w-44 md:w-60 h-16 md:h-20 ml-4 rounded-full bg-gradient-to-br from-[#abafc7] to-[#3553da] shadow-xl p-2 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
            <Image
                src="https://cdn-icons-png.flaticon.com/128/2584/2584606.png"
                alt="star struck emoji"
                height={40}
                width={60}
                className="mr-2 drop-shadow-md"
            />
            <Image
                src="https://cdn-icons-png.flaticon.com/128/742/742920.png"
                alt="laughing emoji"
                height={40}
                width={60}
                className="mr-2 drop-shadow-md"
            />
        </div>
    );
};

const LinkComponent = () => {
    return (
        <div className="w-32 md:w-44 h-12 md:h-14 ml-4 md:ml-8 rounded-full border-2 border-white bg-white/10 backdrop-blur-md flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-md">
            <div className="w-[50%] h-1 bg-white flex flex-row justify-center items-center relative">
                <div className="h-4 w-4 md:h-5 md:w-5 bg-[#63c87f] rounded-full shadow-sm" />
            </div>
        </div>
    );
};

interface FeatureCardProps {
    title: string;
    url: string;
    index: number;
}

const FeatureCard = ({ title, url, index }: FeatureCardProps) => {
    return (
        <div className={`w-32 md:w-40 cursor-pointer hover:scale-105 transition-all h-28 md:h-32 flex flex-col justify-center items-center rounded-t-3xl ${index % 2 !== 0 ? 'bg-gradient-to-b from-[#29545f] to-[#181a19]' : 'bg-gradient-to-b from-[#683872] to-[#322035]'}`}>
            <Image src={url} alt="some image" height={40} width={40} className="w-10 h-10 md:w-12 md:h-12 mt-[-30px] md:mt-[-40px]" />
            <h2 className={`${gramatikaFont.className} text-white text-lg md:text-xl font-semibold mt-2 md:mt-4`}>
                {title}
            </h2>
            <StarsComponent />
        </div>
    );
};

const StarsComponent = () => {
    return (
        <div className="flex flex-row mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 md:w-5 md:h-5 text-yellow-400"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );
};
