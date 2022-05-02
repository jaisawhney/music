import {QueryInterface} from 'sequelize';

export = {
    async up(queryInterface: QueryInterface, Sequelize: any) {
        return queryInterface.addColumn('AudioTracks', 'albumArt', {type: Sequelize.STRING, allowNull: true});
    },

    async down(queryInterface: QueryInterface, Sequelize: any) {
        return queryInterface.removeColumn('AudioTracks', 'albumArt');
    }
};
