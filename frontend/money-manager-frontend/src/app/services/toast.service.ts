import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<string | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(message: string, duration: number = 1500) {
    this.toastSubject.next(message);
    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.toastSubject.next(null);
  }
}