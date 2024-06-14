import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Power { 
    @PrimaryColumn({ type: "int" })
    id: number;

    @Column({ name: "m_admin0", type: "boolean", default: false })
    mAdmin0: boolean;

    @Column({ name: "m_admin1", type: "boolean", default: false })
    mAdmin1: boolean;

    @Column({ name: "m_user", type: "boolean", default: false })
    mUser: boolean;

    @Column({ name: "m_payment", type: "boolean", default: false })
    mPayment: boolean;

    @Column({ name: "m_feedback", type: "boolean", default: false })
    mFeedback: boolean;

    @Column({ name: "m_notice", type: "boolean", default: false })
    mNotice: boolean;

    @Column({ name: "m_approve", type: "boolean", default: false })
    mApprove: boolean;

    @Column({ name: "m_ban_talk", type: "boolean", default: false })
    mBanTalk: boolean;

    @Column({ name: "m_activity", type: "boolean", default: false })
    mActivity: boolean;

    @Column({ name: "m_store_approve", type: "boolean", default: false })
    mStoreApprove: boolean;

    @Column({ name: "m_store", type: "boolean", default: false })
    mStore: boolean;

    @Column({ name: "m_repair", type: "boolean", default: false })
    mRepair: boolean;

    @Column({ name: "m_outsider", type: "boolean", default: false })
    mOutsider: boolean;

    @Column({ name: "m_parking", type: "boolean", default: false })
    mParking: boolean;

    @Column({ name: "u_approve", type: "boolean", default: false })
    uApprove: boolean;

    @Column({ name: "u_collect", type: "boolean", default: false })
    uCollect: boolean;

    @Column({ name: "u_money", type: "boolean", default: false })
    uMoney: boolean;

    @Column({ name: "u_repair", type: "boolean", default: false })
    uRepair: boolean;

    @Column({ name: "u_feedback", type: "boolean", default: false })
    uFeedback: boolean;

    @Column({ name: "u_activity", type: "boolean", default: false })
    uActivity: boolean;

    @Column({ name: "u_notice", type: "boolean", default: false })
    uNotice: boolean;
}