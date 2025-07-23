import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";  // Correct named import

export const downloadPdf = (transactions, filename = "report.pdf", type = "Income") => {
    const doc = new jsPDF();

    doc.text(`${type} Report`, 14, 15);

    const tableColumn = ["#", "Name", "Date", "Amount (₹)"];
    const tableRows = transactions.map((item, index) => [
        index + 1,
        item.name,
        item.date,
        item.amount.toLocaleString(),
    ]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        theme: "striped",
        styles: { fontSize: 10 },
    });

    doc.save(filename);
};


export const generateIncomePdfBlob = (transactions) => {
    const doc = new jsPDF();
    doc.text('Income Report', 10, 10);

    transactions.forEach((t, index) => {
        doc.text(`${t.name} - ₹${t.amount} - ${t.date}`, 10, 20 + index * 10);
    });

    return doc.output('blob');
};