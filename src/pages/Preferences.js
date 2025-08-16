import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    categories: [],
    frequency: 'daily',
    emailAlerts: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emailStatus, setEmailStatus] = useState('');

  const availableCategories = ['general', 'technology', 'sports', 'business', 'health', 'science', 'entertainment'];

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const res = await api.get('/users/preferences');
        setPreferences(res.data);
      } catch (err) {
        setError('Failed to load preferences.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    try {
      await api.post('/users/preferences', preferences);
      setSuccess('Preferences saved successfully!');
    } catch (err) {
      setError('Failed to save preferences.');
      console.error(err);
    }
  };

  const handleSendTestEmail = async () => {
    setEmailStatus('Sending...');
    try {
      const res = await api.post('/news/send-email');
      setEmailStatus(res.data.message);
    } catch (err) {
      setEmailStatus('Failed to send test email.');
      console.error(err);
    }
  };

  const handleCategoryChange = (cat) => {
    setPreferences((prev) => {
      const categories = prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories };
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleFrequencyChange = (e) => {
    setPreferences((prev) => ({...prev, frequency: e.target.value}));
  }

  if (loading) return <p className="text-center mt-5">Loading preferences...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">News Preferences</h2>
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label"><strong>Categories</strong></label>
                  <div className="d-flex flex-wrap">
                    {availableCategories.map((cat) => (
                      <div key={cat} className="form-check form-check-inline me-3 mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`cat-${cat}`}
                          checked={preferences.categories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                        />
                        <label className="form-check-label" htmlFor={`cat-${cat}`}>{cat}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="frequency" className="form-label"><strong>Alert Frequency</strong></label>
                  <select
                    id="frequency"
                    className="form-select"
                    value={preferences.frequency}
                    onChange={handleFrequencyChange}
                  >
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>

                <div className="mb-4 form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="emailAlerts"
                    name="emailAlerts"
                    checked={preferences.emailAlerts}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="emailAlerts">
                    <strong>Enable Email Alerts</strong>
                  </label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Save Preferences</button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button className="btn btn-secondary" onClick={handleSendTestEmail}>
                  Send Test Email
                </button>
                {emailStatus && <p className="mt-2">{emailStatus}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
