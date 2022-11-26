import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupId } from './group';
import type { User, UserId } from './user';

export interface UserInGroupAttributes {
  id: number;
  userId?: string;
  groupId?: string;
  role?: "co-owner" | "member" | "owner" | "kick out";
}

export type UserInGroupPk = "id";
export type UserInGroupId = UserInGroup[UserInGroupPk];
export type UserInGroupOptionalAttributes = "id" | "userId" | "groupId" | "role";
export type UserInGroupCreationAttributes = Optional<UserInGroupAttributes, UserInGroupOptionalAttributes>;

export class UserInGroup extends Model<UserInGroupAttributes, UserInGroupCreationAttributes> implements UserInGroupAttributes {
  id!: number;
  userId?: string;
  groupId?: string;
  role?: "co-owner" | "member" | "owner" | "kick out";

  // UserInGroup belongsTo Group via groupId
  group!: Group;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<Group>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<Group, GroupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<Group>;
  // UserInGroup belongsTo User via userId
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserInGroup {
    return UserInGroup.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'user_id'
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'group',
        key: 'id'
      },
      field: 'group_id'
    },
    role: {
      type: DataTypes.ENUM("co-owner","member","owner","kick out"),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_in_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_in_group_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
