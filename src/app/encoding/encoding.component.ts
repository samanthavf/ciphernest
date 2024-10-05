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
    alert('Texto copiado para a área de transferência!');
  }).catch(err => {
    console.error('Erro ao copiar texto: ', err);
  });
}

send(){
if (this.selectedCodeType) {
  switch (true) {
    case this.encodeButton():
      console.log('encode');
    this.encode()
      break;
  case this.decodeButton():
    console.log('decode');
    this.decode()
    break;
    default:
      alert('Ops, ocorreu um erro. Nenhuma ação selecionada.');
      break;
  } 
} else {
  alert('Ops, ocorreu um erro. Nenhum tipo de código selecionado.');
}
}

encode(){
  this.encodeButton()

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
            console.error('Error sending binary', error);
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
            console.log('Error sending Base64', error);
            
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
          console.log('Error sendingMorse', error);
        },})
        break;
    default:
      console.log('Invalid code type selected');
  }
}
}

decode(){
  this.decodeButton()

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
        console.error('Error sending text', error);
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
            console.error('Error sending text', error);
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
          console.error('Error sending text', error);
        }
        })
  break;
    default:
      console.log('Invalid code type selected');
  }
}
}

encodeButton():boolean{
  this.isEncodeClicked=true;
  this.isDecodeClicked=false;
  this.codeButtons()
  return true;
}

decodeButton():boolean{
    this.isDecodeClicked=true;
    this.isEncodeClicked=false;
    this.codeButtons()
     return true;
}

codeButtons(){
  const rolando = this.el.nativeElement.querySelector('.left-btn');

  const rolandoDec = this.el.nativeElement.querySelector('.right-btn');

  if (this.isEncodeClicked) {

      rolando.style.backgroundColor = 'rgba(47, 123, 255, 0.8)';
      rolandoDec.style.backgroundColor = '';

  }else if(this.isDecodeClicked){

      rolandoDec.style.backgroundColor = 'rgba(47, 123, 255, 0.8)';
      rolando.style.backgroundColor = '';
  }
}

}
