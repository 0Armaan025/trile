'use client';
import Image from 'next/image';
import localFont from 'next/font/local';
import React, { useState } from 'react';

const gramatikaFont = localFont({ src: './gramatika.ttf' });

const AuthPage = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };




    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === "signup") {
            if (!formData.username || !formData.email || !formData.password) {
                alert('Please fill all the fields');
                return;
            }
            else if ((formData.password != formData.confirmPassword) || formData.password.length < 6) {
                alert('Passwords do not match or are too short');
                return;
            }

            alert('submitted');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
    };

    return (
        <div className="authPage flex justify-center items-center min-h-screen bg-[#201e2e]">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-xl p-6 w-[30rem] rounded-3xl shadow-2xl border border-white/20">
                {/* Toggle Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setMode('login')}
                        className={`text-lg font-semibold cursor-pointer px-4 py-1 rounded-md ${mode === 'login' ? 'bg-white text-[#201e2e]' : 'text-white/70'
                            } transition-all`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`text-lg font-semibold cursor-pointer px-4 py-1 rounded-md ${mode === 'signup' ? 'bg-white text-[#201e2e]' : 'text-white/70'
                            } transition-all`}
                    >
                        Sign Up
                    </button>
                </div>

                <h4 className={`text-2xl text-white font-bold mt-1 ${gramatikaFont.className}`}>
                    {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
                </h4>
                <h5 className={`text-gray-300 text-sm mt-1 ${gramatikaFont.className}`}>
                    {mode === 'login'
                        ? 'We missed you! Please enter your details.'
                        : 'Join us! Enter your details below.'}
                </h5>

                {/* Form */}
                <form className="w-full mt-8 px-4" >

                    {mode === "signup" && (
                        <>
                            <label className="text-white font-semibold text-sm">Email</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}

                                className="border mb-4 border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your username"
                            />
                        </>
                    )}

                    <label className="text-white font-semibold text-sm">Email</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        className="border border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                    />

                    <div className="mt-4">
                        <label className="text-white font-semibold text-sm">Password</label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            className="border border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {mode === 'signup' && (
                        <div className="mt-4">
                            <label className="text-white font-semibold text-sm">Confirm Password</label>
                            <input
                                onChange={handleChange}
                                name='confirmPassword'
                                type="password"
                                className="border border-gray-500 bg-transparent text-white placeholder-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                                placeholder="Re-enter your password"
                            />
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="flex justify-between items-center w-full mt-4 text-sm">

                            <a href="#" className="text-blue-400 hover:underline">Forgot Password?</a>
                        </div>
                    )}

                    <button
                        type="submit"
                        onClick={mode === 'login' ? handleFormSubmit : handleFormSubmit}
                        className="mt-6 w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>

                    <div className="mt-6 text-white text-sm opacity-70 text-center">or</div>

                    <button
                        type="button"
                        className="mt-4 cursor-pointer w-full flex items-center justify-center gap-3 border border-white/30 text-white py-2 rounded-md hover:bg-white/10 transition-all"
                    >
                        <Image src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google" width={20} height={20} />
                        Continue with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;