'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamesPlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GamesPlayer.init({
    is_completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'GamesPlayer',
  });
  return GamesPlayer;
};