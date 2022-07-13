import { Sequelize } from "sequelize";

const db = new Sequelize('prac_library', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

export default db;