const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://sam:sssU9989@chatwithme-lzmgx.mongodb.net/test?retryWrites=true&w=majority";

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