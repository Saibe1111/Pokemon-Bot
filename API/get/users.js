const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
    app.get('/users', async (req, res) => {

      let db = new sqlite3.Database('./database/db.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      let sql = `SELECT * FROM user ORDER BY xp DESC`;

      db.all(sql, [], (err, rows) => {
        if(err){
          return console.error(err.message);
        }
        res.json(rows);
      });

      db.close();
    });
}
