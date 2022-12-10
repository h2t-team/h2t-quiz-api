import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user, userId } from './user';
import type { userInGroup, userInGroupId } from './userInGroup';

export interface groupAttributes {
  id: string;
  name?: string;
  owner?: string;
}

export type groupPk = 'id';
export type groupId = group[groupPk];
export type groupOptionalAttributes = 'name' | 'owner';
export type groupCreationAttributes = Optional<
  groupAttributes,
  groupOptionalAttributes
>;

export class group
  extends Model<groupAttributes, groupCreationAttributes>
  implements groupAttributes
{
  id!: string;
  name?: string;
  owner?: string;

  // group hasMany userInGroup via groupId
  userInGroups!: userInGroup[];
  getUserInGroups!: Sequelize.HasManyGetAssociationsMixin<userInGroup>;
  setUserInGroups!: Sequelize.HasManySetAssociationsMixin<
    userInGroup,
    userInGroupId
  >;
  addUserInGroup!: Sequelize.HasManyAddAssociationMixin<
    userInGroup,
    userInGroupId
  >;
  addUserInGroups!: Sequelize.HasManyAddAssociationsMixin<
    userInGroup,
    userInGroupId
  >;
  createUserInGroup!: Sequelize.HasManyCreateAssociationMixin<userInGroup>;
  removeUserInGroup!: Sequelize.HasManyRemoveAssociationMixin<
    userInGroup,
    userInGroupId
  >;
  removeUserInGroups!: Sequelize.HasManyRemoveAssociationsMixin<
    userInGroup,
    userInGroupId
  >;
  hasUserInGroup!: Sequelize.HasManyHasAssociationMixin<
    userInGroup,
    userInGroupId
  >;
  hasUserInGroups!: Sequelize.HasManyHasAssociationsMixin<
    userInGroup,
    userInGroupId
  >;
  countUserInGroups!: Sequelize.HasManyCountAssociationsMixin;
  // group belongsTo user via owner
  ownerUser!: user;
  getOwnerUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setOwnerUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createOwnerUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof group {
    return group.init(
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        owner: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
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
