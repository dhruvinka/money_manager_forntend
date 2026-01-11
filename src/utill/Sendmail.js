import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export async function sendEmailWithPdf(transactions, type, userEmail) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`${type} Report`, 14, 20);

  const headers = [["#", "Source", "Amount (₹)", "Date"]];

  const data = transactions.map((item, index) => [
    index + 1,
    item.name,
    item.amount.toLocaleString(),
    item.date,
  ]);

  autoTable(doc, {
    startY: 30,
    head: headers,
    body: data,
  });

  const pdfBlob = doc.output("blob");

  const formData = new FormData();
  formData.append("to", userEmail);
  formData.append("subject", `${type} Report`);
  formData.append("message", `Please find attached ${type} report.`);
  formData.append("file", pdfBlob, `${type.toLowerCase()}-report.pdf`);

  try {
    const res = await axios.post(
      "https://money-rwal.onrender.com/email/send",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(" Email sent:", res.data);
  } catch (error) {
    console.error(" Email error:", error.response || error);
  }
}
