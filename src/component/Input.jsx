import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

export default function Input({ label, error, isselect, options, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-2">
            <label className='text-[13px] text-slate-800 block mb-1'>{label}</label>
            <div className="relative">
                {isselect ? (
                    <select
                        value={props.value}
                        onChange={props.onChange}
                        className='w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        {...props} 
                        className={`w-full bg-transparent outline-none border ${
                            error ? 'border-red-500' : 'border-gray-300'
                        } rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                        type={props.type === "password" ? (showPassword ? 'text' : 'password') : props.type}
                    />
                )}

                {props.type === 'password' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye size={20} className='text-primary' onClick={toggleShowPassword} />
                        ) : (
                            <EyeOff size={20} className='text-slate-400' onClick={toggleShowPassword} />
                        )}
                    </span>
                )}
            </div>
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    );
}
