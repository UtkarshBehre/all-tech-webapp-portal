import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodoGroupResponse } from '../../../../core/models/todo-group.model';
import { TodoGroupService } from '../../../../core/services/todo-group.service';
import { TodoGroupUpdateComponent } from '../todo-group-update/todo-group-update.component';

@Component({
  selector: 'app-todo-group-share',
  templateUrl: './todo-group-share.component.html',
  styleUrl: './todo-group-share.component.scss'
})
export class TodoGroupShareComponent {
  sharedWithEmail: string = '';

  constructor(
    public dialogRef: MatDialogRef<TodoGroupUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public todoGroup: ITodoGroupResponse,
    private todoGroupService: TodoGroupService,
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  async onShareClick(): Promise<void> {
    if (!this.sharedWithEmail || this.sharedWithEmail.trim() === '') {
      return;
    }

    await this.todoGroupService.shareTodoGroup(this.todoGroup.id, this.sharedWithEmail);
  }
}
