import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBalanceService {
  private apiUrl = 'https://moneymanager-d72u.onrender.com/api/user-balance';

  constructor(private http: HttpClient) { }

  getUserBalance(): Observable<{customBalance: number}> {
    return this.http.get<{customBalance: number}>(this.apiUrl);
  }

  updateUserBalance(customBalance: number): Observable<any> {
    return this.http.put(this.apiUrl, { customBalance });
  }
}