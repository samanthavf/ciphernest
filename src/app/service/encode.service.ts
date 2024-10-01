import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class encodeService{
    constructor( private http:HttpClient) {}

    private enBase:string='http://localhost:8080/api/translate/encodeBase64'
    private deBase:string='http://localhost:8080/api/translate/decodeBase64'

    private enMorse:string='http://localhost:8080/api/translate/encodeMorse'
    private deMorse:string='http://localhost:8080/api/translate/decodeMorse'

    private enBinary:string='http://localhost:8080/api/translate/encodeBinary'
    private deBinary:string='http://localhost:8080/api/translate/decodeBinary'

    sendBase(txt:string):Observable<string>{
        return this.http.post<string>(this.enBase, txt)
    }
    senDecBase(txt:string):Observable<string>{
        return this.http.post<string>(this.deBase, txt)
    }

    sendMorse(txt:string):Observable<string>{
        return this.http.post<string>(this.enMorse, txt)
    }
    sendDecMorse(txt:string):Observable<string>{
        return this.http.post<string>(this.deMorse, txt)
    }

    sendBinary(txt:string):Observable<string>{
        return this.http.post<string>(this.enBinary, txt)
    }
    sendDecBinary(txt:string):Observable<string>{
        return this.http.post<string>(this.deBinary, txt)
    }
}