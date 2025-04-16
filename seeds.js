const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://Natsumi37:Kukita29509f@mongoosebasics.uyvth.mongodb.net/?retryWrites=true&w=majority&appName=MongooseBasics';

const Product = require('./models/product');

mongoose.connect(mongoUrl)
 .then(() => {
  console.log('MONGO CONNECTION SUCCESS');
 })
 .catch(err => {
  console.log('OH NO MONGO CONNECTION ERROR');
  console.log(err);
 })

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Organic Celery',
    price: 1.50,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
  }
]

Product.insertMany(seedProducts)
 .then(res => {
  console.log(res);
 })
 .catch(e => {
  console.log(e);
 })

// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit'
// })

// p.save()
//  .then(() => {
//    console.log(p);
//  })
//  .catch(e => {
//   console.log(e);
//  })