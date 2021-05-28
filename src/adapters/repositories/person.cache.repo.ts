import { BodyPersonEntity, PersonEntity } from "../../domain/entity/person.entity";

import { PersonContract } from "../../domain/contracts/person.contract";

export class PersonCacheRepo implements PersonContract {

    private personData = {
        prs_id: 1,
        prs_name: 'alexis',
        prs_lastname: 'noriega',
        prs_phone: '3194757378',
        prs_address: 'Cra 3 # 4-5',
        prs_age: 28,
    }

    async create(body: BodyPersonEntity): Promise<PersonEntity> {
        return this.personData;
    }

}