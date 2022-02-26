const express = require('express');
const app = express();

const mysql = require('promise-mysql');

//on va pouvoir stocker nos images que l'on télécharge du front dans un dossier static qui se situe dans le dossier public
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//nous évite que le navigateur bloque nos requêtes ajax
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/public'));

mysql.createConnection({
	host:'localhost',
	database:'cvd_shop',
	user: 'root',
	password: 'root',
	port:8889
  
	
}).then((db) => {
	console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get("/", (req,res,next)=>{
	    res.json({status: 200, msg: "Welcome to your annonces API bro!"})
	})
	
	
	



})
.catch(err=>console.log("Erreur Connection: ", err))

const PORT = process.env.PORT || 8889;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is allright');
})