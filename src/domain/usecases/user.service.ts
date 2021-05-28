import to from "await-to-js";
import * as jwt from 'jsonwebtoken';

import { compareHash } from "../../io/Hash";

import { PersonContract } from "../contracts/person.contract";
import { UserContract } from "../contracts/user.contract";

import { BodyAuthEntity, BodyUserEntityRegister, UserAuthEntity } from "../entity/user.entity";

export class UserService {

    constructor(private userRepo: UserContract, private personRepo: PersonContract) { }

    /**
     * @author Alexis Noriega
     * @description Method to authenticate users
     * @param body {}
     * @returns UserAuthEntity {} | string ''
     */
    async auth(body: BodyAuthEntity): Promise<UserAuthEntity | string> {
        const {
            usr_username,
            usr_password,
            usr_token_firebase,
            usr_app_version,
            usr_low_battery,
            usr_imei,
            usr_device_marca,
            usr_device_proveedor
        } = body;
        try {
            const [error, user]: any = await to(this.userRepo.getUserByKey('usr_username', usr_username));
            if (error) {
                return 'userNotExist';
            }
            const codeMatch = await compareHash(usr_password, user && user.usr_password || '');
            if (codeMatch) {
                const bUpdate = {
                    usr_token_firebase,
                    usr_app_version,
                    usr_low_battery,
                    usr_imei,
                    usr_device_marca,
                    usr_device_proveedor,
                }
                await this.userRepo.update(user.usr_id, bUpdate);
                const jwt_access_token = jwt.sign({
                    usr_id: user.usr_id,
                    usr_username: user.usr_username,
                    usr_role_id: user.usr_role_id,
                }, process.env.SECRET, { expiresIn: '30d' });

                return {
                    user: { ...user, usr_contrasena: null, usr_cod_sms: null },
                    jwt_access_token
                }
            }
            throw new Error('Error in password');
        } catch (error) {
            console.log('*** Error UserService -> auth ***', error);
            throw new Error(error);
        }
    }

    /**
     * @author Alexis Noriega
     * @description Method to register users
     * @param body {}
     */
    async register(body: BodyUserEntityRegister): Promise<void | string> {
        const { person, ...user } = body;
        try {
            const userExist = await this.userRepo.getUserByKey('usr_username', user.usr_username);
            if (userExist) {
                return 'userExist';
            }
            const userData = await this.userRepo.create(user);
            const [errorPerson]: any = await this.personRepo.create(person);
            if (errorPerson) {
                await this.userRepo.delete(userData.usr_id);
                throw new Error(errorPerson);
            }
        } catch (error) {
            console.log('*** Error UserService -> auth ***', error);
            throw new Error(error);
        }
    }
}