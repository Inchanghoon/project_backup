const express = require('express');
const mysql = require('mysql');
const app = express();
const dbConfig = require('./public/script/dbConfig');
const con = mysql.createConnection(dbConfig);
con.connect((err) => {
    if(err) throw err;
    console.log('DB connected!');
    let sql = `CREATE TABLE scheduler (
        id INT AUTO_INCREMENT PRIMARY KEY,
        todo VARCHAR(250),
        year CHAR(4) NOT NULL,
        month CHAR(2) NOT NULL,
        day CHAR(2) NOT NULL
    )`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log('make db');
    });
});