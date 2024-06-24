-- 插入超级管理员的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入管理员的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(2, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入普通用户的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(3, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入外来人员的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(4, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE);

-- 插入社区中心服务人员的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(5, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入商场老板的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(6, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入物业经理的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(7, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入社区医疗站的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(8, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入社区教育的权限设置
INSERT INTO power (id, m_admin0, m_admin1, m_user, m_payment, m_feedback, m_notice, m_approve, m_ban_talk, m_activity, m_store_approve, m_store, m_repair, m_outsider, m_parking, u_post, u_collect, u_money, u_repair, u_feedback, u_activity, u_notice) VALUES
(9, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 注册超级管理员
INSERT INTO user (id, phone, password, power, username, gender, head_img, introduction, name, id_card, address, money, pay_password) VALUES
(1, '17512345678', 'e75e6e36638039923b54393fe7ca02b801ed25ef2a2643f5839b8b60fe59f257', 1, 'admin', '男', 'null', '超级管理员', '青鱼', '123456789012345678', '天津市北辰区', 0, 'e75e6e36638039923b54393fe7ca02b801ed25ef2a2643f5839b8b60fe59f257');