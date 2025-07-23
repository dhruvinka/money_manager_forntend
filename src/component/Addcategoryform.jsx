import React, { useEffect, useState } from 'react';
import Input from './Input';
import EmojiPickerPopup from './Emojipickeerpopup';

export default function Addcategoryform({ onAddCategory, initialData }) {
    const [category, setCategory] = useState({
        name: '',
        type: 'income',
        icon: '',
    });

    useEffect(() => {
        if (initialData) {
            setCategory({
                name: initialData.name || '',
                type: initialData.type || 'income',
                icon: initialData.icon || '',
            });
        }
    }, [initialData]);

    const categoryTypesOption = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' },
    ];

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    const handleSubmit = () => {
        onAddCategory(category);
    };

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(emoji) => handleChange('icon', emoji)}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange('name', target.value)}
                label="Category Name"
                placeholder="e.g Freelance, Salary"
                type="text"
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange('type', target.value)}
                isselect={true}
                options={categoryTypesOption}
            />

            <div className="flex justify-end mt-6">
                <button
                    className="add-btn add-btn-fill bg-purple-500 px-4 py-2 rounded-md text-white"
                    type="button"
                    onClick={handleSubmit}
                >
                    {initialData ? 'Update Category' : 'Add Category'}
                </button>
            </div>
        </div>
    );
}
