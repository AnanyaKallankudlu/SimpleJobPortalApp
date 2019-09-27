var mysql = require('mysql');

var methods = {};

methods.DbHandle = function getDbHandle() {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
        password: "root",
        database: "jobs"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
    });

    return con;
}

methods.GetJobs = function getJobs(sendJobs) {
    var con = methods.DbHandle();
    con.query("SELECT * FROM job_info", function (err, result, fields) {
        if (err) throw err;    
        sendJobs(result);
    });
}

methods.SaveJob = function saveJob(record) {
        var con = methods.DbHandle();
        let insertQuery = "INSERT INTO job_info (role, description) VALUES(?, ?)";
        let items = [record.role, record.desc];
        console.log(items);
        con.query(insertQuery, items, function (err, result, fields) {
            if (err) throw err;
            return result.insertId
        });
}

exports.methods = methods;

