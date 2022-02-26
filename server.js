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
//mysql://bda4ba234ba416:265abcea@eu-cdbr-west-02.cleardb.net/heroku_9a9f65939f95cad?reconnect=true
mysql.createConnection({
	host:"eu-cdbr-west-02.cleardb.net",
	user: "bda4ba234ba416",
	password: "265abcea",
	database:"heroku_9a9f65939f95cad"
	
  
	
}).then((db) => {
	console.log('connecté bdd');
	setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get("/", (req,res,next)=>{
	    res.json({status: 200, msg: "Welcome to your annonces API bro!"})
	})
	
	app.get('/api/v1/cbd', async (req, res, next)=>{
	    
	    let adsBDD = await db.query('SELECT * FROM confiserie_kotlin_app');
	    
	    if(adsBDD.code){
	        res.json({status:500, error_msg: adsBDD})
	    }
	    
	    res.json({status: 200, results:{msg: "Success", cbd: adsBDD}})
	})
	



})
.catch(err=>console.log("Erreur Connection: ", err))

const PORT = process.env.PORT || 8889;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is allright');
})