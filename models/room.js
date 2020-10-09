'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Room.init({
    rounds: DataTypes.INTEGER,
    identifier: DataTypes.STRING,
    player1_suit: DataTypes.STRING,
    player1_id: DataTypes.STRING,
    player2_suit: DataTypes.STRING,
    player2_id: DataTypes.STRING,
    is_open: DataTypes.BOOLEAN,
    is_finished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};