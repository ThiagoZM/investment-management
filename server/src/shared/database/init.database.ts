import { Sequelize } from 'sequelize';
import { DATABASE_CONFIG_OPTIONS, DATABASE_CONFIG_URI } from '../config/database.config';

class DataBase {
    public connection!: Sequelize;

    constructor() {
        this.init();
    }

    init(): void {
        this.connection = new Sequelize(
            DATABASE_CONFIG_URI,
            DATABASE_CONFIG_OPTIONS
        );
    }
}

const database: DataBase = new DataBase();
(async () => {
    try {
        await database.connection.authenticate();
    } catch(error) {
        console.log(error);
        process.exit(1)
    }
})

export default database;