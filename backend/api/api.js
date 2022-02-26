const router = require( "express" ).Router();
router.use( ( req, res, next ) => {
	res.header( 'Cache-Control', 'public, max-age=0' );
	res.header( 'Content-Type', 'application/json' );
	next();
});

router.use( "/category/income/", require( "./contents/category/income.js" ) );
router.use( "/category/expense/", require( "./contents/category/expense.js" ) );

module.exports = router;