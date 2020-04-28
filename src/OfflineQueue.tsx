import React, {useEffect} from "react";
import * as SQLite from "expo-sqlite";
// import * as SecureStore from "expo-secure-store";

export const db = SQLite.openDatabase("offline.db");

export const initQueue = () => {
    useEffect(createTable);
};

export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE IF EXISTS Tasks", []);
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks (
                id INTEGER NOT NULL PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                type VARCHAR(30) NOT NULL,
                payload VARCHAR(30)
                )`,
            []
        );
    });
};

export const addJob = (name, type, payload) => {
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Tasks (name, type, payload) VALUES (?, ?, ?)", [
            name,
            type,
            payload,
        ]);
    });
    console.log("job " + name + " added");
    getJobs();
};

export const getJob = (id) => {
    db.transaction((tx) => {
        tx.executeSql(`
          SELECT * FROM Tasks WHERE id=${id};
        `)[0] || undefined;
    });
};

export const getJobs = () => {
    let result;
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Tasks", [], (_, {rows}) => {
            result = JSON.stringify(rows);
            console.log(result);
        });
    });
    return result;
};

export const completeJob = (name) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Tasks WHERE name=?", [name]);
    });
    console.log("job " + name + " deleted");
    getJobs();
};

export const runJobs = () => {
    const cron = setInterval(() => {
        getJobs().forEach((job) => {
            switch (job.type) {
                case "getTours": // run getTours
            }
        });
    }, 5000);
};
