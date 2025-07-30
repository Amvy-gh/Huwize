'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('wuHuwize323', 10);

    await queryInterface.bulkInsert('user_admin', [
      {
        username: 'Huwize432@gmail.com',
        password: hashedPassword,
        refresh_token: null,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      username: 'Huwize432@gmail.com'
    }, {});
  }
};
