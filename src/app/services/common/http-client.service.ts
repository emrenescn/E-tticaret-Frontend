import { Inject, Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseUrl:string) { }
  //buradaki return ifadesi string interpolation backtick sayesinde oluşturuldu altgr virgül ile
  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }
  
  get<T>(requestParameter:Partial<RequestParameters>,id? :string):Observable<T>{
    let url:string="";
    if(requestParameter.fullEndPoint)
    url=requestParameter.fullEndPoint
    else
    url=`${this.url(requestParameter)}${id? `/${id}`:""}`;
    return this.httpClient.get<T>(url,{headers:requestParameter.headers});

  }
  post<T>(requestParameter:Partial<RequestParameters>,body:Partial<T>):Observable<T>{
  let url:string="";
  if(requestParameter.fullEndPoint)
  url=requestParameter.fullEndPoint;
  else
   url=`${this.url(requestParameter)}`;
  return this.httpClient.post<T>(url,body,{headers:requestParameter.headers});
  }
  put<T>(requestParameter:RequestParameters,body:Partial<T>):Observable<T>{
    let url:string="";
    if(requestParameter.fullEndPoint)
    url=requestParameter.fullEndPoint
    else
    url=`${this.url(requestParameter)}`
  return this.httpClient.put<T>(url,body,{headers:requestParameter.headers});
  }
  delete<T>(requestParameter:RequestParameters,id:string):Observable<T>{
    let url=""
    if(requestParameter.fullEndPoint)
    url=requestParameter.fullEndPoint;
  else
  url=`${this.url(requestParameter)}/${id}`;
return this.httpClient.delete<T>(url,{headers:requestParameter.headers});
  }
}
export class RequestParameters{
 controller?:string;
 action?:string;
 baseUrl?:string;
headers?:HttpHeaders;
fullEndPoint?:string;
}
