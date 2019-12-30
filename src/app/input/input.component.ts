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
  lastPage:number = 1;
 
  constructor(private githubService:GithubService) { }
  
  async buscarIssues(){
    for(let i=0;i<this.lastPage;i++){
      let urlCompleta:string = 'https://api.github.com/repos/'+ this.url+'/issues?page='+this.page + '&per_page=100';
      let response = await this.githubService.buscarIssues(urlCompleta);
      this.issues = this.issues.concat(response.body);
      this.lastPage = this.parse_link_header(response.headers.get('Link'))
      this.page++;
    }
  }

  parse_link_header(header:any) {
    if (header.length === 0) {
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

