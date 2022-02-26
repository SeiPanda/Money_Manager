const router = require( "express" ).Router();
const fs = require( "fs" );
const saveFile = "saved_data/categories.json";

/*  Get income categories  */
router.get( "/", async (req, res) => {
    try {
        fs.readFile( saveFile, "utf8", (error, data) => {
            if( error )
                throw error;

            if( data.length == 0 )
                data = {};
            else
                data = JSON.parse( data );

            if( data.income.length == 0 )
                data = {};
            else
                data = data.income;

            res.status( 200 ).json( data );
        });
    } catch( error ) {
        console.error( error );
        res.status( 500 ).end();
    }
});

/*  Post new income category  */
router.post( "/", async (req, res) => {
    try {

        if( !req.body 
            || !req.body.icon || req.body.icon == ""
            || !req.body.name || req.body.name == "" ) {
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

            if( !data.income )
                data.income = [];
            let cats = data.income;

            if( cats.length != 0 ) {
                let existing = cats.find( cat => cat.name.toLowerCase() === req.body.name.toLowerCase() );
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