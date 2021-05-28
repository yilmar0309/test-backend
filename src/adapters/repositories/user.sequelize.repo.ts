import { BodyUserEntityRegister, UserEntity } from "../../domain/entity/user.entity";

import { UserContract } from "../../domain/contracts/user.contract";

export class UserSequelizeRepo implements UserContract {
    getUserByKey(key: string, value: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    update(usr_id: number, body: any): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    create(body: BodyUserEntityRegister): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<void> {
        throw new Error("Method not implemented.");
    }

  

}