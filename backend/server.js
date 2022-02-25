const express = require( "express" );
const router = require( "express" ).Router();

const app = express();
let bodyParser = require( "body-parser" );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() ); 

//Routes
app.use( "/api/", require( "./api/api" ) );

app.use( express.static( __dirname + "/../frontend/" ) );
app.use( ( req , res ) => res.status( 404 ).send( "nix gefunden :(" ) );

app.listen( 8080 );
console.log( "Server running on Port 8080" );