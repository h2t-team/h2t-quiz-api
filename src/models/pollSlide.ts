import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { slide, slideId } from './slide';

export interface pollSlideAttributes {
  id: number;
  slideId?: number;
  option?: string;
  amount?: number;
}

export type pollSlidePk = 'id';
export type pollSlideId = pollSlide[pollSlidePk];
export type pollSlideOptionalAttributes =
  | 'id'
  | 'slideId'
  | 'option'
  | 'amount';
export type pollSlideCreationAttributes = Optional<
  pollSlideAttributes,
  pollSlideOptionalAttributes
>;

export class pollSlide
  extends Model<pollSlideAttributes, pollSlideCreationAttributes>
  implements pollSlideAttributes
{
  id!: number;
  slideId?: number;
  option?: string;
  amount?: number;

  // pollSlide belongsTo slide via slideId
  slide!: slide;
  getSlide!: Sequelize.BelongsToGetAssociationMixin<slide>;
  setSlide!: Sequelize.BelongsToSetAssociationMixin<slide, slideId>;
  createSlide!: Sequelize.BelongsToCreateAssociationMixin<slide>;

  static initModel(sequelize: Sequelize.Sequelize): typeof pollSlide {
    return pollSlide.init(
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
        option: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'poll_slide',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'poll_slide_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
