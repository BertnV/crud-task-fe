import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import taskListModels from './models/taskListModels';
import taskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

API_BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient ) { }

  //API call to backend
  getTaskLists(url: string){
    return this.httpClient.get<taskListModels[]>( `${this.API_BASE_URL}/${url}`); // http://localhost:3000/taskLists
  }

  getTasks(url: string){
    return this.httpClient.get<taskModel[]>( `${this.API_BASE_URL}/${url}`); 
  }
  
  post(url: string, data: Object) {
    return this.httpClient.post( `${this.API_BASE_URL}/${url}`, data); //http://localhost:3000/taskLists
  }

  put(url: string, data: Object) {
    return this.httpClient.put( `${this.API_BASE_URL}/${url}`, data);
  }

  patch(url: string, data: Object) {
    return this.httpClient.patch<taskModel>( `${this.API_BASE_URL}/${url}`, data);
  }
  delete(url: string){
    return this.httpClient.delete( `${this.API_BASE_URL}/${url}`);
  }
}
