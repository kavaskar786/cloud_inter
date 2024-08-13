import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onSave }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/expenses', { summary, description, date, category, tags: tags.split(',').map(tag => tag.trim()) });
      onSave();
    } catch (error) {
      alert('Error saving expense');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" list="category-list" required />
      <datalist id="category-list">
        {categories.map((cat) => <option key={cat._id} value={cat.name} />)}
      </datalist>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <button type="submit">Save Expense</button>
    </form>
  );
};

export default ExpenseForm;
