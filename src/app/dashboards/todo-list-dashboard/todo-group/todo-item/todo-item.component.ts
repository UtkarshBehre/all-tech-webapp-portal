import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ITodoItemResponse } from '../../../../core/models/todo-item.model';
import { TodoItemService } from '../../../../core/services/todo-item.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todoItemResponse!: ITodoItemResponse;

  @Output() onItemDelete = new EventEmitter<string>();
  @Output() onItemComplete = new EventEmitter<ITodoItemResponse>();

  checkboxColor: ThemePalette = 'primary';
  todoItemResponseOriginal!: ITodoItemResponse;

  isEditable = false;

  constructor(private todoItemService: TodoItemService) {
  }

  ngOnInit() {
    this.todoItemResponseOriginal = { ...this.todoItemResponse };
  }

  onInput(event: any) {
    this.todoItemService.updateTodoItem(this.todoItemResponse.id, this.todoItemResponse).then((response: any) => {
      this.isEditable = false;
    }, (error: any) => {
      alert('Error updating todo item');
    });
    this.todoItemResponseOriginal = { ...this.todoItemResponse };
    event.target.blur();
  }

  onBlur(){
    this.todoItemResponse = { ...this.todoItemResponseOriginal };
    this.isEditable = false;
  }

  onComplete() {
    this.todoItemResponse.isComplete = !this.todoItemResponse.isComplete;
    this.todoItemService.updateTodoItem(this.todoItemResponse.id, this.todoItemResponse).then((response: ITodoItemResponse) => {
      this.todoItemResponse = response;
    }, (error: any) => {
      this.todoItemResponse.isComplete = !this.todoItemResponse.isComplete;
      alert('Error updating todo item');
    });
    //this.onItemComplete.emit(this.todoItemResponse);
  }

  onEditClick() {
    this.isEditable = true;
  }

  onDeleteClick() {
    this.onItemDelete.emit(this.todoItemResponse.id);
  }
}
