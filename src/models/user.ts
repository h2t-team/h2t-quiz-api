import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupCreationAttributes, GroupId } from './group';
import type { UserInGroup, UserInGroupId } from './userInGroup';

export interface UserAttributes {
  id: string;
  fullname?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  createAt?: Date;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | 'fullname'
  | 'email'
  | 'phone'
  | 'username'
  | 'password'
  | 'createAt';
export type UserCreationAttributes = Optional<
  UserAttributes,
  UserOptionalAttributes
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: string;
  fullname?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  createAt?: Date;

  // User hasOne Group via id
  group!: Group;
  getGroup!: Sequelize.HasOneGetAssociationMixin<Group>;
  setGroup!: Sequelize.HasOneSetAssociationMixin<Group, GroupId>;
  createGroup!: Sequelize.HasOneCreateAssociationMixin<Group>;
  // User hasMany UserInGroup via userId
  userInGroups!: UserInGroup[];
  getUserInGroups!: Sequelize.HasManyGetAssociationsMixin<UserInGroup>;
  setUserInGroups!: Sequelize.HasManySetAssociationsMixin<
    UserInGroup,
    UserInGroupId
  >;
  addUserInGroup!: Sequelize.HasManyAddAssociationMixin<
    UserInGroup,
    UserInGroupId
  >;
  addUserInGroups!: Sequelize.HasManyAddAssociationsMixin<
    UserInGroup,
    UserInGroupId
  >;
  createUserInGroup!: Sequelize.HasManyCreateAssociationMixin<UserInGroup>;
  removeUserInGroup!: Sequelize.HasManyRemoveAssociationMixin<
    UserInGroup,
    UserInGroupId
  >;
  removeUserInGroups!: Sequelize.HasManyRemoveAssociationsMixin<
    UserInGroup,
    UserInGroupId
  >;
  hasUserInGroup!: Sequelize.HasManyHasAssociationMixin<
    UserInGroup,
    UserInGroupId
  >;
  hasUserInGroups!: Sequelize.HasManyHasAssociationsMixin<
    UserInGroup,
    UserInGroupId
  >;
  countUserInGroups!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        fullname: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'create_at',
        },
      },
      {
        sequelize,
        tableName: 'user',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'user_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
