import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../component/Input';
import { toast } from 'react-toastify';
import axiosConfig from '../utill/axiosConfig';
import { LoaderCircleIcon } from 'lucide-react';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import { AppContext } from '../context/AppContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const handlesubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let validationErrors = {};
        if (!email.trim()) validationErrors.email = "Please enter your email.";
        if (!password.trim()) validationErrors.password = "Please enter your password.";

        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await axiosConfig.post(API_ENDPOINT.LOGIN, { email, password });

            if (res.status === 200 || res.status === 201) {
                toast.success("Login successfully");
            }

            const { token, user } = res.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({
                    email: user.email,
                    fullName: user.fullName,
                    profileImageUrl: user.profileImageUrl,
                    id: user.id
                }));

                setUser({
                    email: user.email,
                    fullName: user.fullName,
                    profileImageUrl: user.profileImageUrl,
                    id: user.id
                });

                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
            <img
                src={assets.login}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ filter: 'blur(8px)' }}
            />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-2">
                        Please Enter your Details to Login
                    </p>

                    <form onSubmit={handlesubmit} className='space-y-4'>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="name@gmail.com"
                            type="text"
                        />
                        {error?.email && (
                            <p className="text-red-800 text-sm bg-red-50 p-2 rounded">
                                {error.email}
                            </p>
                        )}

                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="**********"
                            type="password"
                        />
                        {error?.password && (
                            <p className="text-red-800 text-sm bg-red-50 p-2 rounded">
                                {error.password}
                            </p>
                        )}

                        <button
                            className={`w-full py-3 text-lg font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircleIcon className='animate-spin w-5 h-5' />
                                    Login...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?{" "}
                            <Link to="/Signup" className='font-medium text-primary underline hover:text-primary-dark transition-colors'>
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
