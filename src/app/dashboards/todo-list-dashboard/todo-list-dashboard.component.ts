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
import { first, forkJoin } from 'rxjs';
import { ITodoGroupResponse } from '../../core/models/todo-group.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { ITodoItemCreateRequest } from '../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent {

  isLoggedIn = false;
  isLoading = false;
  userResponse!: IUserResponse;
  userTodoResponse!: IUserTodoResponse;
  
  todoGroups: ITodoGroupResponse[] = [];
  todoItems: ITodoItemResponse[] = [];
  newTitle: string = '';
  selectedGroup!: ITodoGroupResponse;

  constructor(
    private dashboardService: DashboardService,
    private todoItemService: TodoItemService,
    private todoGroupService: TodoGroupService,
    private userTodoService: UserTodoService,
    private userService: UserService,
    private allTechAuthService: AllTechAuthService
        ) {
  }

  async ngOnInit() { 
    this.allTechAuthService.socialUserSubject.subscribe((socialUser) => {
      this.isLoggedIn = socialUser !== null;
      if (this.isLoggedIn) {
        this.loadUserData();
      }
    });
    this.isLoggedIn = this.allTechAuthService.socialUser !== null
    if (this.isLoggedIn) {
      this.loadUserData();
    }
  }

  changeGroup(selectedGroup: ITodoGroupResponse) {
    this.selectedGroup = selectedGroup;
  }

  async loadUserData() {
    this.isLoading = true;

    this.userResponse = await firstValueFrom(this.userService.getUser());
    let dashboardData = await firstValueFrom(this.dashboardService.GetUserDashboardData(this.userResponse.id));

    this.todoItems = dashboardData.todoItems;
    this.todoGroups = dashboardData.todoGroups;
    console.log(this.todoItems);
    console.log(this.todoGroups);
    this.selectedGroup = this.todoGroups[0];
    this.isLoading = false;
  }

  // addTask(id: string) {
  //   let value = this.newTitle;
  //   let request: ITodoItemCreateRequest = {
  //     title: value,
  //     groupId: id
  //   };
  //   this.todoItemService.createTodoItem(request).subscribe((response: ITodoItemResponse) => {
  //     this.todoItems.unshift(response);
  //   }, (error: any) => {
  //     alert('Error creating todo item');
  //   });
  //   this.newTitle = '';
  // }

  // onDelete(id: string) {
  //   this.todoItemService.deleteTodoItem(id).subscribe((response: boolean) => {
  //     this.todoItems = this.todoItems.filter((item: ITodoItemResponse) => item.id !== id)
  //   }, (error: any) => {
  //     alert('Error deleting todo item');
  //   });
  // }
}
