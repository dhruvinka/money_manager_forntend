import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Input from '../component/Input';
import { toast } from 'react-toastify';
import axiosConfig from '../utill/axiosConfig';
import { LoaderCircleIcon } from 'lucide-react';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import uploadProfileImage from '../utill/uploadprofileimage';
import ProfilePhoto from '../component/Profilephoto';

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        let validationErrors = {};
        if (!fullName.trim()) validationErrors.fullName = "Please enter your full name.";
        if (!email.trim()) validationErrors.email = "Please enter your email.";
        if (!password.trim()) validationErrors.password = "Please enter your password.";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        try {
            if (imageFile) {
                const imageUrl = await uploadProfileImage(imageFile);
                profileImageUrl = imageUrl || "";
            }

            const res = await axiosConfig.post(API_ENDPOINT.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            if (res.status === 200 || res.status === 201) {
                toast.success("Profile created successfully");
                navigate("/login");
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
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-2">
                        Start tracking your spendings by joining us.
                    </p>

                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <ProfilePhoto imageFile={imageFile} setImageFile={setImageFile} />

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="Enter Full Name"
                                type="text"
                                error={errors.fullName}
                            />

                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@gmail.com"
                                type="text"
                                error={errors.email}
                            />

                            <div className="col-span-2">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="**********"
                                    type="password"
                                    error={errors.password}
                                />
                            </div>
                        </div>

                        <button
                            className={`w-full py-3 text-lg font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircleIcon className='animate-spin w-5 h-5' />
                                    Signing Up...
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className='font-medium text-primary underline hover:text-primary-dark transition-colors'>
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
