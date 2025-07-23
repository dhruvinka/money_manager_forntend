import React, { useState } from 'react';
import Deashboard from '../component/Deashboard';
import { Search } from 'lucide-react';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import Transaction from '../component/Transation';

export default function Filter() {
    const [filters, setFilters] = useState({
        type: 'income',
        startDate: '',
        endDate: '',
        keyword: '',
        sortOrder: 'asc',
        sortField: 'date', // NEW: default sort field
    });
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosConfig.post(API_ENDPOINT.FILTER, filters); // ✅ Pass filters in body
            if (res.status === 200) {
                setResults(res.data); // ✅ Use correct state variable
            }
        } catch (error) {
            console.error('Filter Error:', error);
        }
    };

    return (
        <Deashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Filter Transactions</h2>

                <div className="bg-white rounded-xl p-5 shadow-md mb-6">
                    <h5 className="text-lg font-semibold mb-4">Select the filters</h5>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select name="type" value={filters.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Sort Field</label>
                            <select name="sortField" value={filters.sortField} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Sort Order</label>
                            <select name="sortOrder" value={filters.sortOrder} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="keyword"
                                value={filters.keyword}
                                onChange={handleChange}
                                placeholder="Search"
                                className="w-full border rounded px-3 py-2"
                            />
                            <button type="submit" className="p-3 bg-purple-700 hover:bg-purple-800 text-white rounded flex items-center justify-center">
                                <Search size={18} />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="my-5">
                    <h3 className="text-lg font-semibold mb-3">Filtered Results</h3>
                    {results.length === 0 ? (
                        <p className="text-sm text-gray-500">No records found.</p>
                    ) : (
                        <div className="space-y-3">
                            {results.map((item) => (
                                <Transaction
                                    key={item.id}
                                    icon={item.icon}
                                    title={item.name}
                                    date={new Date(item.date).toLocaleDateString()}
                                    amount={item.amount}
                                    type={filters.type}
                                    showDelete={false}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Deashboard>
    );
}
