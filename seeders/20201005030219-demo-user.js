'use strict';
const crypto = require('crypto');
const bcrypt = require('bcrypt');
var faker = require('faker');

const SALT_ROUNDS = 10;
const DATA_COUNT = 5;
const DEFAULT_PASSWORD = '123456';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (var i=0;i<DATA_COUNT;i++) {
      await queryInterface.bulkInsert('Users', [{
        email: faker.internet.email(),
        password: await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS),
        is_active: true,
        token: crypto.randomBytes(24).toString('hex'),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
