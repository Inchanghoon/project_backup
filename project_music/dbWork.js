const express = require('express');
const app = express();
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'c17st23',
    password: 'Cc0VDRloLUXo07L9',
    database: 'c17st23'
});
con.connect((err) => {
    if (err) throw err;
    console.log('DB Connected!');
    let sql = `INSERT INTO musicList (num, title, singer, playCount, musicAddr, picAddr, playTime) VALUES    
        (1, "Drowing", "Blooom", 0, "./music/Blooom - Drowning.mp3", "./images/drowning.jpg", 187),
        (2, "ONI", "Kage", 0, "./music/Kage - ONI.mp3", "./images/oni.jpg", 240),
        (3, "Dreamer", "Alan Walker", 0, "./music/Alan Walker - Dreamer.mp3", "./images/dreamer-rival-remix.jpg", 138),
        (4, "Down for anything", "Daniel Levi", 0, "./music/Daniel Levi - Down For Anything.mp3", "./images/down-for-anything.jpg", 234),
        (5, "Halo", "Poylow", 0, "./music/Poylow - Halo.mp3", "./images/halo-ill-be-there.jpg", 164),
        (6, "Forever Finally Ends", "Clarx & Laney", 0, "./music/Clarx - Forever Finally Ends.mp3", "./images/forever-finally-ends.jpg", 200),
        (7, "uWu BURST", "FLAYA PLAYA", 0, "./music/FLAYA PLAYA - uWu BURST.mp3", "./images/playas-never.jpg", 113),
        (8, "Desperate", "NEFFEX", 0, "./music/NEFFEX - Desperate.mp3", "./images/desperate.jpg", 195),
        (9, "If Looks Can Kill", "Coopex", 0, "./music/Coopex - If Looks Can Kill .mp3", "./images/if-looks-can-kill.jpg", 131),
        (10, "Dont Want To Feel", "Josh Rubin", 0, "./music/Josh Rubin - Dont Want To Feel.mp3", "./images/dont-want-to-feel.jpg", 211),
        (11, "Ride or Die", "Andromedik & Pirapus", 0, "./music/Andromedik - Ride or Die.mp3", "./images/ride-or-die-ft-indy-skies.jpg", 179),
        (12, "PLAYAS NEVER DIE", "ANGELPLAYA", 0, "./music/ANGELPLAYA - PLAYAS NEVER DIE.mp3", "./images/playas-never.jpg", 147),
        (13, "Set You Free", "Siimi", 0, "./music/Siimi - Set You Free.mp3", "./images/set-you-free.jpg", 195),
        (14, "Everything U Promised", "Malarkey & JJL", 0, "./music/Malarkey - Everything U Promised.mp3", "./images/everything-u-promised.jpg", 160),
        (15, "The Raven", "ATSMTX", 0, "./music/ATSMXN - The Raven.mp3", "./images/the-raven.jpg", 116),
        (16, "Falling Down", "Alex Skrindo", 0, "./music/Alex Skrindo - Falling Down.mp3", "./images/falling-down.jpg", 187),
        (17, "Bad Habit", "Jeja", 0, "./music/Jeja - Bad Habit.mp3", "./images/bad-habit.jpg", 99),
        (18, "Paper Walls", "Elliot Kings", 0, "./music/Elliot Kings - Paper Walls.mp3", "./images/paper-walls.jpg", 166),
        (19, "Reflect", "Syn Cole", 0, "./music/Syn Cole - Reflect.mp3", "./images/reflect.jpg", 184),
        (20, "Overdrive", "Millbrook", 0, "./music/Millbrook - Overdrive.mp3", "./images/overdrive.jpg", 193),
        (21, "CONNECTION", "Rxm", 0, "./music/Rxm - CONNECTION.mp3", "./images/connection.jpg", 109),
        (22, "One Taste", "More Plastic", 0, "./music/More Plastic - One Taste.mp3", "./images/one-taste.jpg", 192),
        (23, "Blade Fury", "VOJ & ATSMXN", 0, "./music/VOJ - Blade Fury.mp3", "./images/blade-fury.jpg", 120),
        (24, "ITTY BITTY", "Henri Werner", 0, "./music/Henri Werner - ITTY BITTY.mp3", "./images/itty-bitty.jpg", 130),
        (25, "Visions", "AC13", 0, "./music/AC13 - Visions.mp3", "./images/visions.jpg", 223),
        (26, "The Rage", "OMAS & Awon", 0, "./music/OMAS - The Rage.mp3", "./images/the-rage.jpg", 166),
        (27, "2AM", "WYKO & SIIK", 0, "./music/WYKO - 2AM.mp3", "./images/2am.jpg", 141),
        (28, "Give It To Me", "Cesqeaux", 0, "./music/Cesqeaux - Give It To Me.mp3", "./images/give-it-to-me.jpg", 166),
        (29, "PSYCHOPATHIC", "ANGELPLAYA", 0, "./music/ANGELPLAYA - PSYCHOPATHIC.mp3", "./images/psychopathic.jpg", 149),
        (30, "Voyage", "PLEEG", 0, "./music/PLEEG - Voyage.mp3", "./images/voyage.jpg", 194)
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log('insert table');
    });
});