const express = require("express");
const path = require("path")
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/cool", function (req, res) {
	console.log(req.body.cool);
	
	res.send(req.body.nothing);
});

app.post("/upload", (req, res) => {
	let imageString = req.body.image;
	console.log(imageString);

	if(imageString != ""){
		res.sendStatus(200);
	}else{
		res.sendStatus(500);
	}
});


app.listen(8080);
