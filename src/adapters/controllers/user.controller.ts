import { UserService } from "../../domain/usecases/user.service";

// import { UserSequelizeRepo } from "../repositories/user.sequelize.repo";
import { UserCacheRepo } from "../repositories/user.cache.repo";
import { PersonCacheRepo } from "../repositories/person.cache.repo";

import { BodyAuthEntity, BodyUserEntityRegister, UserAuthEntity } from "../../domain/entity/user.entity";

import { GenerateResponse } from "./interfaces";

// const userSequelizeRepo = new UserSequelizeRepo();
const userCacheRepo = new UserCacheRepo();
const personCacheRepo = new PersonCacheRepo();
const userService = new UserService(userCacheRepo, personCacheRepo);

export class UserController {

    async auth(body: BodyAuthEntity): Promise<GenerateResponse<UserAuthEntity>> {
        try {
            return {
                nameFunction: 'UserController -> auth',
                entity: await userService.auth(body),
            }
        } catch (error) {
            console.log('*** Error UserController -> auth ***', error);
            throw new Error(error);
        }
    }

    async register(body: BodyUserEntityRegister): Promise<GenerateResponse<void>> {
        try {
            return {
                nameFunction: 'UserController -> auth',
                entity: await userService.register(body),
            }
        } catch (error) {
            console.log('*** Error UserController -> auth ***', error);
            throw new Error(error);
        }
    }
    
}