import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { API_ENDPOINT } from './apiEndpoint';
import axiosConfig from './axiosConfig';

export async function sendEmailWithPdf(transactions, type, userEmail) {
    const doc = new jsPDF();

    // Title styling
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(`${type} Report`, 14, 20);

    // Table headers
    const headers = [['#', 'Source', 'Amount (₹)', 'Date']];

    // Table rows
    const data = transactions.map((item, index) => [
        index + 1,
        item.name,
        item.amount.toLocaleString(),
        item.date,
    ]);

    // Generate beautiful colorful table
    autoTable(doc, {
        startY: 30,
        head: headers,
        body: data,
        styles: {
            fontSize: 10,
            textColor: 40,
            halign: 'center',
            valign: 'middle',
        },
        headStyles: {
            fillColor: [41, 128, 185], // Blue Header
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
        },
        bodyStyles: {
            fillColor: [240, 248, 255], // Light Blue body
            textColor: 50,
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255], // White striping
        },
        columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'right' },
            3: { halign: 'center' },
        },
    });

    // Create blob and send
    const pdfBlob = doc.output('blob');

    const formData = new FormData();
    formData.append('to', userEmail);
    formData.append('subject', `${type} Report`);
    formData.append('message', `Please find attached ${type} report.`);
    formData.append('file', pdfBlob, `${type.toLowerCase()}-report.pdf`);


    try {

      const res = await axiosConfig.post(API_ENDPOINT.EMAIL, formData);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}
    