import React, { useMemo, useState } from 'react';
import { login as apiLogin, forgotPassword as apiForgot, resetPassword as apiReset } from '../services/api.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetInfo, setResetInfo] = useState({ token: '', password: '' });
  const [info, setInfo] = useState('');

  const canSubmit = useMemo(() => {
    return form.email.trim() && form.password.length >= 6;
  }, [form]);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiLogin(form);
      login(res.token, res.user);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const requestReset = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    try {
      const res = await apiForgot(forgotEmail.trim());
      // For development, we show the token so user can paste into Reset form
      if (res.token) {
        setInfo(`Reset token (dev only): ${res.token}`);
        setResetInfo((r) => ({ ...r, token: res.token }));
        setShowReset(true);
      } else {
        setInfo('If the email exists, a reset link has been sent.');
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to request reset');
    }
  };

  const doReset = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    try {
      await apiReset({ token: resetInfo.token.trim(), password: resetInfo.password });
      setInfo('Password reset successful. You can now log in.');
      setShowReset(false);
      setShowForgot(false);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <div className="text-center mb-3">
          <h4 className="mb-1">Welcome back</h4>
          <div className="text-muted">Sign in to continue</div>
        </div>
        {error && (
          <div className="alert alert-danger py-2" role="alert">{error}</div>
        )}
        <form onSubmit={submit} noValidate>
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
                placeholder="Your password"
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
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-link p-0" type="button" onClick={() => { setShowForgot((s) => !s); setShowReset(false); }}>Forgot password?</button>
          <button className="btn btn-link p-0" type="button" onClick={onSwitch}>Create an account</button>
        </div>

        {info && <div className="alert alert-info my-3 py-2">{info}</div>}
        {error && <div className="alert alert-danger my-3 py-2">{error}</div>}

        {showForgot && (
          <div className="border rounded p-3 mt-3 bg-body-tertiary">
            <h6 className="mb-2">Request password reset</h6>
            <form onSubmit={requestReset} className="row g-2">
              <div className="col-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your account email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 d-grid">
                <button className="btn btn-outline-primary" type="submit">Send reset link</button>
              </div>
            </form>
          </div>
        )}

        {showReset && (
          <div className="border rounded p-3 mt-3">
            <h6 className="mb-2">Reset password</h6>
            <form onSubmit={doReset} className="row g-2">
              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="Paste reset token"
                  value={resetInfo.token}
                  onChange={(e) => setResetInfo({ ...resetInfo, token: e.target.value })}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password (min 6 chars)"
                  value={resetInfo.password}
                  minLength={6}
                  onChange={(e) => setResetInfo({ ...resetInfo, password: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 d-grid">
                <button className="btn btn-success" type="submit">Set new password</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
