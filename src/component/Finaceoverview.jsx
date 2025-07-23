import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function Finaceoverview({ totalIncome = 0, totalExpense = 0 }) {
    const totalBalance = totalIncome - totalExpense;

    const data = [
        { name: 'Total Balance', value: totalBalance, color: '#059669' },  // Green
        { name: 'Total Expenses', value: totalExpense, color: '#DC2626' }, // Red
        { name: 'Total Income', value: totalIncome, color: '#7C3AED' },    // Purple
    ];

    return (
        <div className="p-5 h-full rounded-xl bg-white shadow-md relative flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
            <div className="relative">
                <PieChart width={250} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={60}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-500">Total Balance</p>
                    <p className="text-xl font-bold text-gray-800">₹{totalBalance.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-xs text-gray-600">Balance</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="text-xs text-gray-600">Expense</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-700"></div>
                    <span className="text-xs text-gray-600">Income</span>
                </div>
            </div>
        </div>
    );
}
