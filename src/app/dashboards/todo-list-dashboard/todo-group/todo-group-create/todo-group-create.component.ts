import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTodoService } from '../../../../core/services/user-todo.service';
import { TodoGroupService } from '../../../../core/services/todo-group.service';
import { IUserTodoCreateRequest } from '../../../../core/models/user-todo.model';
import { UserService } from '../../../../core/services/user.service';
import { ITodoGroupCreateRequest } from '../../../../core/models/todo-group.model';

@Component({
  selector: 'app-todo-group-create',
  templateUrl: './todo-group-create.component.html',
  styleUrl: './todo-group-create.component.scss'
})
export class TodoGroupCreateComponent {


  constructor(
    public dialogRef: MatDialogRef<TodoGroupCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public todoGroup: ITodoGroupCreateRequest,
    private todoGroupService: TodoGroupService,
    private userTodoService: UserTodoService,
    private userService: UserService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (!this.todoGroup.name || this.todoGroup.name.trim() === '') {
      return;
    }

    this.todoGroupService.createTodoGroup(this.todoGroup).subscribe((todoGroup) => {
      this.todoGroup = todoGroup;
      this.userService.getUser().subscribe((user) => {
        this.userTodoService.getUserTodoById(user.id).subscribe((userTodo) => {
          userTodo.groupIds.push(todoGroup.id);
          this.userTodoService.updateUserTodo(userTodo.id, userTodo).subscribe(() => {
            this.dialogRef.close(todoGroup);
          }, (error: any) => {
            alert('Error updating user todo:'+ error);
          });
        }, (error: any) => {
          alert('Error getting user todo:'+ error);
        });
      }, (error: any) => {
        alert('Error getting user:'+ error);
      });
    }, (error: any) => {
      alert('Error creating group:'+ error);
    });
  }
}
