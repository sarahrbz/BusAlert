import { Component, signal } from '@angular/core';
import { ToastService } from './services/toast-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  constructor(public toast: ToastService) {}

}
