import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ITodoItemCreateRequest, ITodoItemResponse, ITodoItemUpdateRequest } from '../models/todo-item.model';
import { TodoHubService } from './todo-hub.service';
import { TodoGroupService } from './todo-group.service';


@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  config: any;

  constructor(private httpClient: HttpClient,
    private todoHubService: TodoHubService,
    private todoGroupService: TodoGroupService
  ) { 
    this.config = environment.todo_config;
  }

  createTodoItem(todoItemCreateRequest: ITodoItemCreateRequest): Observable<ITodoItemResponse> {
    return this.httpClient.post<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_create}`, todoItemCreateRequest);
  }

  getTodoItemsByUser(userId: string): Observable<ITodoItemResponse[]> {
    const url = `${this.config.endpoint_base_url}${this.config.endpoint_get_all}`;
    return this.httpClient.get<ITodoItemResponse[]>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_by_user}${userId}`);
  }

  getTodoItemsByGroup(groupId: string | null): Observable<ITodoItemResponse[]> {
    return this.httpClient.get<ITodoItemResponse[]>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_by_group}${groupId}`);
  }

  getTodoItemById(id: string): Observable<ITodoItemResponse> {
    return this.httpClient.get<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_get_by_id}${id}`);
  }

  async updateTodoItem(id: string, todoItemUpdateRequest: ITodoItemUpdateRequest): Promise<ITodoItemResponse> {

    let updatedTodoItem = await firstValueFrom(this.httpClient.put<ITodoItemResponse>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_update}${id}`, todoItemUpdateRequest));
    let todoGroup = await firstValueFrom(this.todoGroupService.getTodoGroupById(updatedTodoItem.groupId));
    await this.todoHubService.SendTodoGroupUpdatedMessage(todoGroup);
    return updatedTodoItem;
  }

  async deleteTodoItem(id: string, groupId: string): Promise<boolean> {
    let deleted = await firstValueFrom(this.httpClient.delete<boolean>(`${this.config.endpoint_base_url}${this.config.todoItem.endpoint_delete}${id}`));
    let todoGroup = await firstValueFrom(this.todoGroupService.getTodoGroupById(groupId));
    await this.todoHubService.SendTodoGroupUpdatedMessage(todoGroup);
    return deleted;
  }
}
