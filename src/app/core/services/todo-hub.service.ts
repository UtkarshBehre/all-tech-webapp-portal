import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { ITodoGroupResponse } from '../models/todo-group.model';

@Injectable({
  providedIn: 'root'
})
export class TodoHubService {

  notificationMessage = new Subject<string>();

  conn!: HubConnection;

  todoHubUrl: string;

  constructor(private userService: UserService) { 
    this.todoHubUrl = environment.endpoint_todo_hub_url;
    this.conn = new HubConnectionBuilder()
      .withUrl(this.todoHubUrl, { skipNegotiation: true, transport: 1 })
      .configureLogging(LogLevel.Information)
      .build();

    this.conn.on('ReceiveTodoGroupUpdates', (message) => {
      this.notificationMessage.next(message);
    });

    this.conn.on('ReceiveTodoGroupShares', (message) => {
      this.notificationMessage.next(message);
    });
  }

  public async startConnection(): Promise<void> {
    if (this.conn.state === 'Connected') {
      return;
    }
    await this.conn.start();
  }  

  public async stopConnection(): Promise<void> {
    if (this.conn.state === 'Disconnected') {
      return;
    }
    await this.conn.stop();
  }

  public async joinGroup(groupId: string): Promise<void> {
    await this.startConnection()
    await this.conn.invoke('JoinTodoGroupHub', groupId);
  }

  public async JoinUserHub(){
    await this.startConnection()
    let user = await this.userService.getUser();
    await this.conn.invoke('JoinUserHub', user.id);
  }

  public async SendTodoGroupUpdatedMessage(group: ITodoGroupResponse){
    await this.startConnection()
    let user = await this.userService.getUser();
    await this.conn.invoke('SendTodoGroupUpdatedMessage', group.id, group.name, `${user.firstName} ${user.lastName}`);
  }

  public async SendTodoGroupSharedMessage(groupName: string, email: string){
    await this.startConnection()
    let currentUser = await this.userService.getUser();
    let userToShare = await this.userService.getUserByEmail(email);
    await this.conn.invoke('SendTodoGroupSharedMessage', `${currentUser.firstName} ${currentUser.lastName}`, groupName, userToShare.id);
  }
}
