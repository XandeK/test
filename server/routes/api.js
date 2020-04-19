const express = require('express');
const router = express.Router();
const axios = require('axios');
const ObjectId = require('mongodb').ObjectID
// Include BCrypt package here if you need to hash passwords
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

let category;
let accounts;
let products;
let orders;
let reviews;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://lenstalk2:lenstalk2@lenstalk-cam8l.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  this.category = client.db("lenstalk").collection("Category");
  this.accounts = client.db("lenstalk").collection("Accounts");
  this.products = client.db("lenstalk").collection("Products");
  this.orders = client.db("lenstalk").collection("Orders");
  this.reviews = client.db("lenstalk").collection("Reviews");
  // perform actions on the collection object
  console.log("connected");
});

router.post('/authenticateUser', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const results = await client.db('lenstalk').collection('AdminAccount').findOne(
      {
        userName: username,
        password: password
      }
    )
    if (results) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch(err) {
    res.send(err);
  }
})

router.post('/updatePassword', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const results = await client.db('lenstalk').collection('AdminAccount').updateOne(
      { userName: username },
      {
        $set: { password: password }
      }
    );
    console.log(results);
    res.send(results);
  } catch (error) {
    res.send(error);
  }
})

router.get('/getAllCategory', async function (req, res) {
  try {
    const results = await client.db('lenstalk').collection('Category').find({}).toArray();
    res.send(results);
  } catch (err) {
    res.send(err)
  }
});

router.get('/getAllProduct', async function (req, res) {
  try {
    const results = await client.db('lenstalk').collection('Products').find({}).toArray();
    res.send(results);
  } catch (err) {
    res.send(err)
  }
})

router.get('/getAllOrders', async function (req, res) {
  try {
    const results = await client.db('lenstalk').collection('Orders').find({}).toArray();
    res.send(results);
  } catch (err) {
    res.send(err)
  }
})

router.get('/getCategoryProduct/:categoryName', async function (req, res) {
  try {
    const results = await client.db('lenstalk').collection('Products').find({ category: req.params.categoryName }).toArray();
    res.send(results);
  } catch (err) {
    res.send(err)
  }
})

router.get('/getAllReviews', async function (req, res) {
  try {
    const results = await client.db('lenstalk').collection('Reviews').find({}).toArray();
    res.send(results);
  } catch (err) {
    res.send(err)
  }
})

router.post('/addNewCategory', (req, res) => {
  if (req.body) {
    this.category.insertOne({
      category_name: req.body.categoryName,
      date_created: Date.now()
    })
    res.status(200).send({
      result: 'OK'
    });
  }
});

router.post('/addNewProduct', (req, res) => {
  if (req.body) {
    this.products.insertOne(req.body);
    res.status(200).send(true);
  }
})

router.post('/updateCategoryName', (req, res) => {
  if (req.body) {
    this.category.updateOne({
      _id: new ObjectId(req.body.id)
    }, {
      $set: { 'category_name': req.body.newCategoryName }
    }).then((results) => {
      res.status(200).send({
        result: 'OK'
      });
    })
  }
})

router.post('/updateOrderStatus', (req, res) => {
  if (req.body) {
    this.orders.updateOne({
      _id: new ObjectId(req.body.id)
    }, {
      $set: { 
        'ordersInfo.orderDetails.OrderStatus': req.body.status 
      }
    }).then((results) => {
      res.status(200).send({
        result: 'OK'
      });
    })
  }
})

router.post('/approveRejectReviews', (req, res) => {
  if (req.body) {
    this.reviews.updateOne({
      _id: new ObjectId(req.body.id)
    }, {
      $set: { 
        'Approved': req.body.type
      }
    }).then((results) => {
      res.status(200).send({
        result: 'OK'
      });
    })
  }
})

router.post('/deleteCategory', (req, res) => {
  if (req.body) {
    this.category.deleteOne({
      _id: new ObjectId(req.body.id)
    }).then((results) => {
      res.status(200).send({
        result: 'OK'
      })
    })
  }
})

module.exports = router; 
