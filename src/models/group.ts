import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';
import type { UserInGroup, UserInGroupId } from './userInGroup';

export interface GroupAttributes {
  id: string;
  name?: string;
  owner?: string;
}

export type GroupPk = "id";
export type GroupId = Group[GroupPk];
export type GroupOptionalAttributes = "name" | "owner";
export type GroupCreationAttributes = Optional<GroupAttributes, GroupOptionalAttributes>;

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  id!: string;
  name?: string;
  owner?: string;

  // Group hasMany UserInGroup via groupId
  userInGroups!: UserInGroup[];
  getUserInGroups!: Sequelize.HasManyGetAssociationsMixin<UserInGroup>;
  setUserInGroups!: Sequelize.HasManySetAssociationsMixin<UserInGroup, UserInGroupId>;
  addUserInGroup!: Sequelize.HasManyAddAssociationMixin<UserInGroup, UserInGroupId>;
  addUserInGroups!: Sequelize.HasManyAddAssociationsMixin<UserInGroup, UserInGroupId>;
  createUserInGroup!: Sequelize.HasManyCreateAssociationMixin<UserInGroup>;
  removeUserInGroup!: Sequelize.HasManyRemoveAssociationMixin<UserInGroup, UserInGroupId>;
  removeUserInGroups!: Sequelize.HasManyRemoveAssociationsMixin<UserInGroup, UserInGroupId>;
  hasUserInGroup!: Sequelize.HasManyHasAssociationMixin<UserInGroup, UserInGroupId>;
  hasUserInGroups!: Sequelize.HasManyHasAssociationsMixin<UserInGroup, UserInGroupId>;
  countUserInGroups!: Sequelize.HasManyCountAssociationsMixin;
  // Group belongsTo User via id
  idUser!: User;
  getIdUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setIdUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createIdUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Group {
    return Group.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "group_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
