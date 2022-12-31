import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Slide, SlideId } from './slide';

export interface ParaSlideAttributes {
  id: number;
  slideId?: number;
  paragraph?: string;
}

export type ParaSlidePk = 'id';
export type ParaSlideId = ParaSlide[ParaSlidePk];
export type ParaSlideOptionalAttributes = 'id' | 'slideId' | 'paragraph';
export type ParaSlideCreationAttributes = Optional<
  ParaSlideAttributes,
  ParaSlideOptionalAttributes
>;

export class ParaSlide
  extends Model<ParaSlideAttributes, ParaSlideCreationAttributes>
  implements ParaSlideAttributes
{
  id!: number;
  slideId?: number;
  paragraph?: string;

  // ParaSlide belongsTo Slide via slideId
  slide!: Slide;
  getSlide!: Sequelize.BelongsToGetAssociationMixin<Slide>;
  setSlide!: Sequelize.BelongsToSetAssociationMixin<Slide, SlideId>;
  createSlide!: Sequelize.BelongsToCreateAssociationMixin<Slide>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ParaSlide {
    return ParaSlide.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        slideId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'slide',
            key: 'id',
          },
        },
        paragraph: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'para_slide',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'para_slide_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
