const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
    app.post('/user', async (req, res) => {

      const id = req.body.id
      const username = req.body.username

      if (!id || !username) {
        res.send('Args missing !')
        return
      }

      let sql = `INSERT INTO user (id,xp,username) VALUES (${id},0,'${username}')`

      let db = new sqlite3.Database('./database/db.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });

      db.run(sql, [], function(err) {
        if (err) {
          res.send('Error: ' + err.message)
          return console.error(err.message);
        }
        console.log(`New user inserted id:${id}`);
        res.send(`New user inserted id:${id}`);
      });

    });
}
