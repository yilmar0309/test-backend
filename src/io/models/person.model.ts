import {
    Table,
    Model,
    Column,
    Comment,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    ForeignKey,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';

import { PersonEntity } from '../../domain/entity/person.entity';

import User from './user.model';

/**
 * @author Alexis Noriega
 */
@Table({ tableName: 'person', comment: 'person(prs)', timestamps: false })
export default class Person extends Model<PersonEntity> implements PersonEntity {

    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    prs_id: string | number;

    @ForeignKey(() => User)
    @Comment('usr_id')
    @Column({ type: DataType.INTEGER, allowNull: false })
    public prs_usr_id: number;

    @BelongsTo(() => User)
    public user: User;

    @Column({ type: DataType.STRING(100) })
    prs_name: string;

    @Column({ type: DataType.STRING(100) })
    prs_lastname: string;

    @Column({ type: DataType.STRING(20) })
    prs_phone: string;

    @Column({ type: DataType.STRING(255) })
    prs_address: string;

    @Column({ type: DataType.INTEGER })
    prs_age: number;

    @CreatedAt
    @Column({ type: DataType.DATE })
    public prs_created_at: string;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    public prs_updated_at: string;

}