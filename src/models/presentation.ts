import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { slide, slideId } from './slide';
import type { user, userId } from './user';

export interface presentationAttributes {
  id: string;
  name?: string;
  userId?: string;
}

export type presentationPk = 'id';
export type presentationId = presentation[presentationPk];
export type presentationOptionalAttributes = 'name' | 'userId';
export type presentationCreationAttributes = Optional<
  presentationAttributes,
  presentationOptionalAttributes
>;

export class presentation
  extends Model<presentationAttributes, presentationCreationAttributes>
  implements presentationAttributes
{
  id!: string;
  name?: string;
  userId?: string;

  // presentation hasMany slide via presentId
  slides!: slide[];
  getSlides!: Sequelize.HasManyGetAssociationsMixin<slide>;
  setSlides!: Sequelize.HasManySetAssociationsMixin<slide, slideId>;
  addSlide!: Sequelize.HasManyAddAssociationMixin<slide, slideId>;
  addSlides!: Sequelize.HasManyAddAssociationsMixin<slide, slideId>;
  createSlide!: Sequelize.HasManyCreateAssociationMixin<slide>;
  removeSlide!: Sequelize.HasManyRemoveAssociationMixin<slide, slideId>;
  removeSlides!: Sequelize.HasManyRemoveAssociationsMixin<slide, slideId>;
  hasSlide!: Sequelize.HasManyHasAssociationMixin<slide, slideId>;
  hasSlides!: Sequelize.HasManyHasAssociationsMixin<slide, slideId>;
  countSlides!: Sequelize.HasManyCountAssociationsMixin;
  // presentation belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof presentation {
    return presentation.init(
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
        userId: {
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
        tableName: 'presentation',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'presentation_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
