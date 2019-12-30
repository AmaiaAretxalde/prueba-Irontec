import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(public http: HttpClient) { }

  async buscarIssues(url:string){
    let response:any = await this.http.get(url, {headers: {
      "Accept": "application/json"},observe: "response"})
    .toPromise();
    return response;
  }

}
