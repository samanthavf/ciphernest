import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EncodingComponent } from './encoding/encoding.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    EncodingComponent
], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'MessageEncoder-front';
}