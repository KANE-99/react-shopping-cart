const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require("./../config/db");
const app = express();
// app.use(express.json({ extended: false }));
let nodemailer = require('nodemailer')

app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/products", require("./routes/api/product"));
app.use("/api/devices", require("./routes/api/device"));
const port = 8001;

app.post('/sendmail', (req,res) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kirtesh.prokane@gmail.com',
      pass: 'prokane32'
    }
  });

  const mailOptions = {
    from: 'kirtesh.prokane@gmail.com', // sender address
    to: 'kirtesh.prokane@gmail.com', // list of receivers
    subject: 'Product Order', // Subject line
    html: req.body.text
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.send('Error')
    }else{
      console.log(info);
      res.send('Sent Successfully')
    }     
 });
})

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
connectDB();