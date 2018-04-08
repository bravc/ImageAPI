const express = require("express");
const path = require("path")
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

const PORT = process.env.PORT || 3001

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


app.listen(PORT);
