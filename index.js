const express = require("express");
const path = require("path")
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')) );

app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(path.join(__dirname, 'public')) );

var storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.png')
	}
  });

var upload = multer({ storage: storage })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
	fs.readdir( "./uploads", function( err, files ) {
		let pics = []
		files.forEach(function(file, index){
			pics.push(file);
		});
		res.render('main', {images: pics})
	});
});

app.get("/photos", (req, res) => {
	fs.readdir( "./uploads", function( err, files ) {
		let pics = []
		files.forEach(function(file, index){
			pics.push("129.21.101.239:8080/uploads/" + file);
		});
		console.log(pics);
		res.status(200).json(pics);
		res.end();
	});
});

app.post("/cool", function (req, res) {
	console.log(req.body.cool);
	res.send(req.body.nothing);
});

app.post("/upload", upload.single('image'), (req, res) => {
	let image = req.file;
	let body = req.body;
	console.log("Image body \(body)");
	res.status(200).send('You gucci');
	res.end();
});


app.listen(PORT);
