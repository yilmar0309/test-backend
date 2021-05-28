import { BodyPersonEntity, PersonEntity } from "../entity/person.entity";

export abstract class PersonContract {
    abstract create(body: BodyPersonEntity): Promise<PersonEntity>;
}