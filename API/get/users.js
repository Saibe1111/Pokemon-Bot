const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
    app.get('/user', async (req, res) => {
      const id = req.query.id
      let db = new sqlite3.Database('./database/db.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      let sql = `SELECT * FROM user where id=${id}`;

      db.get(sql, [], (err, rows) => {
        res.json(rows);
      });

      db.close();
    });
}
