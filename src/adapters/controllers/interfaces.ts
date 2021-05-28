export interface GenerateResponse<T> {
    nameFunction: string;
    entity: T | string,
}

export interface RequestData {
    headers: any;
    body: any;
    params: any;
    queryParams: any;
}

export interface RequestUserInfo {
    usr_id: number;
    usr_role_id: number;
    usr_username: string;
}