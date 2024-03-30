import { Component, Input } from '@angular/core';
import { ITodoGroupResponse } from '../../../core/models/todo-group.model';
import { ITodoItemResponse, ITodoItemCreateRequest } from '../../../core/models/todo-item.model';
import { IUserTodoResponse } from '../../../core/models/user-todo.model';
import { IUserResponse } from '../../../core/models/user.model';
import { TodoItemService } from '../../../core/services/todo-item.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoGroupUpdateComponent } from './todo-group-update/todo-group-update.component';

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
    private todoItemService: TodoItemService,
    private dialog: MatDialog
        ) {
  }

  async ngOnInit() { 
  }

   async loadUserData() {
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
