export interface IUserTodoRequest
{
    groupIds: string[];
}

export interface IUserTodoCreateRequest
{
    id: string;
}

export interface IUserTodoUpdateRequest
{
    etag: string;
}

export interface IUserTodoResponse
{
    id: string;
    etag: string;
    groupIds: string[];
}

