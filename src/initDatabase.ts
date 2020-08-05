import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export function initialize(): Sequelize {
    const options: SequelizeOptions | undefined = {
        models: [__dirname + "/model"]
    };
    if (!process.env.BANKTELLER_DB_URI)
        throw new Error("Database uri not present, set BANKTELLER_DB_URI");
    const uri: string = process.env.BANKTELLER_DB_URI;
    return new Sequelize(uri, options);
}
