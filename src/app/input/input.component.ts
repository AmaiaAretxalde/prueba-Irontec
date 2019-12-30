import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { PageEvent } from '@angular/material/paginator';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  value = 'Clear me';
  url:string ="";
  issues:any[]=[];
  page:number = 1;
  lastPage:number;
  mounted:boolean = false;
 
  constructor(private githubService:GithubService) { }
  
  async buscarIssues(){
    this.mounted=false;
    this.lastPage=1;
    console.log('buscando')
    for(let i=0;i<this.lastPage;i++){
      console.log(this.url)
      console.log(this.page)
      let urlCompleta = this.completarUrl(this.url, this.page)
      console.log(urlCompleta)
      let response = await this.githubService.buscarIssues(urlCompleta);
      this.issues = this.issues.concat(response.body);
      this.lastPage = this.parse_link_header(response.headers.get('Link'))
      this.page++;
    }
    this.mounted=true;
    console.log(this.mounted)
    console.log(this.issues.length)
    
  }

  completarUrl(url:string, page:number){
    let urlCompleta:string = 'https://api.github.com/repos/'+ url+'/issues?page='+ page + '&per_page=100';
    return urlCompleta;
  }

  parse_link_header(header:any) {
    if (header===null || header.length===0) {
      return ;
    }
    let parts = header.split(',');
    let links = {};
    let lastPage:number = 1;
    parts.forEach( p => {
      let section = p.split(';');
      let url = section[0].replace(/<(.*)>/, '$1').trim();
      let name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
      if(name==='last'){
        lastPage=parseInt(url.substring(url.indexOf('?page=')+6,url.indexOf('&')));
      }

    }); 
    return lastPage;
  }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;

  }

  page_size : number = 10;
  page_number : number = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];
 
};

