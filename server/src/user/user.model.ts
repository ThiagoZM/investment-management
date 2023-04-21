import { Model } from "sequelize";
import * as Sequelize from 'sequelize';
import { validateNumber, validateString, validateUuid } from "../shared/utils/validators";
import database from "../shared/database/init.database";

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    iof: number;
    spread: number
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    iof!: number;
    spread!: number;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static validate(data: UserAttributes) {
        validateUuid('id', data.id)
        validateString('firstName', data.firstName)
        validateString('lastName', data.lastName)
        validateString('email', data.email)
        validateString('password', data.password)
        validateNumber('iof', data.iof)
        validateNumber('spread', data.spread)
        return;
    }
}
UserModel.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        firstName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastName: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        iof: {
            allowNull: true,
            type: Sequelize.NUMBER
        },
        spread: {
            allowNull: true,
            type: Sequelize.NUMBER
        }
    },
    {
        sequelize: database.connection,
        tableName: 'Users',
        freezeTableName: true,
        timestamps: true
    }
)