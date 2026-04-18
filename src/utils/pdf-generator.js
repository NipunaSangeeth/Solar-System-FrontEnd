import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from "date-fns";

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 64, 175);
  doc.text("YOUR COMPANY NAME", 14, 22);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("support@yourcompany.com", 14, 28);

  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text("OFFICIAL RECEIPT", pageWidth - 70, 22);

  // Invoice details table
  autoTable(doc, {
    startY: 45,
    head: [['Invoice Details', '']],
    body: [
      ['Invoice ID', `#${invoice._id.slice(-8).toUpperCase()}`],
      ['Date Generated', format(new Date(), "MMMM d, yyyy")],
      ['Billing Period', `${format(new Date(invoice.billingPeriodStart), "MMM d")} - ${format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}`],
      ['Status', 'PAID'],
    ],
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: 'bold', width: 40 } }
  });

  // Line items
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Description', 'Usage', 'Rate', 'Total']],
    body: [[
      'Solar Monitoring Service Fee',
      `${invoice.totalEnergyGenerated.toFixed(2)} kWh`,
      '$0.05 / unit',
      `$${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}`
    ]],
    headStyles: { fillColor: [30, 64, 175] },
  });

  const finalY = doc.lastAutoTable.finalY;
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Paid: $${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}`, pageWidth - 60, finalY + 15);

  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(150);
  doc.text("This is an electronically generated receipt.", 14, finalY + 30);

  doc.save(`Invoice_${invoice._id.slice(-8).toUpperCase()}.pdf`);
};
