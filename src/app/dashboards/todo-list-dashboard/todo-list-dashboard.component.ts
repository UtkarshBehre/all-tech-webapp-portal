import { Component, OnChanges } from '@angular/core';
import { ITodoItemResponse } from '../../core/models/todo-item.model';
import { TodoItemService } from '../../core/services/todo-item.service';
import { UserService } from '../../core/services/user.service';
import { UserTodoService } from '../../core/services/user-todo.service';
import { TodoGroupService } from '../../core/services/todo-group.service';
import { IUserResponse } from '../../core/models/user.model';
import { IUserTodoResponse } from '../../core/models/user-todo.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AllTechAuthService } from '../../core/services/all-tech-auth.service';
import { forkJoin } from 'rxjs';
import { ITodoGroupResponse } from '../../core/models/todo-group.model';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent {

  isLoggedIn = false;
  userResponse!: IUserResponse;
  userTodoResponse!: IUserTodoResponse;
  
  inCompletedItemsByGroup: Map<string, ITodoItemResponse[]> = new Map<string, ITodoItemResponse[]>();
  inCompletedGroupIds: string[] = [];
  completedItemsByGroup: Map<string, ITodoItemResponse[]> = new Map<string, ITodoItemResponse[]>();
  completedGroupIds: string[] = [];

  todoGroupResponseById: Map<string, ITodoGroupResponse> = new Map<string, ITodoGroupResponse>();

  todoItemResponses: ITodoItemResponse[] = [];
  todoCompletedItemResponses: ITodoItemResponse[] = [];
  todoInCompletedItemResponses: ITodoItemResponse[] = [];
  newTitle: string = '';

  constructor(
    private todoItemService: TodoItemService,
    private todoGroupService: TodoGroupService,
    private userTodoService: UserTodoService,
    private userService: UserService,
    private allTechAuthService: AllTechAuthService
        ) {
    this.allTechAuthService.socialUserSubject.subscribe((socialUser) => {
      this.isLoggedIn = socialUser !== null;
      if (this.isLoggedIn) {
        this.loadUserData();
      }
      else{
        this.resetData();
      }
    });
  }

  async ngOnInit() { 
  }

   async loadUserData() {
    this.userResponse = await firstValueFrom(this.userService.getUser());
    this.userTodoResponse = await firstValueFrom(this.userTodoService.getUserTodoById(this.userResponse.id));

    for(let groupId of this.userTodoResponse.groupIds) {
      let inCompletedItems = await firstValueFrom(this.todoItemService.getTodoItemsByGroup(groupId, false));
      this.inCompletedItemsByGroup.has(groupId) ? this.inCompletedItemsByGroup.get(groupId)?.concat(inCompletedItems) : this.inCompletedItemsByGroup.set(groupId, inCompletedItems);
      let completedItems = await firstValueFrom(this.todoItemService.getTodoItemsByGroup(groupId, true));
      this.completedItemsByGroup.has(groupId) ? this.completedItemsByGroup.get(groupId)?.concat(completedItems) : this.completedItemsByGroup.set(groupId, completedItems);
    }
    this.completedGroupIds = Array.from(this.completedItemsByGroup.keys());
    this.inCompletedGroupIds = Array.from(this.inCompletedItemsByGroup.keys());
    
    let groupIds: Set<string> = new Set<string>();
    this.completedGroupIds.forEach((groupId: string) => groupIds.add(groupId));
    this.inCompletedGroupIds.forEach((groupId: string) => groupIds.add(groupId));

    for(let groupId of groupIds) {
      let todoGroupResponse = await firstValueFrom(this.todoGroupService.getTodoGroupById(groupId));
      this.todoGroupResponseById.set(groupId, todoGroupResponse);
    }
  }

  resetData() {
    this.userResponse = {} as IUserResponse;
    this.userTodoResponse = {} as IUserTodoResponse;
    this.todoItemResponses = [];
    this.todoCompletedItemResponses = [];
    this.todoInCompletedItemResponses = [];
  }

  filterUpdatedItems() {
    this.todoCompletedItemResponses = this.todoItemResponses.filter((item: ITodoItemResponse) => item.isComplete);
    this.todoInCompletedItemResponses = this.todoItemResponses.filter((item: ITodoItemResponse) => !item.isComplete);
  }

  addTask() {
    let value = this.newTitle;
    this.todoItemService.createTodoItem({title: value}).subscribe((response: ITodoItemResponse) => {
      this.todoItemResponses.unshift(response);
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error creating todo item');
    });
    this.newTitle = '';
  }

  onComplete(todoItemResponse: ITodoItemResponse) {
    this.todoItemService.updateTodoItem(todoItemResponse.id, todoItemResponse).subscribe((response: ITodoItemResponse) => {
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error updating todo item');
    });
  }

  onDelete(id: string) {
    this.todoItemService.deleteTodoItem(id).subscribe((response: boolean) => {
      this.todoItemResponses = this.todoItemResponses.filter((item: ITodoItemResponse) => item.id !== id)
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }
}
