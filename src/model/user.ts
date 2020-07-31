import {
    AllowNull,
    Column,
    DataType,
    Default,
    IsUUID,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { v4 as uuid } from "uuid";

@Table
export class User extends Model<User> {
    @Default(() => uuid())
    @IsUUID(4)
    @PrimaryKey
    @Column(DataType.STRING)
    id!: string;

    @AllowNull(false)
    @Column
    algorithm!: string;

    @AllowNull(false)
    @Column
    publicKey!: string;
}
