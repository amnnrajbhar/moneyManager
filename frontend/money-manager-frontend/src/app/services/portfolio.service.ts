import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Portfolio {
  _id?: string;
  name: string;
  type: 'stocks' | 'mutual_funds' | 'bonds' | 'crypto' | 'other';
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'https://moneymanager-d72u.onrender.com/api/portfolio';

  constructor(private http: HttpClient) { }

  getPortfolioItems(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  addPortfolioItem(item: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.apiUrl, item);
  }

  deletePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}