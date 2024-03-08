import { Component } from '@angular/core';
import { IToDoItemResponse } from '../../models/todo-item.model';
import { TodoListServiceService } from '../../services/todo-list-service.service';

@Component({
  selector: 'app-todo-list-dashboard',
  templateUrl: './todo-list-dashboard.component.html',
  styleUrl: './todo-list-dashboard.component.scss'
})
export class TodoListDashboardComponent {

  toDoItemResponse: IToDoItemResponse;
  toDoItemResponses: IToDoItemResponse[] = [];
  newTitle: string = '';

  constructor(private todoListService: TodoListServiceService) {
    this.toDoItemResponse = {
      title: 'Test',
      id: '1',
      isComplete: false
    };
    this.toDoItemResponses.push(this.toDoItemResponse);

    this.todoListService.getAllToDoItems().subscribe((response: any) => {
      this.toDoItemResponses = response;
    });
  }

  addTask() {
    let value = this.newTitle;
    this.todoListService.createToDoItem({title: value});
    this.toDoItemResponses.push({title: this.newTitle, id: '2', isComplete: false})
    this.newTitle = '';
  }

  onDelete(id: string) {
    this.todoListService.deleteToDoItem(this.toDoItemResponse.id).subscribe((response: boolean) => {
      this.toDoItemResponses = this.toDoItemResponses.filter((item: IToDoItemResponse) => item.id !== id)
    }, (error: any) => {
      alert('Error deleting todo item');
    });
  }
}
