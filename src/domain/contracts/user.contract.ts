import { BodyUserEntityRegister, UserEntity } from "../entity/user.entity";

export abstract class UserContract {
    abstract getUserByKey(key: string, value: string): Promise<UserEntity>;
    abstract update(usr_id: number, body: any): Promise<UserEntity>;
    abstract create(body: BodyUserEntityRegister): Promise<UserEntity>;
    abstract delete(id: number | string): Promise<void>;
}