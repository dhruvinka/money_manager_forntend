import React, { useState, useEffect } from 'react';
import Input from './Input';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import { toast } from 'react-toastify';
import EmojiPickerPopup from './Emojipickeerpopup';

export default function AddExpenseForm({ onAddExpense }) {
    const [categories, setCategories] = useState([]);
    const [expense, setExpense] = useState({
        icon: '',
        name: '',
        categoryId: '',
        amount: 0,
        date: new Date().toISOString().slice(0, 10),
    });

    const fetchExpenseCategories = async () => {
        try {
            const res = await axiosConfig.get(`${API_ENDPOINT.GET_CATEGORY_BY_TYPE}/expense`);
            if (res.status === 200) {
                setCategories(res.data);
                if (res.data.length > 0) {
                    setExpense((prev) => ({ ...prev, categoryId: res.data[0].id }));
                }
            }
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchExpenseCategories();
    }, []);

    const handleChange = (key, value) => {
        if (key === 'amount' && Number(value) < 0) return;
        setExpense({ ...expense, [key]: value });
    };

    const handleSubmit = () => {
        if (!expense.icon) {
            toast.error('Please pick an emoji');
            return;
        }
        if (!expense.name.trim()) {
            toast.error('Expense name is required');
            return;
        }
        if (!expense.categoryId) {
            toast.error('Please select a category');
            return;
        }
        if (expense.amount <= 0) {
            toast.error('Amount must be greater than 0');
            return;
        }
        onAddExpense(expense);
    };

    return (
        <div className="p-4 space-y-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(emoji) => handleChange('icon', emoji)}
            />

            <div>
                <label className="block text-xs text-gray-600 mb-1">Select Category</label>
                <select
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-purple-400"
                    value={expense.categoryId}
                    onChange={(e) => handleChange('categoryId', e.target.value)}
                >
                    <option value="">Select Expense Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Expense Name"
                value={expense.name}
                onChange={({ target }) => handleChange('name', target.value)}
                placeholder="e.g. Groceries, Rent"
                type="text"
            />

            <div>
                <label className="block text-xs text-gray-600 mb-1">Amount</label>
                <input
                    min="1"
                    type="number"
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-purple-400"
                    placeholder="0"
                    value={expense.amount}
                    onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                />
            </div>

            <Input
                label="Date"
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                type="date"
                max={new Date().toISOString().split('T')[0]} // ✅ Block future dates
            />

            <div className="flex justify-end mt-6">
                <button
                    className="bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600 transition"
                    type="button"
                    onClick={handleSubmit}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
}
