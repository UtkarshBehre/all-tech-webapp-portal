export interface ITodoGroupRequest
{
    name: string;
}

export interface ITodoGroupCreateRequest
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

