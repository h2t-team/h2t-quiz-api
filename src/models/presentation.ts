import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Slide, SlideId } from './slide';
import type { User, UserId } from './user';

export interface PresentationAttributes {
  Id: string;
  Name?: string;
  UserId?: string;
}

export type PresentationPk = 'Id';
export type PresentationId = Presentation[PresentationPk];
export type PresentationOptionalAttributes = 'Name' | 'UserId';
export type PresentationCreationAttributes = Optional<
  PresentationAttributes,
  PresentationOptionalAttributes
>;

export class Presentation
  extends Model<PresentationAttributes, PresentationCreationAttributes>
  implements PresentationAttributes
{
  Id!: string;
  Name?: string;
  UserId?: string;

  // Presentation hasMany Slide via PresentId
  Slides!: Slide[];
  getSlides!: Sequelize.HasManyGetAssociationsMixin<Slide>;
  setSlides!: Sequelize.HasManySetAssociationsMixin<Slide, SlideId>;
  addSlide!: Sequelize.HasManyAddAssociationMixin<Slide, SlideId>;
  addSlides!: Sequelize.HasManyAddAssociationsMixin<Slide, SlideId>;
  createSlide!: Sequelize.HasManyCreateAssociationMixin<Slide>;
  removeSlide!: Sequelize.HasManyRemoveAssociationMixin<Slide, SlideId>;
  removeSlides!: Sequelize.HasManyRemoveAssociationsMixin<Slide, SlideId>;
  hasSlide!: Sequelize.HasManyHasAssociationMixin<Slide, SlideId>;
  hasSlides!: Sequelize.HasManyHasAssociationsMixin<Slide, SlideId>;
  countSlides!: Sequelize.HasManyCountAssociationsMixin;
  // Presentation belongsTo User via UserId
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Presentation {
    return Presentation.init(
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
        UserId: {
          type: DataTypes.STRING,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          field: 'userId',
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
