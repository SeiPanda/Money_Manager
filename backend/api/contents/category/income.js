const router = require( "express" ).Router();
const fs = require( "fs" );
const categoryFile = "../../../saved_data/categories.json";

/*  Get expanse categories  */
router.get( "/", async (req, res) => {
    try {

        let incomeCategories = require( categoryFile ).income;
        if( incomeCategories.length == 0 )
            incomeCategories = [];

        res.status( 200 ).json( incomeCategories );

    } catch( error ) {
        console.error( error );
        res.status( 500 ).end();
    }
});

/*  Post new expanse category  */
router.post( "/", async (req, res) => {
    try {

        if( !req.body 
            || !req.body.icon || req.body.icon == ""
            || !req.body.name || req.body.name == "" ) {
                res.status( 400 ).end();
                return;
            }

        let incomeCategories = require( categoryFile ).expense;
        if( incomeCategories.length == 0 )
            incomeCategories = [];
        

        let existing = incomeCategories.find( cat => cat.name.toLowerCase() === req.body.name.toLowerCase() );
        if( existing ) {
            res.status( 400 ).end( "Kategorie existiert bereits!" );
            return;
        }

        incomeCategories.push( { icon: req.body.icon, name: req.body.name } );

        let absoluteCategoryFile = categoryFile.replaceAll( "../", "" );
        fs.readFile( absoluteCategoryFile, "utf8", (error, data) => {
            if( error )
                throw error;

            data = JSON.parse( data );
            data.income = incomeCategories;
            data = JSON.stringify( data );
            
            fs.writeFile( absoluteCategoryFile, data, "utf8", err => {
                if( err )
                  throw err;

                res.status( 201 ).end();
            });
        });
    } catch( error ) {
        console.error( error );
        res.status( 500 ).end();
    }
});

module.exports = router;