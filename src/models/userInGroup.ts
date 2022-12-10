import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupId } from './group';
import type { User, UserId } from './user';

export interface UserInGroupAttributes {
  Id: number;
  UserId?: string;
  GroupId?: string;
  Role?: 'co-owner' | 'member' | 'owner' | 'kick out';
}

export type UserInGroupPk = 'Id';
export type UserInGroupId = UserInGroup[UserInGroupPk];
export type UserInGroupOptionalAttributes =
  | 'Id'
  | 'UserId'
  | 'GroupId'
  | 'Role';
export type UserInGroupCreationAttributes = Optional<
  UserInGroupAttributes,
  UserInGroupOptionalAttributes
>;

export class UserInGroup
  extends Model<UserInGroupAttributes, UserInGroupCreationAttributes>
  implements UserInGroupAttributes
{
  Id!: number;
  UserId?: string;
  GroupId?: string;
  Role?: 'co-owner' | 'member' | 'owner' | 'kick out';

  // UserInGroup belongsTo Group via GroupId
  Group!: Group;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<Group>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<Group, GroupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<Group>;
  // UserInGroup belongsTo User via UserId
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserInGroup {
    return UserInGroup.init(
      {
        Id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        UserId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          field: 'user_id',
        },
        GroupId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'group',
            key: 'id',
          },
          field: 'group_id',
        },
        Role: {
          type: DataTypes.ENUM('co-owner', 'member', 'owner', 'kick out'),
          allowNull: true,
          field: 'role',
        },
      },
      {
        sequelize,
        tableName: 'user_in_group',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'user_in_group_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
