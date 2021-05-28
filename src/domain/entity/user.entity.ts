import { PersonEntity } from "./person.entity";

export interface BodyAuthEntity {
    usr_username: string;
    usr_password: string;
    usr_role_id: number;
    usr_token_firebase: string;
    usr_app_version: string;
    usr_low_battery: string;
    usr_imei: string;
    usr_device_marca: string;
    usr_device_proveedor: string;
}

export interface BodyUserEntityRegister {
    usr_username: string;
    usr_password: string;
    usr_role_id: number;
    person?: PersonEntity
}

export interface UserEntity {
    usr_id: number | string;
    usr_avatar: string;
    usr_username: string;
    usr_password: string;
    usr_reset_pass: string;
    usr_state: number;
    usr_token_firebase: string;
    usr_role_id: number;
    usr_app_version: string;
    usr_low_battery: string;
    usr_imei: string;
    usr_device_brand: string;
    usr_device_company: string;
    usr_erased: boolean;
    usr_origin: string;
    usr_created_at: string;
    usr_updated_at: string;
    person?: PersonEntity
}

export interface UserAuthEntity {
    user: UserEntity;
    jwt_access_token: string;
}