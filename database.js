const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DB_URI;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true,useUnifiedTopology: true }, function( err, client ) {
      _db  = client.db('chats');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
