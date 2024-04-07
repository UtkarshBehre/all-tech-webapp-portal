import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITodoGroupResponse } from '../../../../core/models/todo-group.model';
import { TodoGroupService } from '../../../../core/services/todo-group.service';

@Component({
  selector: 'app-todo-group-update',
  templateUrl: './todo-group-update.component.html',
  styleUrl: './todo-group-update.component.scss'
})
export class TodoGroupUpdateComponent {

  originalTodoGroup!: ITodoGroupResponse;

  constructor(
    public dialogRef: MatDialogRef<TodoGroupUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public todoGroup: ITodoGroupResponse,
    private todoGroupService: TodoGroupService
  ) {
    this.originalTodoGroup = { ...todoGroup };
  }

  onCancelClick(): void {
    this.todoGroup.name = this.originalTodoGroup.name;
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (!this.todoGroup.name || this.todoGroup.name.trim() === '' || this.todoGroup.name === this.originalTodoGroup.name) {
      return;
    }

    this.todoGroupService.updateTodoGroup(this.todoGroup.id, this.todoGroup).subscribe((todoGroup) => {
      this.todoGroup = todoGroup;
      this.dialogRef.close(todoGroup);
    }, (error: any) => {
      alert('Error getting user:'+ error);
    });
  }
}
