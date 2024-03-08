import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IToDoItemResponse } from '../../../../models/todo-item.model';
import { TodoListServiceService } from '../../../../services/todo-list-service.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
  @Input() toDoItemResponse!: IToDoItemResponse;

  @Output() onItemDelete = new EventEmitter<string>();

  toDoItemResponseOriginal!: IToDoItemResponse;

  constructor(private todoListService: TodoListServiceService) {
  }

  ngOnInit() {
    this.toDoItemResponseOriginal = { ...this.toDoItemResponse };
  }

  onInput() {
    this.todoListService.updateToDoItem(this.toDoItemResponse).subscribe((response: any) => {
      
    }, (error: any) => {
      alert('Error updating todo item');
    });
    this.toDoItemResponseOriginal = { ...this.toDoItemResponse };
  }

  onBlur(){
    this.toDoItemResponse = { ...this.toDoItemResponseOriginal };
  }

  onComplete() {
    this.toDoItemResponse.isComplete = true;
    this.todoListService.updateToDoItem(this.toDoItemResponse).subscribe((response: IToDoItemResponse) => {
      
    }, (error: any) => {
      alert('Error updating todo item');
    });
  }

  onDelete() {
    this.onItemDelete.emit(this.toDoItemResponse.id);
  }
}
