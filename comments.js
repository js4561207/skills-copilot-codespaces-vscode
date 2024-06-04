// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const Comment = require('./comments');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const { author, text } = req.body;
  const newComment = new Comment({ author, text });
  await newComment.save();
  res.json(newComment);
});

app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.json({ message: 'Comment deleted' });
});

app.listen(4001, () => {
  console.log('Server is running on http://localhost:4001');
});

// Path: comment.js
// Create comment model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({