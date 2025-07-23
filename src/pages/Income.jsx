import React, { useEffect, useState } from 'react';
import Deashboard from '../component/Deashboard';
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import Incomelist from '../component/Incomelist';
import { Plus } from 'lucide-react';
import Model from '../component/model';
import AddIncomeForm from '../component/AddIncomeForm';
import { toast } from 'react-toastify';
import Incomeoverview from '../component/Incomeoverview';

export default function Income() {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINT.GET_ALL_INCOME);
            if (res.status === 200) {
                setIncomeData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    const handleAddIncome = async (incomeData) => {
        try {
            const res = await axiosConfig.post(API_ENDPOINT.ADD_INCOME, incomeData);
            if (res.status === 200) {
                toast.success('Income added successfully');
                setOpenAddIncomeModel(false);
                fetchIncomeDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add income');
        }
    };

    const handleDeleteIncome = async (id) => {
        try {
            await axiosConfig.delete(`${API_ENDPOINT.GET_ALL_INCOME}/${id}`);
            toast.success('Income deleted successfully');
            fetchIncomeDetails();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete income');
        }
    };


    const  handleEmailIncomeDetails=()=>{


    }

    return (
        <Deashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">Income Sources</h2>
                    <button
                        onClick={() => setOpenAddIncomeModel(true)}
                        className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2 transition"
                    >
                        <Plus size={16} /> Add Income
                    </button>
                </div>
                    <Incomeoverview transactions={incomeData}/>

                <Incomelist
                    transactions={incomeData}
                    onDelete={handleDeleteIncome}
                    onEmail={handleEmailIncomeDetails}

                                />

                <Model
                    title="Add Income"
                    isopen={openAddIncomeModel}
                    onClose={() => setOpenAddIncomeModel(false)}
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Model>
            </div>
        </Deashboard>
    );
}
