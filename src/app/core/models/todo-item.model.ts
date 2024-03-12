export interface IToDoItemRequest {
    title: string;
}

export interface IToDoItemCreateRequest extends IToDoItemRequest {
    
}

export interface IToDoItemUpdateRequest extends IToDoItemRequest {
    id: string;
    isComplete: boolean;
}

export interface IToDoItemResponse {
    title: string;
    id: string;
    isComplete: boolean;
}