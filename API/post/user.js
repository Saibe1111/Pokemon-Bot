const sqlite3 = require('sqlite3').verbose();

module.exports.run = (app) => {
  app.post('/user', async (req, res) => {

    const id = req.body.id
    const username = req.body.username
    let xp = req.body.xp
    let addXp = req.body.addXp
    let removeXp = req.body.removeXp
    let message = req.body.message
    console.log(`xp:${addXp}, message:${message}`)

    if (!id || !username) {
      res.send('Args missing !')
      return
    }

    let db = new sqlite3.Database('./database/db.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
    });


    let sql = `SELECT ID id, XP xp, Message message FROM User WHERE ID= ?`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      if (row) {
        updateUser(res, db, row, xp, removeXp, addXp, id, username, message);
      } else {
        if(message){
          addUser(res, db, id, username);
        }
      }

    });

  });
}


function addUser(res, db, id, username) {
  console.log('Y a rien ! Je m en occupe')
  let sql = `INSERT INTO user (ID,XP,Username,Message) VALUES (${id},1,'${username}',1 )`

  db.run(sql, [], function(err) {
    if (err) {
      res.send('Error: ' + err.message)
      return console.error(err.message);
    }
    console.log(`New user inserted id: ${id}`);
    res.send(`New user inserted id: ${id}`);
  });
}


function updateUser(res, db, row, xp, removeXp, addXp, id, username, message) {

  if (message) {
    let sql = `UPDATE user SET Message= ?, Username= ? WHERE ID= ?`
    message = row.message + parseInt(message)
    db.run(sql, [message, username, id], function(err) {
      if (err) {
        res.send('Error: ' + err.message)
        return console.error(err.message);
      }
    });
  }

  if (!xp && !removeXp) {
    xp = row.xp + parseInt(addXp);
  }
  if (!xp && !addXp) {
    xp = row.xp - parseInt(removeXp);
  }
  if (!addXp && !removeXp) {
    xp = xp;
  }

  if (xp) {

    let sql = `UPDATE user SET XP= ?, Username= ? WHERE ID= ?`

    db.run(sql, [xp, username, id], function(err) {
      if (err) {
        res.send('Error: ' + err.message)
        return console.error(err.message);
      }
    });
  }
  res.send(`User update id: ${id}`);

}
