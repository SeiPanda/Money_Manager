const router = require( "express" ).Router();
const fs = require( "fs" );
const saveFile = "saved_data/categories.json";

/*  Get all categories  */
router.get( "/", async (req, res) => {
    try {
        fs.readFile( saveFile, "utf8", (error, data) => {
            if( error )
                throw error;

            if( data.length == 0 )
                data = {};
            else
                data = JSON.parse( data );

            res.status( 200 ).json( data );
        });
    } catch( error ) {
        console.error( error );
        res.status( 500 ).end();
    }
});

/*  Post new category  */
router.post( "/", async (req, res) => {
    try {

        if( !req.body 
            || !req.body.icon || req.body.icon == ""
            || !req.body.name || req.body.name == ""
            || req.body.subtract == null ) {
                res.status( 400 ).end();
                return;
            }

        fs.readFile( saveFile, "utf8", (error, data) => {
            if( error )
                  throw error;

            if( data.length == 0 )
                data = {};
            else
                data = JSON.parse( data );
                

            let cats = null;

            if( req.body.subtract ) {
                if( !data.subtractions )
                    data.subtractions = [];
                cats = data.subtractions;
            } else {
                if( !data.additions )
                    data.additions = [];
                cats = data.additions;
            }

            if( cats.length != 0 ) {
                let existing = data.subtractions.find( category => category.name.toLowerCase() === req.body.name.toLowerCase() );
                if( existing ) {
                    res.status( 400 ).end( "Kategorie existiert bereits!" );
                    return;
                }
            }
            
            cats.push( { icon: req.body.icon, name: req.body.name } );

            data = JSON.stringify( data );
            fs.writeFile( saveFile, data, "utf8", err => {
                if( err )
                  throw err;
                res.status( 200 ).end();
            });
        });
    } catch( error ) {
        console.error( error );
        res.status( 500 ).end();
    }
});

module.exports = router;