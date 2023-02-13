import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'myBlog',
});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/posts', (req: Request, res: Response) => {
  pool.connect(function (err) {
      if (err) throw err;
      pool.query('SELECT * FROM blog', function (err, result, fields) {
          if (err) throw err;
          res.send(result);
          console.log(result);
          });
  });
});


app.post('/posts', (req: Request, res: Response) => {
  const title = req.body.title
  const content = req.body.content
  const image = req.body.image
  const sqlInsert = 'INSERT INTO blog (title, content, image) VALUES (?, ?, ?);'
  pool.query(sqlInsert, [title, content, image], (err, result) => {
  })
})

app.get('/posts/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const sqlInsert = "SELECT * FROM blog WHERE id = ?;"
  pool.query(sqlInsert, id, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
    console.log(result);
  })
})

app.put('/posts/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const title = req.body.title
  const content = req.body.content
  const image = req.body.image
  const sqlInsert = 'UPDATE blog SET title = ?, content = ?, image = ? WHERE id = ?;'
  pool.query(sqlInsert, [title, content, image, id], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
})
