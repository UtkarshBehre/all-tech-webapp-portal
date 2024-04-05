import { Component } from '@angular/core';
import { ChatDetails, ChatMessage } from '../../core/models/chat/chat-details.model';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.scss'
})
export class ChatDashboardComponent {

  chatDetails: ChatDetails = { userName: '', chatRoom: '1'};
  joinedChatRoom: boolean = false;
  conn!: HubConnection;
  currentMessage: string = '';

  chatMessages: ChatMessage[] = [];  
  chatHubUrl: string;

  constructor() {
    this.chatHubUrl = environment.chat_config.chat_hub_url;
    this.conn = new HubConnectionBuilder()
    .withUrl(this.chatHubUrl, { skipNegotiation: true, transport: 1 })
    .configureLogging(LogLevel.Information)
    .build();

    this.conn.on('ReceiveSpecificMessage', (username, message) => {
      this.chatMessages.push({ userName: username, message: message });
    });
   }

  ngOnInit() {
  }

  async joinChatRoomClick() {
    await this.conn.start();
    
    await this.conn.invoke('JoinSpecificChatRoom', this.chatDetails);
    this.joinedChatRoom = true;
  }

  async sendMessageClick() {
    if (this.currentMessage) {
      await this.conn.invoke('SendMessage', this.currentMessage);
      this.currentMessage = '';
    }
  }
}
