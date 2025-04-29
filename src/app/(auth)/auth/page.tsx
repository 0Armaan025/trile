import Image from 'next/image';

const AuthPage = () => {


    return (
        <div className="authPage flex flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Image src="/random_image.png" alt="random img" height={400} width={400} className=' ' />
            </div>
        </div>
    );
};

export default AuthPage;    