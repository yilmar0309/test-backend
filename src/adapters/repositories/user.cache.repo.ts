import { BodyUserEntityRegister, UserEntity } from "../../domain/entity/user.entity";
import { UserContract } from "../../domain/contracts/user.contract";

export class UserCacheRepo implements UserContract {

    private userDataCache = {
        usr_id: 1,
        usr_avatar: '12345',
        usr_username: 'prueba@gmail.com',
        usr_password: '12345',
        usr_reset_pass: '',
        usr_state: 1,
        usr_token_firebase: '12345',
        usr_role_id: 1,
        usr_app_version: '1.0.1',
        usr_low_battery: '10',
        usr_imei: 'AWEIUW02',
        usr_device_brand: 'HUAWEI',
        usr_device_company: 'MOVISTAR',
        usr_erased: false,
        usr_origin: 'APP',
        usr_created_at: new Date().toString(),
        usr_updated_at: new Date().toString(),
        person: {
            prs_id: 1,
            prs_name: 'alexis',
            prs_lastname: 'noriega',
            prs_phone: '3194757378',
            prs_address: 'Cra 3 # 4-5',
            prs_age: 28,
        }
    }

    async getUserByKey(key: string, value: string): Promise<UserEntity> {
        return this.userDataCache
    }

    async update(usr_id: number, body: any): Promise<UserEntity> {
        return this.userDataCache
    }

    async create(body: BodyUserEntityRegister): Promise<UserEntity> {
        return this.userDataCache
    }

    async delete(id: number | string): Promise<void> {}

}