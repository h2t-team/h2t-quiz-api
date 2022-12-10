import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { group, groupId } from './group';
import type { user, userId } from './user';

export interface userInGroupAttributes {
  id: number;
  userId?: string;
  groupId?: string;
  role?: 'co-owner' | 'member' | 'owner' | 'kick out';
}

export type userInGroupPk = 'id';
export type userInGroupId = userInGroup[userInGroupPk];
export type userInGroupOptionalAttributes =
  | 'id'
  | 'userId'
  | 'groupId'
  | 'role';
export type userInGroupCreationAttributes = Optional<
  userInGroupAttributes,
  userInGroupOptionalAttributes
>;

export class userInGroup
  extends Model<userInGroupAttributes, userInGroupCreationAttributes>
  implements userInGroupAttributes
{
  id!: number;
  userId?: string;
  groupId?: string;
  role?: 'co-owner' | 'member' | 'owner' | 'kick out';

  // userInGroup belongsTo group via groupId
  group!: group;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<group>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<group, groupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<group>;
  // userInGroup belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof userInGroup {
    return userInGroup.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          field: 'user_id',
        },
        groupId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'group',
            key: 'id',
          },
          field: 'group_id',
        },
        role: {
          type: DataTypes.ENUM('co-owner', 'member', 'owner', 'kick out'),
          allowNull: true,
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
