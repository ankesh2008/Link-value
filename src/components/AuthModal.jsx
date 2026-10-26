import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useApi } from '../context/ApiContext';
import './AuthModal.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ mode, onClose, onAuthenticated, onModeChange }) {
  const { request } = useApi();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignup = mode === 'signup';

  const validate = () => {
    const nextErrors = {};
    if (isSignup && !name.trim()) nextErrors.name = 'Enter your name.';
    if (!email.trim()) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      nextErrors.password = 'Enter a password.';
    } else if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.';
    }
    if (isSignup && password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRequestError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = await request(`/api/auth/${isSignup ? 'signup' : 'login'}`, {
        method: 'POST',
        body: JSON.stringify({
          ...(isSignup ? { name: name.trim() } : {}),
          email: email.trim(),
          password
        })
      });
      const user = payload?.user || payload?.data?.user;
      if (!user) {
        throw new Error('The API response did not include a user. Check the auth endpoint response.');
      }
      onAuthenticated(user);
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="auth-close" type="button" onClick={onClose} aria-label="Close dialog">
          <X size={19} />
        </button>
        <span className="auth-eyebrow">LINK VALUE ACCOUNT</span>
        <h2 id="auth-title">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        <p className="auth-intro">
          {isSignup ? 'Save your learning resources in one place.' : 'Sign in to continue to your resource hub.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-name">Name</label>
              <input id="auth-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'auth-name-error' : undefined} />
              {errors.name && <span className="auth-field-error" id="auth-name-error">{errors.name}</span>}
            </div>
          )}
          <div className="auth-field">
            <label htmlFor="auth-email">Email address</label>
            <input id="auth-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'auth-email-error' : undefined} />
            {errors.email && <span className="auth-field-error" id="auth-email-error">{errors.email}</span>}
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input id="auth-password" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'auth-password-error' : undefined} />
            {errors.password && <span className="auth-field-error" id="auth-password-error">{errors.password}</span>}
          </div>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">Confirm password</label>
              <input id="auth-confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'auth-confirm-error' : undefined} />
              {errors.confirmPassword && <span className="auth-field-error" id="auth-confirm-error">{errors.confirmPassword}</span>}
            </div>
          )}
          {requestError && <p className="auth-request-error" role="alert">{requestError}</p>}
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
            {!isSubmitting && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New to Link Value?'}
          <button type="button" onClick={() => onModeChange(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </section>
    </div>
  );
}
