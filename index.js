const express = require("express");
const path = require("path")
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })

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

app.post("/upload", upload.single('image'), (req, res) => {
	let image = req.file;
	let body = req.body;
	console.log("Image body \(body)");
	console.log(image);
	res.send('You gucci')
	res.sendStatus(200);
});


app.listen(PORT);
