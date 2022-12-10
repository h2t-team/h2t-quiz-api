import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Group, GroupId } from './group';
import type { Presentation, PresentationId } from './presentation';
import type { UserInGroup, UserInGroupId } from './userInGroup';

export interface UserAttributes {
  Id: string;
  Fullname?: string;
  Email?: string;
  Phone?: string;
  Username?: string;
  Password?: string;
  CreateAt?: Date;
}

export type UserPk = 'Id';
export type UserId = User[UserPk];
export type UserOptionalAttributes =
  | 'Fullname'
  | 'Email'
  | 'Phone'
  | 'Username'
  | 'Password'
  | 'CreateAt';
export type UserCreationAttributes = Optional<
  UserAttributes,
  UserOptionalAttributes
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  Id!: string;
  Fullname?: string;
  Email?: string;
  Phone?: string;
  Username?: string;
  Password?: string;
  CreateAt?: Date;

  // User hasMany Group via Owner
  Groups!: Group[];
  getGroups!: Sequelize.HasManyGetAssociationsMixin<Group>;
  setGroups!: Sequelize.HasManySetAssociationsMixin<Group, GroupId>;
  addGroup!: Sequelize.HasManyAddAssociationMixin<Group, GroupId>;
  addGroups!: Sequelize.HasManyAddAssociationsMixin<Group, GroupId>;
  createGroup!: Sequelize.HasManyCreateAssociationMixin<Group>;
  removeGroup!: Sequelize.HasManyRemoveAssociationMixin<Group, GroupId>;
  removeGroups!: Sequelize.HasManyRemoveAssociationsMixin<Group, GroupId>;
  hasGroup!: Sequelize.HasManyHasAssociationMixin<Group, GroupId>;
  hasGroups!: Sequelize.HasManyHasAssociationsMixin<Group, GroupId>;
  countGroups!: Sequelize.HasManyCountAssociationsMixin;
  // User hasMany Presentation via UserId
  Presentations!: Presentation[];
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
  // User hasMany UserInGroup via UserId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        Id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        Fullname: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'fullname',
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'email',
        },
        Phone: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'phone',
        },
        Username: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'username',
        },
        Password: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'password',
        },
        CreateAt: {
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
