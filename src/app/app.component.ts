import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.less',
  providers:[MessageService]
})
export class AppComponent {
  title = 'frontend';
}
