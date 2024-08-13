import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <strong>{expense.summary}</strong> - {expense.category} - {expense.date.split('T')[0]}
            <p>{expense.description}</p>
            <p>Tags: {expense.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
