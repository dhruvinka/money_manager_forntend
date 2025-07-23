import moment from 'moment';

export function prepareIncomeLineChartData(transactions) {
    const dataMap = new Map();

    transactions.forEach((t) => {
        const month = moment(t.date).format('MMM YYYY');
        if (!dataMap.has(month)) {
            dataMap.set(month, 0);
        }
        dataMap.set(month, dataMap.get(month) + t.amount);
    });

    // Sort months correctly
    const sorted = Array.from(dataMap).sort(([a], [b]) => moment(a, 'MMM YYYY') - moment(b, 'MMM YYYY'));

    return sorted.map(([name, income]) => ({ name, income }));
}

export const prepareExpenseLineChartData = (transactions) => {
    const monthlyData = {};

    transactions.forEach((item) => {
        const month = moment(item.date).format('MMM YYYY');
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += item.amount;
    });

    const sortedKeys = Object.keys(monthlyData).sort((a, b) => moment(a, 'MMM YYYY') - moment(b, 'MMM YYYY'));

    return sortedKeys.map((month) => ({
        name: month,
        expense: monthlyData[month],
    }));
};
