'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{
        foreignKey: 'user_id'
      });
    }
  };
  Player.init({
    username: DataTypes.STRING,
    total_score: DataTypes.BIGINT,
    gold_medals: DataTypes.INTEGER,
    silver_medals: DataTypes.INTEGER,
    bronze_medals: DataTypes.INTEGER,
    total_games: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};