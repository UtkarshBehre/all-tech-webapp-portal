import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ITodoItemCreateRequest, ITodoItemResponse, ITodoItemUpdateRequest } from '../models/todo-item.model';


@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  config: any;

  constructor(private httpClient: HttpClient) { 
    this.config = environment.services_config;
  }

  createTodoItem(todoItemCreateRequest: ITodoItemCreateRequest): Observable<ITodoItemResponse> {
    return this.httpClient.post<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_create}`, todoItemCreateRequest);
  }

  getAllTodoItems(): Observable<ITodoItemResponse[]> {
    const url = `${this.config.endpoint_base_url}${this.config.endpoint_get_all}`;
    return this.httpClient.get<ITodoItemResponse[]>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_all}`);
  }

  getTodoItemsByGroup(groupId: string, isComplete: boolean): Observable<ITodoItemResponse[]> {
    return this.httpClient.get<ITodoItemResponse[]>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_by_group}${groupId}/${isComplete}`);
  }

  getTodoItemById(id: string): Observable<ITodoItemResponse> {
    return this.httpClient.get<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_by_id}${id}`);
  }

  updateTodoItem(id: string, todoItemUpdateRequest: ITodoItemUpdateRequest): Observable<ITodoItemResponse> {
    return this.httpClient.put<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_update}${id}`, todoItemUpdateRequest);
  }

  deleteTodoItem(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_delete}${id}`);
  }
}
