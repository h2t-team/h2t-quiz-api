const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: true,
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
};
