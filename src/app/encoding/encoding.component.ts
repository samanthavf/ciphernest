import { Component } from '@angular/core';
import { encodeService } from '../service/encode.service';

@Component({
  selector: 'app-encoding',
  standalone: true,
  imports: [],
  templateUrl: './encoding.component.html',
  styleUrl: './encoding.component.css'
})
export class EncodingComponent {
constructor(private servico:encodeService){}

copyText() {
throw new Error('Method not implemented.');
}





}
