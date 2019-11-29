const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors=require('cors');
 
// parse application/json
app.use(bodyParser.json());
 app.use(cors());
//create database connection
const conn = mysql.createConnection({
  host: 'kunekt.cojc3omxhlms.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'kunekt123',
  database: 'kunekt'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all products
app.get('/api/attendees',(req, res) => {
  let sql = "SELECT * FROM attendees";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//show single product
app.get('/api/attendees/:id',(req, res) => {
  let sql = "SELECT * FROM attendees WHERE ID="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new product
app.post('/api/attendees',(req, res) => {
  let data = {NAME: req.body.NAME, TITLE: req.body.TITLE,COMPANY: req.body.COMPANY,BIO:req.body.BIO,EMAIL:req.body.EMAIL,FACEBOOK:req.body.FACEBOOK,TWITTER:req.body.TWITTER,LINKEDIN:req.body.LINKEDIN};
  let sql = "INSERT INTO attendees SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update product
//app.put('/api/products/:id',(req, res) => {
  //let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  //let query = conn.query(sql, (err, results) => {
  //  if(err) throw err;
  //  res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  //});
//});
 
//Delete product
//app.delete('/api/products/:id',(req, res) => {
 // let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
 // let query = conn.query(sql, (err, results) => {
 //   if(err) throw err;
  //    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
 // });
//});
 
//Server listening
app.timeout = 0;
app.listen(5000,() =>{
  console.log('Server started on port 5000...');
});
 