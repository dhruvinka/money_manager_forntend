import { X } from 'lucide-react';
import React from 'react'

export default function Model({children,isopen,onClose,title}) {


if(!isopen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm">
        <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
            {/** model header */}
            <div className="relative bg-white rounded-xl shadow-2xl border-b-gray-100">
                {/** model content */}
                <div className=' flex items-center justify-between p-5 md:p-6 border-b-gray-100 rounded-xl '>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {title}
                    </h3>
                    <button
                    onClick={onClose}
                     type='button'
                    className='text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-9 h-9 flex items-center transition-colors duration-200 cursor-pointer focus-within:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                         <X className='w-4 h-4 ' size={15}/>
                    </button>
                </div>

                {/** model body */}
                <div className="p-5 md:6 text-gray-700">
                    {children}
                </div>

            </div>
        </div>
    </div>
  )
}
