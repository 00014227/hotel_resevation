import React from 'react';
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
    return (
        <main className='flex justify-center items-center h-[70vh]'>
            <form className='flex flex-col max-w-2xl w-full rounded-lg shadow-xl border-t'>

                <div className='border-b border-gray-300 py-4'>
                    <h1 className=' text-center text-2xl text-gray-800'>LogIn or SignUp</h1>
                </div>
                <div className=' space-y-5 p-8'>
                    <h2 className=' text-gray-800 text-3xl'>Welcome to our platform</h2>

                    <input
                        className=' w-full p-4 border-2 rounded-xl'
                        type="email"
                        placeholder='Enter your email' />
                    <input
                        className=' w-full p-4 border-2 rounded-xl'
                        placeholder='Enter your password'
                        type="password" />

                    <button className=' w-full p-4 bg-red-500 text-white font-bold text-lg hover:bg-red-700 rounded-xl'>Continue</button>

                    <div class="flex items-center my-4">
                        <div class="flex-grow border-t border-gray-300"></div>
                        <span class="px-4 text-gray-500 text-sm">OR</span>
                        <div class="flex-grow border-t border-gray-300"></div>
                    </div>


                    <button className='w-full flex items-center text-center border-2 border-black p-4 font-bold text-lg rounded-xl hover:bg-gray-200'>
                        <FcGoogle />
                        <span className='mx-auto'>With Google</span>
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Auth;