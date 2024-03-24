import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ITodoGroupResponse } from '../../core/models/todo-group.model';
import { ITodoItemResponse, ITodoItemCreateRequest } from '../../core/models/todo-item.model';
import { IUserTodoResponse } from '../../core/models/user-todo.model';
import { IUserResponse } from '../../core/models/user.model';
import { AllTechAuthService } from '../../core/services/all-tech-auth.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { TodoGroupService } from '../../core/services/todo-group.service';
import { TodoItemService } from '../../core/services/todo-item.service';
import { UserTodoService } from '../../core/services/user-todo.service';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrl: './todo-group.component.scss'
})
export class TodoGroupComponent {
  userResponse!: IUserResponse;
  userTodoResponse!: IUserTodoResponse;
  
  @Input() todoGroups: ITodoGroupResponse[] = [];
  @Input() todoItems: ITodoItemResponse[] = [];
  @Input() selectedTodoGroup!: ITodoGroupResponse;
  
  newTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private todoItemService: TodoItemService,
    private todoGroupService: TodoGroupService,
    private userTodoService: UserTodoService,
    private userService: UserService,
    private allTechAuthService: AllTechAuthService
        ) {
  }

  async ngOnInit() { 
  }

   async loadUserData() {
  }

  resetData() {
  }

  addTask(id: string) {
    let value = this.newTitle;
    let request: ITodoItemCreateRequest = {
      title: value,
      groupId: id
    };
    this.todoItemService.createTodoItem(request).subscribe((response: ITodoItemResponse) => {
      this.todoItems.unshift(response);
    }, (error: any) => {
      alert('Error creating todo item');
    });
    this.newTitle = '';
  }

  onDelete(id: string) {
    this.todoItemService.deleteTodoItem(id).subscribe((response: boolean) => {
      this.todoItems = this.todoItems.filter((item: ITodoItemResponse) => item.id !== id)
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }
}
