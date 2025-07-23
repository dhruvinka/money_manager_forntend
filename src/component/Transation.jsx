import { UtensilsCrossed, Trash2 } from 'lucide-react';
import React from 'react';

export default function Transaction({ icon, title, date, amount, type, onClick, showDelete = true }) {
    const getAmountStyles = () => type === "expense"  ?  'bg-red-50 text-red-800' : 'bg-green-50 text-green-800';
    

    return (
        <div className='group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
            <div className='flex items-center gap-4'>
                <div className='w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl'>
                    {icon || <UtensilsCrossed className='text-purple-500' />}
                </div>
                <div>
                    <h4 className='text-sm font-medium'>{title}</h4>
                    <p className='text-xs text-gray-500'>{date}</p>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className={`text-sm px-2 py-1 rounded-lg ${getAmountStyles()}`}>
                    ₹{amount}
                </div>
                {showDelete && (
                    <Trash2
                        size={16}
                        className="cursor-pointer text-gray-400 hover:text-red-500"
                        onClick={onClick}
                    />
                )}
            </div>
        </div>
    );
}
