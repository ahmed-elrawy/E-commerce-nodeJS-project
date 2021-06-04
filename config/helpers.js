const MySqli = require('mysqli');

let conn = new MySqli({
    host: 'localhost',  // IP/domain name 
    post: 3306,  //port, default 3306 
    user: 'root',  //user name 
    passwd: '',  //password 
    db: 'mega-shop'  // You can specify the database or not [optional] 
});

let db = conn.emit(false, '');

module.exports = {
    database: db
};