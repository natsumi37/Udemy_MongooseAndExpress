const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://{{MongoId&Password}}@mongoosebasics.uyvth.mongodb.net/?retryWrites=true&w=majority&appName=MongooseBasics';
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect(mongoUrl)
 .then(() => {
  console.log('MONGO CONNECTION SUCCESS');
 })
 .catch(err => {
  console.log('OH NO MONGO CONNECTION ERROR');
  console.log(err);
 })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // encodes req.body
app.use(methodOverride('_method')); // overrides with POST 

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render('products/index', { products, category });
  } else {
    const products = await Product.find({});
    res.render('products/index', { products, category: 'All' });
  }
})

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`products/${ newProduct._id }`);
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true , new: true });
  console.log(product)
  res.redirect(`${ product._id }`);
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  console.log('Deleted: ', deletedProduct);
  res.redirect('/products');
})

app.listen(3000, () => {
  console.log('APP IS LISTENING ON PORT 3000');
})