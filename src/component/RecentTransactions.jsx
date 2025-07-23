import { ArrowRight } from 'lucide-react';
import React from 'react';
import Transaction from './Transation';

export default function RecentTransactions({ onMore, transactions }) {
    return (
        <div className="w-full p-5 rounded-xl bg-white shadow-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Recent Transactions</h4>
                <button
                    className="text-sm text-purple-700 hover:underline flex items-center gap-1"
                    onClick={onMore}
                >
                    More <ArrowRight size={14} />
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {transactions?.slice(0, 5)?.map((item) => (
                    <Transaction
                        key={item.id}
                        icon={item.icon}
                        title={item.name}
                        date={new Date(item.date).toLocaleDateString()}
                        amount={item.amount}
                        type={item.type}
                        showDelete={false}
                    />
                ))}
            </div>
        </div>
    );
}
