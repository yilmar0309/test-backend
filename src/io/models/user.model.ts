import {
  Table,
  Model,
  Column,
  HasOne,
  HasMany,
  Comment,
  Default,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { UserEntity } from '../../domain/entity/user.entity';

import Person from './person.model';

interface userCreateAttributes extends Optional<UserEntity, 'person'> {}

/**
 * @author Alexis Noriega
 */
@Table({ tableName: 'users', comment: 'users(usr)', timestamps: false })
export default class User extends Model<UserEntity, userCreateAttributes> implements UserEntity {

  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  public usr_id: number;

  @Comment('username')
  @Column({ type: DataType.STRING(200), allowNull: false })
  public usr_username: string;

  @Comment('password')
  @Column({ type: DataType.STRING(200), allowNull: true })
  public usr_password: string;

  @Default(1)
  @Comment('Role of user')
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_role_id: number;

  @Comment('state of theuser')
  @Column({ type: DataType.INTEGER, allowNull: false })
  public usr_state: number;

  @Comment('token')
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_token_firebase: string;

  @Comment('token to reset password')
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_reset_pass: string;

  @Comment('avatar')
  @Column({ type: DataType.TEXT, allowNull: true })
  public usr_avatar: string;

  @Comment('version del app')
  @Column({ type: DataType.STRING(8), allowNull: true })
  public usr_app_version: string;

  @Comment('nivel de batería')
  @Column({ type: DataType.STRING(20), allowNull: true })
  public usr_low_battery: string;

  @Comment('imei del dispositivo')
  @Column({ type: DataType.STRING(255), allowNull: true })
  public usr_imei: string;

  @Comment('marca del dispositivo')
  @Column({ type: DataType.STRING(20), allowNull: true })
  public usr_device_brand: string;

  @Comment('proveedor del dispositivo')
  @Column({ type: DataType.STRING(20), allowNull: true })
  public usr_device_company: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public usr_erased: boolean;
  
  @Column({ type: DataType.STRING(3), allowNull: false })
  public usr_origin: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  public usr_created_at: string;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  public usr_updated_at: string;
  
  @HasOne(() => Person)
  public person: Person;

  @HasOne(() => Person)
  public personMany: Person[];

}

