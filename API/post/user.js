const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
    app.post('/user', async (req, res) => {

      const id = req.query.id
      const username = req.query.username

      if (!id || !username) {
        res.send('Args missing !')
        return
      }

      let db = new sqlite3.Database('./database/db.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });


      let sql = `SELECT ID id FROM User WHERE ID= ?`;

      db.get(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }

        if(row){
          res.send(`L'id "${row.id}" existe déjà !`)
        }else{
          console.log('Y a rien ! Je m en occupe')
          
          let sql = `INSERT INTO user (id,xp,username) VALUES (${id},0,'${username}')`

          db.run(sql, [], function(err) {
            if (err) {
              res.send('Error: ' + err.message)
              return console.error(err.message);
            }
            console.log(`New user inserted id: ${id}`);
            res.send(`New user inserted id: ${id}`);
          });
        }

      });

    });
}
