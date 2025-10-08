import React, { useMemo, useState } from 'react';
import { signup as apiSignup } from '../services/api.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Signup({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    return form.email.trim() && form.password.length >= 6;
  }, [form]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiSignup(form);
      login(res.token, res.user);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <div className="text-center mb-3">
          <h4 className="mb-1">Create your account</h4>
          <div className="text-muted">It takes less than a minute</div>
        </div>
        {error && (
          <div className="alert alert-danger py-2" role="alert">{error}</div>
        )}
        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                className="form-control"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                minLength={6}
                required
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="form-text">At least 6 characters</div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" disabled={!canSubmit || loading} type="submit">
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-link" type="button" onClick={onSwitch}>Have an account? Login</button>
        </div>
      </div>
    </div>
  );
}
