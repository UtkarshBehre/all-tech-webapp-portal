export interface ITodoGroupRequest
{
    name: string;
}

export interface ITodoGroupCreateRequest extends ITodoGroupRequest
{
}

export interface ITodoGroupUpdateRequest
{
    etag: string;
}

export interface ITodoGroupResponse
{
    id: string;
    name: string;
    etag: string;
}

