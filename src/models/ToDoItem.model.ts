export interface ToDoItemResponse {
    title: string;
    id: string;
    isComplete: boolean;
}

export interface ToDoItemRequest {
    title: string;
}

export interface ToDoItemCreateRequest extends ToDoItemRequest {
    
}

export interface ToDoItemUpdateRequest extends ToDoItemRequest {
    id: string;
    isComplete: boolean;
}