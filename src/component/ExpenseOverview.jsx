import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { prepareExpenseLineChartData } from '../utill/chartUtils';


export default function ExpenseOverview({ transactions }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="bg-white rounded-xl p-5 shadow-md mb-5">
            <div className="mb-5">
                <h5 className="text-lg font-semibold text-black">Expense Overview</h5>
                <p className="text-xs text-gray-500 mt-1">
                    Track your expenses over time and analyze your spending patterns.
                </p>
            </div>

            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                        <defs>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.4} />
                                <stop offset="75%" stopColor="#dc2626" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#dc2626"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
