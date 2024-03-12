import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IToDoItemCreateRequest, IToDoItemResponse, IToDoItemUpdateRequest } from '../models/todo-item.model';


@Injectable({
  providedIn: 'root'
})
export class TodoListServiceService {

  config: any;

  constructor(private httpClient: HttpClient) { 
    this.config = environment.services_todo_config;
  }

  createToDoItem(toDoItemCreateRequest: IToDoItemCreateRequest): Observable<IToDoItemResponse> {
    return this.httpClient.post<IToDoItemResponse>(`${this.config.endpoint_base_url}${this.config.endpoint_create}`, toDoItemCreateRequest);
  }

  getAllToDoItems(): Observable<IToDoItemResponse[]> {
    const url = `${this.config.endpoint_base_url}${this.config.endpoint_get_all}`;
    console.log(url);
    return this.httpClient.get<IToDoItemResponse[]>(`${this.config.endpoint_base_url}${this.config.endpoint_get_all}`);
  }

  getToDoItemById(id: string): Observable<IToDoItemResponse> {
    return this.httpClient.get<IToDoItemResponse>(`${this.config.endpoint_base_url}${this.config.endpoint_get_by_id}${id}`);
  }

  updateToDoItem(toDoItemUpdateRequest: IToDoItemUpdateRequest): Observable<IToDoItemResponse> {
    return this.httpClient.put<IToDoItemResponse>(`${this.config.endpoint_base_url}${this.config.endpoint_update}`, toDoItemUpdateRequest);
  }

  deleteToDoItem(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.endpoint_delete}${id}`);
  }
}
