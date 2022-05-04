import {Model, DataTypes, CreationOptional, Sequelize, InferAttributes, InferCreationAttributes} from 'sequelize';

export default (sequelize: Sequelize) => {
    class Favorites extends Model<InferAttributes<Favorites>, InferCreationAttributes<Favorites>> {
        declare id: CreationOptional<string>;
        declare userId: string;
        declare trackId: string;
    }

    Favorites.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        trackId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Favorites',
    });
    return Favorites
}