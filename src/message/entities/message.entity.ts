import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ name: "from_uid", type: "bigint" })
    fromUid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({ name: "is_read", type: "boolean", default: false })
    read: boolean;
}