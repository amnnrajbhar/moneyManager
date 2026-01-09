import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  _id?: string;
  name: string;
  relation: string;
  mobile?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // private apiUrl = 'http://localhost:5000/api/people';
  private apiUrl = 'https://moneymanager-d72u.onrender.com/api/people';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  addPerson(person: Omit<Person, '_id' | 'userId'>): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(id: string, person: Omit<Person, '_id' | 'userId'>): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}