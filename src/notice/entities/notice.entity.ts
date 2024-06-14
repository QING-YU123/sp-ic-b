import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice { 
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 2000 })
    content: string;

    @Column({ type: "int" })
    type: number;

    @Column({ name: "read_num", type: "int", default: 0 })
    readNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}