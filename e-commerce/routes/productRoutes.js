import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });
  await newProduct.save();
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

router.get('/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const results = await Product.find({ name: new RegExp(keyword, 'i') });
  res.json(results);
});

export default router;
