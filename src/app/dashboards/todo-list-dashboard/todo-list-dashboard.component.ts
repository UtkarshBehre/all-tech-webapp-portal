import { Component } from '@angular/core';
import { TodoListServiceService } from '../../core/services/todo-list-service.service';
import { IToDoItemResponse } from '../../core/models/todo-item.model';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent {

  toDoItemResponses: IToDoItemResponse[] = [];
  toDoCompletedItemResponses: IToDoItemResponse[] = [];
  toDoInCompletedItemResponses: IToDoItemResponse[] = [];
  newTitle: string = '';

  constructor(private todoListService: TodoListServiceService) {
    this.todoListService.getAllToDoItems().subscribe((response: any) => {
      this.toDoItemResponses = response;
      this.filterUpdatedItems();
    });
  }

  filterUpdatedItems() {
    this.toDoCompletedItemResponses = this.toDoItemResponses.filter((item: IToDoItemResponse) => item.isComplete);
    this.toDoInCompletedItemResponses = this.toDoItemResponses.filter((item: IToDoItemResponse) => !item.isComplete);
  }

  addTask() {
    let value = this.newTitle;
    this.todoListService.createToDoItem({title: value}).subscribe((response: IToDoItemResponse) => {
      this.toDoItemResponses.unshift(response);
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error creating todo item');
    });
    this.newTitle = '';
  }

  onComplete(toDoItemResponse: IToDoItemResponse) {
    this.todoListService.updateToDoItem(toDoItemResponse).subscribe((response: IToDoItemResponse) => {
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error updating todo item');
    });
  }

  onDelete(id: string) {
    this.todoListService.deleteToDoItem(id).subscribe((response: boolean) => {
      this.toDoItemResponses = this.toDoItemResponses.filter((item: IToDoItemResponse) => item.id !== id)
      this.filterUpdatedItems();
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }
}
