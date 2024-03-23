import { ITodoGroupResponse } from './todo-group.model';
import { ITodoItemResponse } from './todo-item.model';

export interface IAllItemsResponse{
    todoItems: ITodoItemResponse[],
    todoGroups: ITodoGroupResponse[]
}