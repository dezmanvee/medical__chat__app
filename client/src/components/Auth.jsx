import { useState } from "react";
import Cookies from "universal-cookie";

import signinImage from "../assets/signup.jpg";
import axios from "axios";

const cookies = new Cookies();
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const {username, password, phoneNumber, avatarURL} = form;

        const URL = 'https://medlyapp.onrender.com/auth';

        const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
            fullName: form.fullName, username, password, phoneNumber, avatarURL, 
        });

        cookies.set('token', token);
        cookies.set('fullName', fullName);
        cookies.set('username', username);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }
  return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (   
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                        {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input 
                                type="text"
                                id="avatarURL"
                                name="avatarURL"
                                placeholder="Avatar URL"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                required
                            />
                    </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signinImage} alt="Sign in" />
        </div>
    </div>
  )
}
export default Auth;