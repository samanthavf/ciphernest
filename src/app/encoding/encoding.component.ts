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

send(){
  if (this.encode()) {
    switch (this.selectedCodeType) {
      case "Binary":
        this.servico.sendBinary(this.txt).subscribe(
          {
            next: (response) => console.log('Binary sent successfully', response),
            error: (error) =>console.error('Error sending binary', error)
          })
        break;
        case"Base64":
        this.servico.sendBase(this.txt).subscribe(
          {
            next: (response) => console.log('Base64 sent successfully', response),
            error: (error) => console.log('Error sending Base64', error)    
          })
        break;
        case"Morse":
        this.servico.sendMorse(this.txt).subscribe({
          next: (response) => console.log('Morse sent successfully', response),
          error: (error) => console.log('Error sendingMorse', error)
        })
        break;
      default:
        break;
    }
  }

  if (this.decode()) {
    switch (this.selectedCodeType) {
      case "Binary":
        this.servico.sendDecBinary(this.txt).subscribe({
          next: (response) => console.log('Binary to Text successfully', response),
          error: (error) =>console.error('Error sending text', error)
        })
        break;
      case "Base64":
        this.servico.sendDecBinary(this.txt).subscribe({
          next: (response) => console.log('Base64 to Text successfully', response),
          error: (error) =>console.error('Error sending text', error)
        })
      break;

    case "Morse":
      this.servico.sendDecMorse(this.txt).subscribe({
        next: (response) => console.log('Morse to Text successfully', response),
        error: (error) =>console.error('Error sending text', error)
      })
    break;
      default:
        break;
    }
  }
}

encode(){
  this.isEncodeClicked=true;
  this.isDecodeClicked=false;
  this.codeButtons()
  if (this.txt) {
    switch (this.selectedCodeType) {
      case 'Binary':
        return this.textToBinary(this.txt);
      case 'Base64':
        return btoa(this.txt);
      case 'Morse':
        return this.textToMorse(this.txt);
      default:
        console.error('Unsupported encoding type');
        return null;
    }
  }
  return null;
}

decode(){
  this.isDecodeClicked=true;
  this.isEncodeClicked=false;
  this.codeButtons()
  if (this.txt) {
    switch (this.selectedCodeType) {
      case 'Binary':
        return this.binaryToText(this.txt);
      case 'Base64':
        try {
          return atob(this.txt);
        } catch (error) {
          console.error('Invalid Base64 string');
          return null;
        }
      case 'Morse':
        return this.morseToText(this.txt);
      default:
        console.error('Unsupported decoding type');
        return null;
    }
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

textToBinary(text: string): string {
  return text.split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

binaryToText(binary: string): string {
  return binary.split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
}

textToMorse(text: string): string {
  const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
  };

  
  return text.toUpperCase().split('')
    .map(char => morseCode[char as keyof typeof morseCode] || ' ')
    .join(' ');
}



morseToText(morse: string): string {
  const textCode = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
    '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
    '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
    '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
    '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
    '----.': '9', '-----': '0'
  };

  return morse.split(' ')
  .map(symbol => textCode[symbol as keyof typeof textCode] || ' ')
  .join('');
}


}
