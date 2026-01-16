import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

export interface PDFExportOptions {
  transactions: any[];
  startDate?: Date;
  endDate?: Date;
  month?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  generateTransactionPDF(options: PDFExportOptions): void {
    const { transactions, startDate, endDate, month } = options;

    // Filter transactions by date range or month
    let filteredTransactions = transactions;
    if (startDate && endDate) {
      filteredTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= startDate && tDate <= endDate;
      });
    } else if (month) {
      filteredTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.toISOString().substring(0, 7) === month;
      });
    }

    // Calculate summary
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income' || (t.type === 'Borrowed' && t.category === 'Lent Money'))
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense' || (t.type === 'Borrowed' && t.category === 'Borrowed Money'))
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Generate HTML content
    const htmlContent = this.generateHTMLContent(filteredTransactions, totalIncome, totalExpense, balance, month, startDate, endDate);

    // PDF options
    const opt = {
      margin: 10,
      filename: `MoneyManager_Report_${Date.now()}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    // Generate PDF
    html2pdf().set(opt).from(htmlContent).save();
  }

  private generateHTMLContent(transactions: any[], totalIncome: number, totalExpense: number, balance: number, month?: string, startDate?: Date, endDate?: Date): string {
    const dateRange = month 
      ? `Month: ${new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
      : `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`;

    // Safe percentage calculation
    const total = totalIncome + totalExpense;
    const incomePercent = total > 0 ? (totalIncome / total) * 100 : 50;
    const expensePercent = total > 0 ? (totalExpense / total) * 100 : 50;

    const transactionRows = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((t, index) => {
        const isBorrowed = this.getTransactionType(t) === 'Borrowing';
        const bgColor = isBorrowed ? '#fef9c3' : (index % 2 === 0 ? '#f0f9ff' : '#ffffff');
        return `
        <tr style="background: ${bgColor};">
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${new Date(t.date).toLocaleDateString()}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${this.getTransactionType(t)}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${t.category}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right; font-family: 'Courier New', monospace;">₹${this.formatCurrency(t.amount)}</td>
          <td style="padding: 8px; border: 1px solid #e5e7eb;">${t.note || '-'}</td>
        </tr>
      `;
      }).join('');

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: white; color: black;">
        <div style="display: table; width: 100%; margin-bottom: 30px;">
          <div style="display: table-cell; width: 33%; vertical-align: middle;">
            <img src="/assets/android-chrome-192x192.png" style="width: 50px; height: 50px; border-radius: 8px;" />
          </div>
          <div style="display: table-cell; width: 34%; text-align: center; vertical-align: middle;">
            <h1 style="color: #f97316; margin: 0; font-size: 24px;">Money Manager</h1>
            <h2 style="color: #000; margin: 8px 0 0 0; font-size: 18px;">Transaction Report</h2>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">${dateRange}</p>
          </div>
          <div style="display: table-cell; width: 33%;"></div>
        </div>

        <div style="background: #ffffff; border: 2px solid #f97316; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #f97316; margin: 0 0 10px 0; padding-bottom: 10px; border-bottom: 1px solid #fed7aa;">Summary</h3>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="flex: 1;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; font-size: 14px;">Total Income:</td>
                  <td style="padding: 10px; text-align: right; color: #16a34a; font-size: 14px;">₹${this.formatCurrency(totalIncome)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; font-size: 14px;">Total Expense:</td>
                  <td style="padding: 10px; text-align: right; color: #dc2626; font-size: 14px;">₹${this.formatCurrency(totalExpense)}</td>
                </tr>
                <tr style="border-top: 2px solid #f97316;">
                  <td style="padding: 10px; font-weight: bold; font-size: 18px;">Balance:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px; color: ${balance >= 0 ? '#16a34a' : '#dc2626'};">₹${this.formatCurrency(Math.abs(balance))}</td>
                </tr>
              </table>
            </div>
            <div style="flex: 0 0 200px; text-align: center; margin-left: 20px;">
              <div style="font-size: 11px; font-weight: bold; margin-bottom: 10px;">Income vs Expense</div>
              <div style="display: flex; height: 100px; border-radius: 8px; overflow: hidden; border: 2px solid #000;">
                <div style="background: #16a34a; width: ${incomePercent}%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">${Math.round(incomePercent)}%</div>
                <div style="background: #dc2626; width: ${expensePercent}%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">${Math.round(expensePercent)}%</div>
              </div>
              <div style="margin-top: 10px; font-size: 10px; display: flex; justify-content: center; gap: 15px;">
                <div><span style="display: inline-block; width: 12px; height: 12px; background: #16a34a; margin-right: 5px; border: 1px solid #000;"></span>Income</div>
                <div><span style="display: inline-block; width: 12px; height: 12px; background: #dc2626; margin-right: 5px; border: 1px solid #000;"></span>Expense</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style="color: #f97316; margin: 0 0 15px 0;">Transactions</h3>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
            <thead>
              <tr style="background: #fed7aa; color: #92400e;">
                <th style="padding: 10px; text-align: left; font-weight: bold;">Date</th>
                <th style="padding: 10px; text-align: left; font-weight: bold;">Type</th>
                <th style="padding: 10px; text-align: left; font-weight: bold;">Category</th>
                <th style="padding: 10px; text-align: right; font-weight: bold;">Amount</th>
                <th style="padding: 10px; text-align: left; font-weight: bold;">Note</th>
              </tr>
            </thead>
            <tbody>
              ${transactionRows}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 5px 0;">Generated on ${new Date().toLocaleString()}</p>
          <p style="margin: 5px 0;">Money Manager – Your Financial Companion</p>
        </div>
      </div>
    `;
  }

  private getTransactionType(transaction: any): string {
    if (transaction.type === 'income' || (transaction.type === 'Borrowed' && transaction.category === 'Lent Money')) {
      return 'Income';
    } else if (transaction.type === 'Borrowed') {
      return 'Borrowing';
    }
    return 'Expense';
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN').format(amount);
  }
}
