import { Label } from "recharts";
import Deashboard from "../component/Deashboard";
import { Coins, FunnelIcon, LayoutDashboardIcon, List, Wallet } from "lucide-react";

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        path: "/dashboard",

    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category",

    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income",

    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense",

    }, {
        id: "05",
        label: "Filters",
        icon: FunnelIcon,
        path: "/filter",

    },
]