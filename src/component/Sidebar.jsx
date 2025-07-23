import { AppContext } from '../context/AppContext';
import { User } from 'lucide-react';
import React, { useContext } from 'react';
import { SIDE_BAR_DATA } from '../utill/assets';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({activeMenu}) {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-400/50 p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="profile" className='w-20 h-20 bg-slate-400 rounded-full' />
                ) : (
                    <User className='w-20 h-20 bg-slate-400 rounded-full' />
                )}

                <h5 className='text-gray-950 font-medium leading-6 flex items-center justify-center'>
                    {user?.fullName}
                </h5>
            </div>

            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    onClick={() => navigate(item.path)}
                    key={`menu_${index}`}
                    className={`cursor-pointer w-full flex items-center gap-6 text-[15px] py-3 px-6 rounded-lg mb-3
                        ${activeMenu == item.label ? "text-white bg-purple-800" : ""}`}
                >
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}
        </div>
    );
}
