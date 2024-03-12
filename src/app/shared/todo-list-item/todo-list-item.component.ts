import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IToDoItemResponse } from '../../core/models/todo-item.model';
import { TodoListServiceService } from '../../core/services/todo-list-service.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss'
})
export class TodoListItemComponent {
  @Input() toDoItemResponse!: IToDoItemResponse;

  @Output() onItemDelete = new EventEmitter<string>();
  @Output() onItemComplete = new EventEmitter<IToDoItemResponse>();

  checkboxColor: ThemePalette = 'primary';

  toDoItemResponseOriginal!: IToDoItemResponse;

  constructor(private todoListService: TodoListServiceService) {
  }

  ngOnInit() {
    this.toDoItemResponseOriginal = { ...this.toDoItemResponse };
  }

  onInput(event: any) {
    this.todoListService.updateToDoItem(this.toDoItemResponse).subscribe((response: any) => {
      
    }, (error: any) => {
      alert('Error updating todo item');
    });
    this.toDoItemResponseOriginal = { ...this.toDoItemResponse };
    event.target.blur();
  }

  onBlur(){
    this.toDoItemResponse = { ...this.toDoItemResponseOriginal };
  }

  onComplete() {
    this.toDoItemResponse.isComplete = !this.toDoItemResponse.isComplete;
    this.onItemComplete.emit(this.toDoItemResponse);
  }

  onDelete() {
    this.onItemDelete.emit(this.toDoItemResponse.id);
  }
}
