const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./public/script/dbConfig.js');
const app = express();
const con = mysql.createConnection(dbConfig);
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;
// select  
app.get('/', async (req, res) => {
    console.log('db in!!');
    let sql = `SELECT * FROM scheduler`;
    let tableId = [];
    let tableTodo = [];
    let tableYear = [];
    let tableMonth = [];
    let tableDay = [];
    con.query(sql, (err, result) => {
        if (err) throw err;
        result.forEach((v,i,a) => {
            tableId.push([v.id]);
            tableTodo.push([v.todo]);
            tableYear.push([v.year]);
            tableMonth.push([v.month]);
            tableDay.push([v.day]);
        });
        console.log(tableTodo);
        res.render('scheduler', {tableId: tableId, tableTodo: tableTodo, tableYear: tableYear, tableMonth: tableMonth, tableDay: tableDay});
    });
});
// insert
app.get('/addSchedule', async (req, res) => {
    console.log('insert in');
    let checkEnter = /\n/g;
    let insertTodo = req.query.sendTodo;
    if(checkEnter.test(insertTodo)){
        insertTodo = insertTodo.replace(checkEnter, '<br>');
    }
    let sql = `INSERT INTO scheduler (todo, year, month, day) VALUES ('${insertTodo}', '${req.query.sendYear}', '${req.query.sendMonth}', '${req.query.sendDay}')`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(insertTodo);
        res.redirect('/');
    });
});
// update
app.get('/updateSchedule', async (req, res) => {
    console.log('update in');
    let checkEnter = /\n/g;
    let insertTodo = req.query.sendTodo;
    if(checkEnter.test(insertTodo)){
        insertTodo = insertTodo.replace(checkEnter, '<br>');
    }
    let sql = `UPDATE scheduler SET todo='${insertTodo}' WHERE id='${req.query.sendId}'`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});
// delete
app.get('/deleteSchedule', async (req, res) => {
    console.log('delete in');
    let sql = `DELETE FROM scheduler WHERE id='${req.query.sendId}'`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

app.listen(4324, () => {
    console.log('4324 port');
});