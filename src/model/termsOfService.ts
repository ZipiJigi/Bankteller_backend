import {
    Column,
    Default,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

@Table
export class TermsOfService extends Model<TermsOfService> {
    @PrimaryKey
    @Column
    id!: number;

    @Column
    string!: string;

    @Column
    content!: string;

    @Default(false)
    @Column
    required!: boolean;
}
