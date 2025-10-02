// src/applications/submission.entity.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'Submissions', // Match your migration table name
})
export class Submission extends Model<Submission> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    uen: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    companyName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING), // Array of strings
        allowNull: false,
        defaultValue: [], // Default empty array
    })
    fileNames: string[];

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    submittedAt: Date;
}
