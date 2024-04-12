import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ITodoItemResponse } from '../../core/models/todo-item.model';
import { TodoItemService } from '../../core/services/todo-item.service';
import { UserService } from '../../core/services/user.service';
import { UserTodoService } from '../../core/services/user-todo.service';
import { TodoGroupService } from '../../core/services/todo-group.service';
import { IUserResponse } from '../../core/models/user.model';
import { IUserTodoResponse } from '../../core/models/user-todo.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AllTechAuthService } from '../../core/services/all-tech-auth.service';
import { ITodoGroupResponse } from '../../core/models/todo-group.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoGroupCreateComponent } from './todo-group/todo-group-create/todo-group-create.component';
import { TodoHubService } from '../../core/services/todo-hub.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  isLoading = false;
  userResponse!: IUserResponse;
  userTodoResponse!: IUserTodoResponse;
  
  todoGroups: ITodoGroupResponse[] = [];
  todoItems: ITodoItemResponse[] = [];
  newTodoGroup!: ITodoGroupResponse;
  selectedGroup!: ITodoGroupResponse;


  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private allTechAuthService: AllTechAuthService,
    private dialog: MatDialog,
    private todoHubService: TodoHubService,
    private snackBarService: SnackbarService
        ) {
    this.newTodoGroup = {
      id: '',
      name: '',
      etag: '',
    };
  }

  async ngOnInit() { 
    this.isLoading = true;
    this.allTechAuthService.socialUserSubject.subscribe(async (socialUser) => {
      this.isLoading = true;
      await this.todoHubService.JoinUserHub();
      await this.initialLoading(socialUser);
      this.isLoading = false;
    });
    await this.initialLoading(this.allTechAuthService.socialUser);

    this.todoHubService.notificationMessage.subscribe((message) => {
      this.snackBarService.openSnackBar(message);
    });

    this.isLoading = false;
  }

  async initialLoading(socialUser: SocialUser | null) {
    this.isLoggedIn = socialUser !== null;
    if (this.isLoggedIn) {
      await this.loadUserData();
    }
  }

  async ngOnDestroy() {
    this.todoHubService.stopConnection();
  }

  changeGroup(selectedGroup: ITodoGroupResponse) {
    this.selectedGroup = selectedGroup;
  }

  async loadUserData() {
    this.userResponse = await this.userService.getUser();
    let dashboardData = await firstValueFrom(this.dashboardService.GetUserDashboardData(this.userResponse.id));
    this.todoItems = dashboardData.todoItems;
    this.todoGroups = dashboardData.todoGroups;
    this.selectedGroup = this.todoGroups[0];
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TodoGroupCreateComponent, {
      data: this.newTodoGroup,
    });

    dialogRef.afterClosed().subscribe((result: ITodoGroupResponse) => {
      this.todoGroups.push(result);
      this.selectedGroup = result;
    });
  }

  async refreshSectionClick() {
    this.isLoading = true;
    await this.loadUserData();
    this.isLoading = false;
  }
}
