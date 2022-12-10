import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Slide, SlideId } from './slide';

export interface PollSlideAttributes {
  id: number;
  slideId?: number;
  option?: string;
  amount?: number;
}

export type PollSlidePk = 'id';
export type PollSlideId = PollSlide[PollSlidePk];
export type PollSlideOptionalAttributes =
  | 'id'
  | 'slideId'
  | 'option'
  | 'amount';
export type PollSlideCreationAttributes = Optional<
  PollSlideAttributes,
  PollSlideOptionalAttributes
>;

export class PollSlide
  extends Model<PollSlideAttributes, PollSlideCreationAttributes>
  implements PollSlideAttributes
{
  id!: number;
  slideId?: number;
  option?: string;
  amount?: number;

  // PollSlide belongsTo Slide via slideId
  slide!: Slide;
  getSlide!: Sequelize.BelongsToGetAssociationMixin<Slide>;
  setSlide!: Sequelize.BelongsToSetAssociationMixin<Slide, SlideId>;
  createSlide!: Sequelize.BelongsToCreateAssociationMixin<Slide>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PollSlide {
    return PollSlide.init(
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
