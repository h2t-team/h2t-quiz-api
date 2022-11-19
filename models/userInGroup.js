const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'UserInGroup',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id',
        },
        field: 'user_id',
      },
      groupId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'group',
          key: 'id',
        },
        field: 'group_id',
      },
    },
    {
      sequelize,
      tableName: 'user_in_group',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'user_in_group_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
