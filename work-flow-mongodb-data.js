/*
 Navicat Premium Data Transfer

 Source Server         : work-flow-mongodb
 Source Server Type    : MongoDB
 Source Server Version : 80000 (8.0.0)
 Source Host           : localhost:27017
 Source Schema         : work-flow

 Target Server Type    : MongoDB
 Target Server Version : 80000 (8.0.0)
 File Encoding         : 65001

 Date: 23/02/2025 01:24:38
*/


// ----------------------------
// Collection structure for proxy
// ----------------------------
db.getCollection("proxy").drop();
db.createCollection("proxy");

// ----------------------------
// Documents of proxy
// ----------------------------
db.getCollection("proxy").insert([ {
    _id: ObjectId("67b9fc0c8dd5436d5f1ab095"),
    ip_address: "127.0.0.1",
    mac_address: null,
    role: "ADMIN",
    type: "SYSTEM",
    status: "ACTIVE",
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:32:12.864Z"),
    created_by: "System",
    update_date_time: ISODate("2025-02-22T16:32:12.864Z"),
    update_by: "System",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.Proxy"
} ]);

// ----------------------------
// Collection structure for screen_master
// ----------------------------
db.getCollection("screen_master").drop();
db.createCollection("screen_master");

// ----------------------------
// Documents of screen_master
// ----------------------------
db.getCollection("screen_master").insert([ {
    _id: ObjectId("67b9fc0c8dd5436d5f1ab091"),
    screen_id: "SCR00000",
    screen_name: "SCREEN MASTER",
    screen_url: "/screen-master",
    screen_components: null,
    is_active: true,
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    created_by: "System",
    update_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    update_by: "System",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.ScreenMaster"
} ]);
db.getCollection("screen_master").insert([ {
    _id: ObjectId("67b9fc0c8dd5436d5f1ab092"),
    screen_id: "SCR00001",
    screen_name: "USER MASTER",
    screen_url: "/user-master",
    screen_components: null,
    is_active: true,
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    created_by: "System",
    update_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    update_by: "System",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.ScreenMaster"
} ]);
db.getCollection("screen_master").insert([ {
    _id: ObjectId("67b9fc0c8dd5436d5f1ab093"),
    screen_id: "SCR00002",
    screen_name: "HOME",
    screen_url: "/home",
    screen_components: null,
    is_active: true,
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    created_by: "System",
    update_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    update_by: "System",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.ScreenMaster"
} ]);
db.getCollection("screen_master").insert([ {
    _id: ObjectId("67b9fc0c8dd5436d5f1ab094"),
    screen_id: "SCR00003",
    screen_name: "KANBAN",
    screen_url: "/kanban-v2",
    screen_components: null,
    is_active: true,
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    created_by: "System",
    update_date_time: ISODate("2025-02-22T16:32:12.787Z"),
    update_by: "System",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.ScreenMaster"
} ]);

// ----------------------------
// Collection structure for user_account
// ----------------------------
db.getCollection("user_account").drop();
db.createCollection("user_account");

// ----------------------------
// Documents of user_account
// ----------------------------
db.getCollection("user_account").insert([ {
    _id: ObjectId("67b9ff538dd5436d5f1ab096"),
    user_id: "WF22022025234611",
    user_name: "admin",
    email: "badaovodoi9988@gmail.com",
    password: "f3d8c3cfcbcc97909ba87fa997a4698c38ce134898f88330691456b96c39fdef6a9b486a2a232beeded9a285d721e26225247965d357f7e1e8ab10753f99b11a",
    full_name: "Administrator",
    birth_day: "14/10/1999",
    image_object: "WFS3-515685-22022025234610-Untitleddesign.png",
    role: "ADMIN",
    authorities: [
        "CREATE",
        "GET",
        "UPDATE",
        "DELETE"
    ],
    level: NumberInt("1"),
    access_screen_list: [
        "SCR00000",
        "SCR00001",
        "SCR00002",
        "SCR00003"
    ],
    login_fail_count: NumberInt("0"),
    is_active: true,
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:46:11.547Z"),
    created_by: "Administrator",
    update_date_time: ISODate("2025-02-22T16:46:11.547Z"),
    update_by: "Administrator",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.UserAccount"
} ]);

// ----------------------------
// Collection structure for user_account_history
// ----------------------------
db.getCollection("user_account_history").drop();
db.createCollection("user_account_history");

// ----------------------------
// Documents of user_account_history
// ----------------------------
db.getCollection("user_account_history").insert([ {
    _id: ObjectId("67b9ff538dd5436d5f1ab097"),
    user_id: "WF22022025234611",
    user_name: "admin",
    email: {
        value_before: null,
        value_after: "badaovodoi9988@gmail.com",
        change_type: "CREATE"
    },
    login_password: {
        value_before: null,
        value_after: "f3d8c3cfcbcc97909ba87fa997a4698c38ce134898f88330691456b96c39fdef6a9b486a2a232beeded9a285d721e26225247965d357f7e1e8ab10753f99b11a",
        change_type: "CREATE"
    },
    full_name: {
        value_before: null,
        value_after: "14/10/1999",
        change_type: "CREATE"
    },
    image_path: {
        value_before: null,
        value_after: "WFS3-515685-22022025234610-Untitleddesign.png",
        change_type: "CREATE"
    },
    role: {
        value_before: null,
        value_after: "USER",
        change_type: "CREATE"
    },
    authorities: {
        value_before: null,
        value_after: [
            "CREATE",
            "GET",
            "UPDATE",
            "DELETE"
        ],
        change_type: "CREATE"
    },
    level: {
        value_before: null,
        value_after: NumberInt("1"),
        change_type: "CREATE"
    },
    login_fail_count: {
        value_before: null,
        value_after: NumberInt("0"),
        change_type: "CREATE"
    },
    is_active: {
        value_before: false,
        value_after: true,
        change_type: "CREATE"
    },
    is_deleted: false,
    created_date_time: ISODate("2025-02-22T16:46:11.609Z"),
    created_by: "Administrator",
    update_date_time: ISODate("2025-02-22T16:46:11.609Z"),
    update_by: "Administrator",
    delete_date_time: null,
    delete_by: null,
    _class: "com.org.workflow.dao.document.UserHistory"
} ]);
