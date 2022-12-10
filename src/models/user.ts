import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { group, groupId } from './group';
import type { presentation, presentationId } from './presentation';
import type { userInGroup, userInGroupId } from './userInGroup';

export interface userAttributes {
  id: string;
  fullname?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  createAt?: Date;
}

export type userPk = 'id';
export type userId = user[userPk];
export type userOptionalAttributes =
  | 'fullname'
  | 'email'
  | 'phone'
  | 'username'
  | 'password'
  | 'createAt';
export type userCreationAttributes = Optional<
  userAttributes,
  userOptionalAttributes
>;

export class user
  extends Model<userAttributes, userCreationAttributes>
  implements userAttributes
{
  id!: string;
  fullname?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  createAt?: Date;

  // user hasMany group via owner
  groups!: group[];
  getGroups!: Sequelize.HasManyGetAssociationsMixin<group>;
  setGroups!: Sequelize.HasManySetAssociationsMixin<group, groupId>;
  addGroup!: Sequelize.HasManyAddAssociationMixin<group, groupId>;
  addGroups!: Sequelize.HasManyAddAssociationsMixin<group, groupId>;
  createGroup!: Sequelize.HasManyCreateAssociationMixin<group>;
  removeGroup!: Sequelize.HasManyRemoveAssociationMixin<group, groupId>;
  removeGroups!: Sequelize.HasManyRemoveAssociationsMixin<group, groupId>;
  hasGroup!: Sequelize.HasManyHasAssociationMixin<group, groupId>;
  hasGroups!: Sequelize.HasManyHasAssociationsMixin<group, groupId>;
  countGroups!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany presentation via userId
  presentations!: presentation[];
  getPresentations!: Sequelize.HasManyGetAssociationsMixin<presentation>;
  setPresentations!: Sequelize.HasManySetAssociationsMixin<
    presentation,
    presentationId
  >;
  addPresentation!: Sequelize.HasManyAddAssociationMixin<
    presentation,
    presentationId
  >;
  addPresentations!: Sequelize.HasManyAddAssociationsMixin<
    presentation,
    presentationId
  >;
  createPresentation!: Sequelize.HasManyCreateAssociationMixin<presentation>;
  removePresentation!: Sequelize.HasManyRemoveAssociationMixin<
    presentation,
    presentationId
  >;
  removePresentations!: Sequelize.HasManyRemoveAssociationsMixin<
    presentation,
    presentationId
  >;
  hasPresentation!: Sequelize.HasManyHasAssociationMixin<
    presentation,
    presentationId
  >;
  hasPresentations!: Sequelize.HasManyHasAssociationsMixin<
    presentation,
    presentationId
  >;
  countPresentations!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany userInGroup via userId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init(
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
