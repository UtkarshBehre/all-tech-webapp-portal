import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserTodoCreateRequest, IUserTodoResponse, IUserTodoUpdateRequest } from '../models/user-todo.model';

@Injectable({
  providedIn: 'root'
})
export class UserTodoService {
  config: any;

  constructor(private httpClient: HttpClient) { 
    this.config = environment.todo_config;
  }

  createUserTodo(userTodoCreateRequest: IUserTodoCreateRequest): Observable<IUserTodoResponse> {
    return this.httpClient.post<IUserTodoResponse>(`${this.config.endpoint_base_url}${this.config.userTodo.endpoint_create}`, userTodoCreateRequest);
  }

  getAllUserTodos(): Observable<IUserTodoResponse[]> {
    const url = `${this.config.endpoint_base_url}${this.config.endpoint_get_all}`;
    return this.httpClient.get<IUserTodoResponse[]>(`${this.config.endpoint_base_url}${this.config.userTodo.endpoint_get_all}`);
  }

  getUserTodoById(id: string): Observable<IUserTodoResponse> {
    return this.httpClient.get<IUserTodoResponse>(`${this.config.endpoint_base_url}${this.config.userTodo.endpoint_get_by_id}${id}`);
  }

  updateUserTodo(id: string, userTodoUpdateRequest: IUserTodoUpdateRequest, ): Observable<IUserTodoResponse> {
    return this.httpClient.put<IUserTodoResponse>(`${this.config.endpoint_base_url}${this.config.userTodo.endpoint_update}${id}`, userTodoUpdateRequest);
  }

  deleteUserTodo(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.userTodo.endpoint_delete}${id}`);
  }
}
