import {QueryInterface} from 'sequelize';

export = {
    async up(queryInterface: QueryInterface, Sequelize: any) {
        await queryInterface.createTable('AudioTracks', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            title: {
                type: Sequelize.STRING
            },
            artist: {
                type: Sequelize.STRING,
                allowNull: true
            },
            album: {
                type: Sequelize.STRING,
                allowNull: true
            },
            filePath: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('AudioTracks');
    }
};