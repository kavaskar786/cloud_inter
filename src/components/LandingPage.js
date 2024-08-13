import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LandingPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
      const categoryDistribution = response.data.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + 1;
        return acc;
      }, {});
      setCategoryData(Object.keys(categoryDistribution).map(key => ({ name: key, value: categoryDistribution[key] })));

      const tagDistribution = response.data.reduce((acc, expense) => {
        expense.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});
      setTagData(Object.keys(tagDistribution).map(key => ({ name: key, value: tagDistribution[key] })));
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense Overview</h2>
      <PieChart width={400} height={400}>
        <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <PieChart width={400} height={400}>
        <Pie data={tagData} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {tagData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <h3>Last 10 Expenses</h3>
      <ul>
        {expenses.slice(-10).map((expense) => (
          <li key={expense._id}>{expense.summary} - {expense.category} - {expense.date.split('T')[0]}</li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
