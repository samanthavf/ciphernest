import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Texto } from "../model/text.model";

@Injectable({
    providedIn: 'root'
  })

  export class encodeService{
    constructor(private http: HttpClient) {}

    private enBase:string='http://localhost:8080/api/translate/encodeBase64'
    private deBase:string='http://localhost:8080/api/translate/decodeBase64'

    private enMorse:string='http://localhost:8080/api/translate/encodeMorse'
    private deMorse:string='http://localhost:8080/api/translate/decodeMorse'

    private enBinary:string='http://localhost:8080/api/translate/encodeBinary'
    private deBinary:string='http://localhost:8080/api/translate/decodeBinary'


    sendBase(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
        return this.http.post(this.enBase, JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }
    sendDecBase(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
        return this.http.post(this.deBase,  JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }

    sendMorse(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
        return this.http.post(this.enMorse, JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }
    sendDecMorse(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
        return this.http.post(this.deMorse, JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }

    sendBinary(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
       return this.http.post(this.enBinary , JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }
    sendDecBinary(txt:Texto):Observable<any>{
        console.log(JSON.stringify(txt));
        return this.http.post(this.deBinary, JSON.stringify(txt), { headers: { 'Content-Type': 'application/json' }})
    }
}