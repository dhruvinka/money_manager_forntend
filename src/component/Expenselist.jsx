import React, { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Download, Mail, Trash2, Layers } from 'lucide-react';
import moment from 'moment';
import { downloadPdf } from '../utill/downloadPdf ';
import { sendEmailWithPdf } from '../utill/Sendmail';
import { AppContext } from '../context/AppContext';


export default function ExpenseList({ transactions, onDelete }) {


const {user} =useContext(AppContext);

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete this expense?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => onDelete(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div className="p-4">
            <div className="bg-white rounded-xl p-5 shadow-md">
                <div className='flex items-center justify-between mb-4'>
                    <h4 className="text-sm font-medium text-black">Expense Sources</h4>
                    <div className='flex items-center justify-end gap-2'>
                        <button 
                        onClick={() =>sendEmailWithPdf (transactions, 'Expense', user.email)}
                        className='flex items-center gap-1 bg-gray-100 px-4 py-2 rounded text-sm hover:bg-gray-200 transition'>
                            <Mail size={15}  /> Email
                        </button>
                        <button
                            className='flex items-center gap-1 bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600 transition'
                            onClick={() => downloadPdf(transactions, 'expense-report.pdf', 'Expense')}
                        >
                            <Download size={15} /> Download
                        </button>
                    </div>
                </div>

                {transactions.length === 0 ? (
                    <p className="text-xs text-purple-400">No Expense Added</p>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {transactions.map((item) => (
                            <div
                                key={item.id}
                                className="group flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-red-50 transition shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-xl">
                                        {item.icon || <Layers className="text-red-500" size={18} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xs font-medium text-black">{item.name}</p>
                                        <p className="text-[11px] text-gray-500">{moment(item.date).format('DD-MM-YYYY')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-red-600 text-xs font-medium">
                                        - ₹ {item.amount.toLocaleString()}
                                    </p>
                                    <Trash2
                                        size={16}
                                        className="cursor-pointer text-gray-400 hover:text-red-500"
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
