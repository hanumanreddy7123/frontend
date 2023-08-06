import React, { useState } from "react";
import './Regi.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Regi() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert("All fields are required");
            return;
        }

        const data={
            name: name,
            email: email,
            password: password
        }
        try {
         await axios.post("https://backendapp-bkea.onrender.com/register",data)
         .then((res)=>
         {
             navigate('/home');

         })

        } catch (error) {
            if (error.response && error.response.data.message === "Email already exists") {
                alert("User with this Email already exists");
            } else {
                console.error("Error signing up:", error);
            }
        }
    };

    return (
        <div className="background">
        <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-9 pt-9 pb-9 mb-7 ">
                <h2 className="text-2xl font-semibold mb-4">REGISTRATION</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline "
                        type="button"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
);
}

export default Regi;
