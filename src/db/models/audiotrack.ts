import {Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, Sequelize} from 'sequelize';

export default (sequelize: Sequelize) => {
    class AudioTrack extends Model<InferAttributes<AudioTrack>, InferCreationAttributes<AudioTrack>> {
        declare id: CreationOptional<string>;
        declare title: string;
        declare artist: string;
        declare album: string;
        declare albumArt: string | null;
        declare filePath: string;
    }


    AudioTrack.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: true
        },
        album: {
            type: DataTypes.STRING,
            allowNull: true
        },
        albumArt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        filePath: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'AudioTrack',
    });

    return AudioTrack
}