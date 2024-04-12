import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ITodoGroupResponse } from '../../../core/models/todo-group.model';
import { ITodoItemResponse, ITodoItemCreateRequest } from '../../../core/models/todo-item.model';
import { IUserTodoResponse } from '../../../core/models/user-todo.model';
import { IUserResponse } from '../../../core/models/user.model';
import { TodoItemService } from '../../../core/services/todo-item.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoGroupUpdateComponent } from './todo-group-update/todo-group-update.component';
import { TodoHubService } from '../../../core/services/todo-hub.service';
import { TodoGroupShareComponent } from './todo-group-share/todo-group-share.component';
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
  @Output() refreshSection = new EventEmitter<boolean>();
  
  newTitle: string = '';
  groupUpdateNotification: string = '';

  constructor(
    private todoItemService: TodoItemService,
    private dialog: MatDialog,
    private todoHubService: TodoHubService,
        ) {
  }

  async ngOnInit() { 
    await this.todoHubService.joinGroup(this.selectedTodoGroup.id);
  }

  resetData() {
  }

  openUpdateDialog(todoGroup: ITodoGroupResponse) {
    const dialogRef = this.dialog.open(TodoGroupUpdateComponent, {
      data: todoGroup,
    });

    dialogRef.afterClosed().subscribe((result: ITodoGroupResponse) => {
      this.todoGroups = this.todoGroups.map((group) => {
        if (group.id === result.id) {
          return result;
        }
        return group;
      });
      this.selectedTodoGroup = result;
    });
  }

  openShareDialog(todoGroup: ITodoGroupResponse) {
    const dialogRef = this.dialog.open(TodoGroupShareComponent, {
      data: todoGroup,
    });

    dialogRef.afterClosed().subscribe();
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
    this.todoItemService.deleteTodoItem(id, this.selectedTodoGroup.id).then((response: boolean) => {
      this.todoItems = this.todoItems.filter((item: ITodoItemResponse) => item.id !== id)
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }

  refreshTodoSectionClick() {
    this.refreshSection.emit(true);
  }
}
