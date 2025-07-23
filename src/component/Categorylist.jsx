import { Layers, Pencil } from 'lucide-react';
import React from 'react';

export default function Categorylist({ category, onEditCategory, onDeleteCategory }) {
    return (
        <div className="p-4">
            <div className="bg-white rounded-xl p-5 shadow-md">
                <h4 className="text-sm font-medium text-black mb-4">Category Sources</h4>

                {category.length === 0 ? (
                    <p className="text-xs text-purple-400">No Categories Available</p>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {category.map((cat) => (
                            <div
                                key={cat.id}
                                className="group flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-purple-50 transition shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-xl">
                                        {cat.icon ? (
                                            <span>{cat.icon}</span>  
                                        ) : (
                                            <Layers className="text-purple-500" size={18} />
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-xs font-medium text-black">{cat.name}</p>
                                        <p className="text-[11px] text-gray-500 capitalize">{cat.type || "Unknown"}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onEditCategory?.(cat)}
                                    className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                >
                                    <Pencil size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
