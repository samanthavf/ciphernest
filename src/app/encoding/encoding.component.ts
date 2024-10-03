import { Component, ElementRef } from '@angular/core';
import { encodeService } from '../service/encode.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encoding',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './encoding.component.html',
  styleUrl: './encoding.component.css'
})
export class EncodingComponent {
constructor(private servico:encodeService, private el: ElementRef){}

selectedCodeType: string = '';
txt:string='';
txtCode:string='';
isDecodeClicked:boolean = false;
isEncodeClicked:boolean = false;

copyText() {
  navigator.clipboard.writeText(this.txt).then(() => {
    alert('Texto copiado para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar texto: ', err);
  });
}

send(): string | null{
if(this.txt){
  switch (this.selectedCodeType) {
    case "Binary":
      this.servico.sendDecBinary(this.txt).subscribe({
        next: (response) => {
          console.log('Binary to Text successfully', response)
          this.txtCode = response;
      },
        error: (error) => {
        console.error('Error sending text', error);
        return null;
    }
      })
      break;
    case "Base64":
      this.servico.sendDecBinary(this.txt).subscribe({
        next: (response) => {
          console.log('Base64 to Text successfully', response)
          this.txtCode = response;
        },
          error: (error) => {
            console.error('Error sending text', error);
          return null;
          }
          })
    break;

  case "Morse":
    this.servico.sendDecMorse(this.txt).subscribe({
      next: (response) => {
        console.log('Morse to Text successfully', response)
        this.txtCode = response;
      },
        error: (error) =>{
          console.error('Error sending text', error);
          return null;
        }
        })
  break;
    default:
      console.log('Invalid code type selected');
      return null;
  }
}

if (this.txt) {
  switch (this.selectedCodeType) {
    case "Binary":
      this.servico.sendBinary(this.txt).subscribe(
        {
          next: (response) =>{
            console.log('Binary sent successfully', response)
            this.txtCode = response;
          },
          error: (error) => {
            console.error('Error sending binary', error);
            return null;
          } 
        })
      break;
      case"Base64":
      this.servico.sendBase(this.txt).subscribe(
        {
          next: (response) =>{ console.log('Base64 sent successfully', response)
          this.txtCode = response;
        },
          error: (error) => {
            console.log('Error sending Base64', error);
            return null;
          }     
        })
      break;
      case"Morse":
      this.servico.sendMorse(this.txt).subscribe({
        next: (response) => {console.log('Morse sent successfully', response)
        this.txtCode = response;
      },
        error: (error) =>
        {
          console.log('Error sendingMorse', error);
          return null;
        },})
      break;
    default:
      console.log('Invalid code type selected');
      return null;
  }
}
return null;
}

encode(){
  this.isEncodeClicked=true;
  this.isDecodeClicked=false;
  this.codeButtons()
  this.txt = this.txtCode;
}

decode(): string | null{
  this.isDecodeClicked=true;
  this.isEncodeClicked=false;
  this.codeButtons()
  if (this.txt) {
   
  }
  return null;
}

codeButtons(){
  const rolando = this.el.nativeElement.querySelector('.left-btn');
  const rolandoDec = this.el.nativeElement.querySelector('.right-btn');
  if (this.isEncodeClicked) {
      rolando.style.backgroundColor = 'rgba(47, 123, 255, 0.8';
      rolandoDec.style.backgroundColor = '';
  }else if(this.isDecodeClicked){
      rolandoDec.style.backgroundColor = 'rgba(47, 123, 255, 0.8';
      rolando.style.backgroundColor = '';
  }
}

}
