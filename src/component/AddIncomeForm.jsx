import React, { useEffect, useState } from 'react';
import Input from './Input';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import { toast } from 'react-toastify';
import EmojiPickerPopup from './Emojipickeerpopup'; // ✅ This was missing in your import

export default function AddIncomeForm({ onAddIncome }) {
    const [income, setIncome] = useState({
        icon: '',
        name: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
    });

    const [categories, setCategories] = useState([]);

    const fetchIncomeCategories = async () => {
        try {
            const res = await axiosConfig.get(`${API_ENDPOINT.GET_CATEGORY_BY_TYPE}/income`);
            if (res.status === 200) {
                setCategories(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchIncomeCategories();
    }, []);

    const handleChange = (key, value) => {
        if (key === 'amount' && Number(value) < 0) return;
        setIncome({ ...income, [key]: value });
    };

    const handleSubmit = () => {
        if (!income.icon) {
            toast.error('Please pick an emoji');
            return;
        }
        if (!income.name.trim() || !income.categoryId) {
            toast.error('Name and Category are required');
            return;
        }
        if (Number(income.amount) <= 0) {
            toast.error('Amount must be greater than 0');
            return;
        }
        onAddIncome(income);
    };

    return (
        <div className="p-4 space-y-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(emoji) => handleChange('icon', emoji)}
            />

            <div>
                <label className="block text-xs text-gray-600 mb-1">Select Category</label>
                <select
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-purple-400"
                    value={income.categoryId}
                    onChange={(e) => handleChange('categoryId', e.target.value)}
                >
                    <option value="">Select Income Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Income Source Name"
                value={income.name}
                onChange={({ target }) => handleChange('name', target.value)}
                placeholder="e.g. Freelancing"
                type="text"
            />

            <div>
                <label className="block text-xs text-gray-600 mb-1">Amount</label>
                <input
                    min="1"
                    type="number"
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-purple-400"
                    placeholder="e.g. 5000"
                    value={income.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                />
            </div>

            <Input
                label="Date"
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)}
                type="date"
                max={new Date().toISOString().split('T')[0]} // ✅ Prevent future date selection
            />

            <div className="flex justify-end">
                <button
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-all"
                    type="button"
                    onClick={handleSubmit}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
}
