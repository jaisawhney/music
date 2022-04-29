import {Sequelize} from 'sequelize';
import AudioTrack from './audiotrack';
import User from './user';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const env_var = process.env[config.use_env_variable];

let sequelize;
if (config.use_env_variable && env_var) {
    sequelize = new Sequelize(env_var.toString(), config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
    sequelize,
    Sequelize,
    AudioTrack: AudioTrack(sequelize),
    User: User(sequelize)
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;