import { Component } from '@angular/core';
import { IToDoItemResponse } from '../../../models/todo-item.model';
import { TodoListServiceService } from '../../../services/todo-list-service.service';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent {

  toDoItemResponses: IToDoItemResponse[] = [];
  newTitle: string = '';

  constructor(private todoListService: TodoListServiceService) {
    this.todoListService.getAllToDoItems().subscribe((response: any) => {
      this.toDoItemResponses = response;
    });
  }

  addTask() {
    let value = this.newTitle;
    this.todoListService.createToDoItem({title: value}).subscribe((response: IToDoItemResponse) => {
      this.toDoItemResponses.unshift(response);
    }, (error: any) => {
      alert('Error creating todo item');
    });
    this.newTitle = '';
  }

  onDelete(id: string) {
    this.todoListService.deleteToDoItem(id).subscribe((response: boolean) => {
      this.toDoItemResponses = this.toDoItemResponses.filter((item: IToDoItemResponse) => item.id !== id)
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }
}
