'use strict';
var express = require('express');
var path = require('path');
var db = require('./db');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function (req, res) {
    db.methods.GetJobs(function (jobs) {
        var jobList = [];
        Object.keys(jobs).forEach(function (key) {
            var row = jobs[key];
            jobList.push({ id: row.job_id, role: row.role, desc: row.description });
        });
        console.log(jobList);
        res.render('myRender.ejs', { title: 'My Simple Job Portal', result: jobList });
    });   
});

router.post('/postjobs', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/postJobs.html'));
});

router.post('/savejob', function (req, res) {
    app.use(bodyParser.urlencoded({ extended: true }));
    console.log(req.body);
    db.methods.SaveJob(req.body);
    res.redirect('/');
});

module.exports = router;