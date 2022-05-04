import {DataTypes, QueryInterface} from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('Favorites', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      trackId: {
        type: DataTypes.UUID,
        references: {
          model: 'AudioTracks',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('Favorites');
  }
};