import {Model, DataTypes, CreationOptional, Sequelize, InferAttributes, InferCreationAttributes} from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize: Sequelize) => {
    class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: CreationOptional<string>;
        declare username: string;
        declare password: string;
        declare validatePassword: (password: string) => boolean;
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    User.addHook('beforeCreate', async function (user: User) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log(user.password);
    });

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }
    return User
}