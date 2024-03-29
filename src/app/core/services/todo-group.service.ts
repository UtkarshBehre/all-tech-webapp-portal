import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ITodoGroupCreateRequest, ITodoGroupResponse, ITodoGroupUpdateRequest } from '../models/todo-group.model';

@Injectable({
  providedIn: 'root'
})
export class TodoGroupService {
  config: any;

  constructor(private httpClient: HttpClient) { 
    this.config = environment.services_config;
  }

  createTodoGroup(todoGroupCreateRequest: ITodoGroupCreateRequest): Observable<ITodoGroupResponse> {
    return this.httpClient.post<ITodoGroupResponse>(`${this.config.endpoint_base_url}${this.config.todoGroup.endpoint_create}`, todoGroupCreateRequest);
  }

  getTodoGroupById(id: string): Observable<ITodoGroupResponse> {
    return this.httpClient.get<ITodoGroupResponse>(`${this.config.endpoint_base_url}${this.config.todoGroup.endpoint_get_by_id}${id}`);
  }

  updateTodoGroup(id: string, todoGroupUpdateRequest: ITodoGroupUpdateRequest): Observable<ITodoGroupResponse> {
    return this.httpClient.put<ITodoGroupResponse>(`${this.config.endpoint_base_url}${this.config.todoGroup.endpoint_update}${id}`, todoGroupUpdateRequest);
  }

  deleteTodoGroup(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.todoGroup.endpoint_delete}${id}`);
  }
}
