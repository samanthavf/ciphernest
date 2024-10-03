import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { json } from "stream/consumers";

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
        const payload = { message: txt };
        return this.http.post<string>(this.enBase, payload, { responseType: 'text' as 'json' })
    }
    senDecBase(txt:string):Observable<string>{
        const payload = { message: txt };
        return this.http.post<string>(this.deBase, payload, { responseType: 'text' as 'json' })
    }

    sendMorse(txt:string):Observable<string>{
        const payload = { message: txt };
        return this.http.post<string>(this.enMorse, payload, { responseType: 'text' as 'json' })
    }
    sendDecMorse(txt:string):Observable<string>{
        const payload = { message: txt };
        return this.http.post<string>(this.deMorse, payload, { responseType: 'text' as 'json' })
    }

    sendBinary(txt:string):Observable<string>{
        const payload = { message: txt };
        return this.http.post<string>(this.enBinary , payload, { responseType: 'text' as 'json' })
    }
    sendDecBinary(txt:string):Observable<string>{
        const payload = { message: txt };
        return this.http.post<string>(this.deBinary, payload, { responseType: 'txt' as 'json' })
    }
}