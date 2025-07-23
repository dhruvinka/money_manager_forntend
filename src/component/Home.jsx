import React, { useEffect, useState } from 'react'
import Deashboard from './Deashboard'
import Infocard from './Infocard'
import { Coins, Wallet, WalletCards } from 'lucide-react'
import { useNavigate } from 'react-router'
import axiosConfig from '../utill/axiosConfig';
import { API_ENDPOINT } from '../utill/apiEndpoint';
import RecentTransactions from './RecentTransactions'
import Finaceoverview from './Finaceoverview'

export default function Home() {
    const navigate = useNavigate();
    const [Dashboarddata, setDashboarddata] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINT.DEASHBOAREDREQUEST);
            if (res.status === 200) {
                setDashboarddata(res.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <Deashboard activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Infocard
                        icon={<WalletCards />}
                        label="Total Balance"
                        value={Dashboarddata?.totalBalance}
                        color="bg-purple-800"
                    />
                    <Infocard
                        icon={<Wallet />}
                        label="Total Income"
                        value={Dashboarddata?.totalIncome}
                        color="bg-green-800"
                    />
                    <Infocard
                        icon={<Coins />}
                        label="Total Expense"
                        value={Dashboarddata?.totalExpense}
                        color="bg-red-800"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <div className="w-full">
        <Finaceoverview
            totalIncome={Dashboarddata?.totalIncome}
            totalExpense={Dashboarddata?.totalExpense}
        />
    </div>
    <div className="w-full">
        <RecentTransactions
            transactions={Dashboarddata?.recentTransactions}
            onMore={() => navigate("/expense")}
        />
    </div>
</div>

            </div>
        </Deashboard>
    )
}
