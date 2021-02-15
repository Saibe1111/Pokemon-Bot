const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
    app.post('/user', async (req, res) => {

      const id = req.query.id
      const username = req.query.username
      let xp = req.query.xp
      let addXp = req.query.addXp
      let removeXp = req.query.removeXp

      if (!id || !username) {
        res.send('Args missing !')
        return
      }

      let db = new sqlite3.Database('./database/db.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      });


      let sql = `SELECT ID id, XP xp FROM User WHERE ID= ?`;

      db.get(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }

        if(row){
          updateUser(res, db, row, xp, removeXp, addXp, id, username);
        }else{
          addUser(res, db, id, username);
        }

      });

    });
}

function addUser(res, db, id, username){
  console.log('Y a rien ! Je m en occupe')
  let sql = `INSERT INTO user (ID,XP,Username) VALUES (${id},0,'${username}')`

  db.run(sql, [], function(err) {
    if (err) {
      res.send('Error: ' + err.message)
      return console.error(err.message);
    }
    console.log(`New user inserted id: ${id}`);
    res.send(`New user inserted id: ${id}`);
  });
}

function updateUser(res, db, row, xp, removeXp, addXp, id, username){

      if(!xp && !removeXp){
        xp = row.xp + parseInt(addXp);
      }
      if(!xp && !addXp){
        xp = row.xp - parseInt(removeXp);
      }
      if(!addXp && !removeXp){
        xp = xp;
      }
      if(!addXp && !removeXp && !xp){
        xp = row.xp + 1;
      }


    let sql = `UPDATE user SET XP= ?, Username= ? WHERE ID= ?`

    db.run(sql, [xp, username, id], function(err) {
      if (err) {
        res.send('Error: ' + err.message)
        return console.error(err.message);
      }
      console.log(`User update id: ${id}`);
      res.send(`User update id: ${id}`);
    });
}
