'use strict';

const express = require('express');
const { Pool, Client } = require('pg')
const fs = require('fs');
const path = require('path');
require('dotenv').config()

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const pool = new Pool({
	host: 'db-01.chlk91o3lwqq.us-west-2.rds.amazonaws.com',
	port: 5432,
	user: 'fircrest',
	database: 'fircrest',
	password: process.env.PGPASSWORD,
	ssl: {
		ca: [fs.readFileSync(path.resolve('./rds-ca-2019-root.pem'), 'ascii')]
	}
})

async function pgget() {
	const { rows } = await pool.query('SELECT * from test')
	let msg = ""
	for (let i = 0; i < rows.length; i++) {
		msg += rows[i].id + " " + rows[i].name + "<br>"
	}

	return msg
}

const app = express();
app.get('/', async (req, res) => {
	let msg = await pgget()
	res.send('Hello World, deployed from done for night bra<br>' + msg);
});

app.listen(PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});