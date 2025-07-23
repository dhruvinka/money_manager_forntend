import React, { useEffect, useState } from 'react';
import Deashboard from '../component/Deashboard';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import { Plus } from 'lucide-react';
import Model from '../component/Model';
import AddExpenseForm from '../component/AddExpenseForm';
import Expenselist from '../component/Expenselist';
import { toast } from 'react-toastify';
import ExpenseOverview from '../component/ExpenseOverview';

export default function Expense() {
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINT.GET_ALL_EXPENSE);
            if (res.status === 200) {
                setExpenseData(res.data);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
    }, []);

    const handleAddExpense = async (expense) => {
        try {
            const res = await axiosConfig.post(API_ENDPOINT.ADD_EXPENSE, expense);
            if (res.status === 200) {
                toast.success('Expense added successfully');
                setOpenAddExpenseModel(false);
                fetchExpenseDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add expense');
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            await axiosConfig.delete(`${API_ENDPOINT.DELETE_EXPENSE}/${expenseId}`);
            toast.success('Expense deleted successfully');
            fetchExpenseDetails();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete expense');
        }
    };

    return (
        <Deashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">Expense Sources</h2>
                    <button
                        onClick={() => setOpenAddExpenseModel(true)}
                        className="add-btn flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                    >
                        <Plus size={16} /> Add Expense
                    </button>
                </div>
                <ExpenseOverview transactions={expenseData}/>
                

                <Expenselist
                    transactions={expenseData}
                    onDelete={handleDeleteExpense}
                />

                <Model
                    title="Add Expense"
                    isopen={openAddExpenseModel}
                    onClose={() => setOpenAddExpenseModel(false)}
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Model>
            </div>
        </Deashboard>
    );
}
