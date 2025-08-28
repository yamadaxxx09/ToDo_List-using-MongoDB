require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todosCol;

app.get('/', (req, res) => {
  res.send('Todo API is running with MongoDB. Try GET /api/todos');
});

app.get('/api/todos', async (req, res) => {
  const todos = await todosCol.find({}).toArray();
  res.json(todos.map(t => ({ ...t, _id: t._id.toString() })));
});

app.post('/api/todos', async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'text is required' });
  }
  const result = await todosCol.insertOne({ text: text.trim() });
  res.status(201).json({ _id: result.insertedId.toString(), text: text.trim() });
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const r = await todosCol.deleteOne({ _id: new ObjectId(id) });
  if (r.deletedCount === 0) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

async function start() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.DB_NAME || 'todo_db');
  todosCol = db.collection('todos');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => console.error(err));