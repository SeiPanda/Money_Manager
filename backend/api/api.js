const router = require( "express" ).Router();
router.use( ( req, res, next ) => {
	res.header( 'Cache-Control', 'public, max-age=0' );
	res.header( 'Content-Type', 'application/json' );
	next();
});

router.use( "/category/", require( "./contents/category.js" ) );

module.exports = router;