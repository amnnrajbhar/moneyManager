import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  _id?: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(month?: number, year?: number): Observable<Transaction[]> {
    let url = this.apiUrl;
    if (month && year) {
      url += `?month=${month}&year=${year}`;
    }
    return this.http.get<Transaction[]>(url);
  }

  addTransaction(transaction: Omit<Transaction, '_id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}