import Image from 'next/image';
import localFont from 'next/font/local';

const gramatikaFont = localFont({ src: "./gramatika.ttf" });
const AuthPage = () => {



    return (
        <div className="authPage flex flex-row justify-center items-center">
            <div className="flex flex-col justfiy-center items-center p-2 bg-[#fff] w-[30rem] h-[28rem] rounded-3xl mt-8">
                <h4 className={`text-xl mt-4 text-black font-semibold ${gramatikaFont.className}`}>Welcome Back!</h4>
                <h5 className={`text-gray-400 ${gramatikaFont.className}`}>We missed you! Please enter your details.</h5>

                <div className="mt-8"></div>

                <div className="mr-12 flex flex-col justify-start items-start">

                    <h4 className='text-lg text-black font-semibold'>Email</h4>
                    <input type="text" className="border-2 border-gray-300 rounded-md text-[#1f1f1f] p-2 mt-2 w-[20rem] h-[2.5rem]" placeholder="Enter your email" />
                </div>
                <div className="mt-4"></div>

                <div className="mr-12 flex flex-col justify-start items-start">

                    <h4 className='text-lg text-black font-semibold'>Password</h4>
                    <input type="text" className="border-2 border-gray-300 rounded-md text-[#1f1f1f] p-2 mt-2 w-[20rem] h-[2.5rem]" placeholder="Enter your password" />
                </div>

                <div className='flex flex-row justify-between items-center mr-12 w-[20rem] mt-4'>
                    <div className='flex flex-row items-center'>
                        <input type="checkbox" className="p-2" />
                        <h4 className="text-gray-500 ml-2">Remember me</h4>
                    </div>
                    <a href="#" className="text-blue-500 text-sm mt-2">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;    