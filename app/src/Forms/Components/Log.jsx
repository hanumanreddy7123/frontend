import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Log.css'
function Log() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const header = localStorage.getItem("token");

    const handleSignIn = async (event) => {
        event.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Username and password cannot be empty");
            return;
        }
        const data=
        {

            email: email,
            password: password
        }

        try {
            axios.post("http://localhost:5050/login", data)
                .then((res) => {
                    if (res.data.code == 200) {
                        localStorage.setItem("token",res.data.token)
                        localStorage.setItem("userid",res.data.userid)
                        navigate('/Movies');
                    } 
                    else {
                        
                        console.log("Login failed");
                        alert("Invalid password or username")
                    }
                } )
                .catch((err)=>
                {
                    console.log("error in sigining")
                    alert("User not exists register to continue")
                    navigate('/login')
                })
        } catch (error) {
            console.error("Error signing in:", error);
        }
            
        
};


    const handleRegister = () => {
        navigate('/login');
    };

    return (
        <div className="backgrounda">
        
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="email"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleRegister}
                        >
                            REGISTER
                        </button>
                    </div>
                </form>
            </div>
       
        </div>
    );
}

export default Log;
