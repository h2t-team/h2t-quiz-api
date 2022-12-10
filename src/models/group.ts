import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';
import type { UserInGroup, UserInGroupId } from './userInGroup';

export interface GroupAttributes {
  Id: string;
  Name?: string;
  Owner?: string;
}

export type GroupPk = 'Id';
export type GroupId = Group[GroupPk];
export type GroupOptionalAttributes = 'Name' | 'Owner';
export type GroupCreationAttributes = Optional<
  GroupAttributes,
  GroupOptionalAttributes
>;

export class Group
  extends Model<GroupAttributes, GroupCreationAttributes>
  implements GroupAttributes
{
  Id!: string;
  Name?: string;
  Owner?: string;

  // Group hasMany UserInGroup via GroupId
  UserInGroups!: UserInGroup[];
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
  // Group belongsTo User via Owner
  OwnerUser!: User;
  getOwnerUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setOwnerUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createOwnerUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Group {
    return Group.init(
      {
        Id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'name',
        },
        Owner: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          field: 'owner',
        },
      },
      {
        sequelize,
        tableName: 'group',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'group_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
