import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Menu, User, X } from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Menubar({ activeMenu }) {
    const [opensidemenu, setopensidemenu] = useState(false);
    const [showdropdown, setshowdropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout button clicked");
        clearUser();
        setshowdropdown(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setshowdropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-between gap-5 px-4 py-3 bg-white border-b border-gray-200/50 backdrop-blur-sm">
            <div className='flex items-center gap-5'>
                <button
                    onClick={() => setopensidemenu(!opensidemenu)}
                    className='block lg:hidden text-black hover:bg-gray-100 p-2 rounded transition-colors'
                >
                    {opensidemenu ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                </button>
                <div className='flex items-center gap-2'>
                    <img src={assets.profile} alt="logo" className='h-10 w-10' />
                    <span className='text-lg font-medium text-black truncate'>Money Manager</span>
                </div>
            </div>

            <div className='relative' ref={dropdownRef}>
                <button
                    onClick={() => setshowdropdown(!showdropdown)}
                    className='flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2'
                >
                    <User className='text-purple-500' />
                </button>

                {showdropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className='flex items-center justify-center gap-3'>
                                <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full'>
                                    <User className='w-4 h-4 text-purple-600' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium text-gray-800 truncate'>
                                        {user?.fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-1">
                             <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {opensidemenu && (
                <div className='fixed left-0 right-0 bg-white border-b bg-gray-200 lg:hidden z-20 top-[73px]'>
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
}
