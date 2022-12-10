import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Slide, SlideId } from './slide';

export interface PollSlideAttributes {
  Id: number;
  SlideId?: number;
  Option?: string;
  Amount?: number;
}

export type PollSlidePk = 'Id';
export type PollSlideId = PollSlide[PollSlidePk];
export type PollSlideOptionalAttributes =
  | 'Id'
  | 'SlideId'
  | 'Option'
  | 'Amount';
export type PollSlideCreationAttributes = Optional<
  PollSlideAttributes,
  PollSlideOptionalAttributes
>;

export class PollSlide
  extends Model<PollSlideAttributes, PollSlideCreationAttributes>
  implements PollSlideAttributes
{
  Id!: number;
  SlideId?: number;
  Option?: string;
  Amount?: number;

  // PollSlide belongsTo Slide via SlideId
  Slide!: Slide;
  getSlide!: Sequelize.BelongsToGetAssociationMixin<Slide>;
  setSlide!: Sequelize.BelongsToSetAssociationMixin<Slide, SlideId>;
  createSlide!: Sequelize.BelongsToCreateAssociationMixin<Slide>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PollSlide {
    return PollSlide.init(
      {
        Id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: 'id',
        },
        SlideId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'slide',
            key: 'id',
          },
          field: 'slideId',
        },
        Option: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'option',
        },
        Amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'amount',
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
