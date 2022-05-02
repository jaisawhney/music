import {QueryInterface, DataTypes} from 'sequelize';

export = {
    async up(queryInterface: QueryInterface, Sequelize: any) {
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Users');
    }
};