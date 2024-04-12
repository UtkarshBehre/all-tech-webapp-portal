import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITodoGroupResponse } from '../../../../core/models/todo-group.model';
import { TodoGroupService } from '../../../../core/services/todo-group.service';
import { TodoGroupUpdateComponent } from '../todo-group-update/todo-group-update.component';
import { TodoHubService } from '../../../../core/services/todo-hub.service';

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
    private todoHubService: TodoHubService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  async onShareClick(): Promise<void> {
    if (!this.sharedWithEmail || this.sharedWithEmail.trim() === '') {
      return;
    }

    let s = await this.todoGroupService.shareTodoGroup(this.todoGroup.id, this.sharedWithEmail);
    console.log(`s: ${s}`);
    await this.todoHubService.SendTodoGroupSharedMessage(this.todoGroup.name, this.sharedWithEmail);
    this.dialogRef.close();
  }
}
