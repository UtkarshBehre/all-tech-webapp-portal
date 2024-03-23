export interface ITodoItemRequest
{
    title: string;
    groupId: string;
}

export interface ITodoItemCreateRequest
{
}

export interface ITodoItemUpdateRequest
{
    etag: string;
    isComplete: boolean;
}

export interface ITodoItemResponse
{
    title: string;
    etag: string;
    id: string;
    groupId: string;
    isComplete: boolean;
}