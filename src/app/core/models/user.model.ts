export interface IUserRequest
{
    googleId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface IUserCreateRequest
{
}

export interface IUserUpdateRequest
{
    etag: string;
}

export interface IUserResponse
{
    googleId: string;
    firstName: string;
    lastName: string;
    email: string;
    etag: string;
    id: string;
}
