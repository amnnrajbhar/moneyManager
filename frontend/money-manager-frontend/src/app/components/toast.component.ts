import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toastService.toast$ | async as message" 
         class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30">
      <div class="text-white text-sm font-normal italic px-6 py-3 text-center animate-pulse">
        {{ message }}
      </div>
    </div>
  `
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}