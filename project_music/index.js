const express = require('express');
const mysql = require("mysql");
const app = express();
const dbConfig = require('./public/script/configDB.js');
const con = mysql.createConnection(dbConfig);
app.use(express.static("public"));
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;
app.get('/', async (req, res) => {
    let resultV = [];
    let playResult = [];
    let playTitle = [];
    let playSinger = [];
    let playMusicAddr = [];
    let playMusicPlayTime = [];
    let playImgSrc = [];
    console.log('database in');
    let sql = `SELECT * FROM musicList; SELECT * FROM playList`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        resultV = results[0];
        playResult = results[1];
        results[1].forEach((v,i,a) => {
            playTitle.push([v.title]);
            playSinger.push([v.singer]);
            playMusicAddr.push([v.musicAddr]);
            playMusicPlayTime.push([v.playTime]);
            playImgSrc.push([v.picAddr]);
        });
        res.render('musicPlayer', { resultV: resultV, playResult: playResult, playTitle: playTitle, playSinger: playSinger, playMusicAddr: playMusicAddr, playMusicPlayTime: playMusicPlayTime, playImgSrc: playImgSrc });
    });
});
app.get('/addMusic', async (req, res) => {
    console.log('insert table');
    let sql = `INSERT INTO playList (title, singer, playCount, musicAddr, picAddr, playTime) VALUES ('${req.query.title}', '${req.query.singer}', '${req.query.playCount}', '${req.query.musicAddr}', '${req.query.picAddr}', '${req.query.playTime}')`;
    con.query(sql, (err, result) => {
        if(!result){ res.redirect('/');}
        if (err) throw err;
        res.redirect('/');
    });
});
app.get('/deleteMusic', async (req, res) => {
    console.log('delete in');
    let sql = `DELETE FROM playList WHERE num=${req.query.num}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});
app.listen(4328, () => {
    console.log('4328 port!');
});