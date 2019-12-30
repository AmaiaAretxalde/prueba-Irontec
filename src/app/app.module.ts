import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { PaginationPipe } from './pipes/pagination.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    PaginationPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    
  

  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
