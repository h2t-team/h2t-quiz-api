import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Presentation, PresentationId } from './presentation';
import type { User, UserId } from './user';
import type { UserInGroup, UserInGroupId } from './userInGroup';

export interface GroupAttributes {
  id: string;
  name?: string;
  owner?: string;
  isDelete?: boolean;
}

export type GroupPk = 'id';
export type GroupId = Group[GroupPk];
export type GroupOptionalAttributes = 'name' | 'owner' | 'isDelete';
export type GroupCreationAttributes = Optional<
  GroupAttributes,
  GroupOptionalAttributes
>;

export class Group
  extends Model<GroupAttributes, GroupCreationAttributes>
  implements GroupAttributes
{
  id!: string;
  name?: string;
  owner?: string;
  isDelete?: boolean;

  // Group hasMany Presentation via groupId
  presentations!: Presentation[];
  getPresentations!: Sequelize.HasManyGetAssociationsMixin<Presentation>;
  setPresentations!: Sequelize.HasManySetAssociationsMixin<
    Presentation,
    PresentationId
  >;
  addPresentation!: Sequelize.HasManyAddAssociationMixin<
    Presentation,
    PresentationId
  >;
  addPresentations!: Sequelize.HasManyAddAssociationsMixin<
    Presentation,
    PresentationId
  >;
  createPresentation!: Sequelize.HasManyCreateAssociationMixin<Presentation>;
  removePresentation!: Sequelize.HasManyRemoveAssociationMixin<
    Presentation,
    PresentationId
  >;
  removePresentations!: Sequelize.HasManyRemoveAssociationsMixin<
    Presentation,
    PresentationId
  >;
  hasPresentation!: Sequelize.HasManyHasAssociationMixin<
    Presentation,
    PresentationId
  >;
  hasPresentations!: Sequelize.HasManyHasAssociationsMixin<
    Presentation,
    PresentationId
  >;
  countPresentations!: Sequelize.HasManyCountAssociationsMixin;
  // Group hasMany UserInGroup via groupId
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
  // Group belongsTo User via owner
  ownerUser!: User;
  getOwnerUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setOwnerUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createOwnerUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Group {
    return Group.init(
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
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
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
