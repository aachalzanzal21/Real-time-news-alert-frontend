import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Preferences = () => {
  const [categories, setCategories] = useState([]);
  const [frequency, setFrequency] = useState('daily');

  const availableCategories = ['general', 'technology', 'sports', 'business', 'health', 'science', 'entertainment'];

  useEffect(() => {
    const fetchPrefs = async () => {
      const res = await api.get('/users/preferences', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCategories(res.data.categories || []);
      setFrequency(res.data.frequency || 'daily');
    };
    fetchPrefs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/users/preferences', { categories, frequency }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Preferences Saved');
  };

  const toggleCategory = (cat) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Set News Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <strong>Select Categories:</strong><br />
          {availableCategories.map(cat => (
            <div key={cat} className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input" checked={categories.includes(cat)} onChange={() => toggleCategory(cat)} />
              <label className="form-check-label">{cat}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label>Frequency:</label>
          <select className="form-select" value={frequency} onChange={e => setFrequency(e.target.value)}>
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
        <button className="btn btn-primary">Save Preferences</button>
      </form>
    </div>
  );
};

export default Preferences;
