import { Component, ElementRef } from '@angular/core';
import { encodeService } from '../service/encode.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Texto } from '../model/text.model';

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

selectedCodeType:string='';
isDecodeClicked:boolean = false;
isEncodeClicked:boolean = false;
texto = new Texto();

copyText() {
  navigator.clipboard.writeText(this.texto.textToSend).then(() => {
    alert('Copied text!');
  }).catch(err => {
    console.error('Error copying text: ', err);
  });
}

send(){
  switch (true) {
    case this.isDecodeClicked:
      console.log('decode');
      this.decode();
      return false;
    case this.isEncodeClicked:
      console.log('encode');
      this.encode();
      return false;
    default:
      alert('No actions selected.');
      return false;
  }
}

encode(){
  if (!this.texto.text) {
    console.error('No text to encode.')
  }else{
  switch (this.selectedCodeType) {
    case "Binary":
      this.servico.sendBinary(this.texto).subscribe(
        {
          next: (response) =>{
            console.log('Binary sent successfully', response),
            this.texto.textToSend = response.text;

          const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
          areaDeTexto.value = ''; 
          },
          error: (error) => {
            console.error('Error sending text', error);
            alert('Error sending binary.');
          } 
        })
      break;
      case"Base64":
      this.servico.sendBase(this.texto).subscribe(
        {
          next: (response) =>{ console.log('Base64 sent successfully', response)
          this.texto.textToSend = response.text;

          const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
          areaDeTexto.value = ''; 
        },
          error: (error) => {
            console.error('Error sending text', error);
            alert('Error sending Base64');
            
          }     
        })
      break;
      case"Morse":
      this.servico.sendMorse(this.texto).subscribe({
        next: (response) => {console.log('Morse sent successfully', response)
        this.texto.textToSend = response.text;

        const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
        areaDeTexto.value = ''; 
      },
        error: (error) =>
        {
          console.error('Error sending text', error);
          alert('Error sending Morse')
        },})
        break;
    default:
      console.log('Invalid code type selected');
      alert('Invalid code type selected');
  }
}
}

decode(){
  if (!this.texto.text) {
    console.error('No text to decode.');
  }else{
  switch (this.selectedCodeType) {
    case "Binary":
      this.servico.sendDecBinary(this.texto).subscribe({
        next: (response) => {
          console.log('Binary to Text successfully', response)
          this.texto.textToSend = response.text;

          const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
          areaDeTexto.value = '';

      },
        error: (error) => {
        console.error('Error sending binary', error);
        alert('Error sending binary.');
    }
      })
      break;
    case "Base64":
      this.servico.sendDecBase(this.texto).subscribe({
        next: (response) => {
          console.log('Base64 to Text successfully', response)
          this.texto.textToSend = response.text;

          const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
          areaDeTexto.value = '';
        },
          error: (error) => {
            console.log('Error sending Base64', error);
            alert('Error sending Base64');
          }
          })
    break;

  case "Morse":
    this.servico.sendDecMorse(this.texto).subscribe({
      next: (response) => {
        console.log('Morse to Text successfully', response)
        this.texto.textToSend = response.text;

        const areaDeTexto = this.el.nativeElement.querySelector('#text-message');
        areaDeTexto.value = '';
      },
        error: (error) =>{
          console.log('Error sending Morse', error);
          alert('Error sending Morse')
        }
        })
  break;
    default:
      console.log('Invalid code type selected');
      alert('Invalid code type selected');
  }
}
}

encodeButton():boolean{
  this.isEncodeClicked= true;
  this.isDecodeClicked=false;
  this.codeButtons();
  return true;
}

decodeButton():boolean{
  this.isDecodeClicked=true;
  this.isEncodeClicked=false; 
  this.codeButtons();
  return true;
}

codeButtons(){
  const left = this.el.nativeElement.querySelector('.left-btn');
  const right = this.el.nativeElement.querySelector('.right-btn');

  switch (true) {
    case this.isEncodeClicked:
      left.style.backgroundColor = 'rgba(47, 123, 255, 0.8)';
      right.style.backgroundColor = '';
      break;
    case this.isDecodeClicked:
      right.style.backgroundColor = 'rgba(47, 123, 255, 0.8)';
      left.style.backgroundColor = '';
    break;
    default:
      console.log('Ops, ocorreu algum erro a selecionar o botão.');
      break;
  }
}

}
