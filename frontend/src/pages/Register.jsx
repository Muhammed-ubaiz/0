import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import AuthShell, { AuthNotice } from '../components/layout/AuthShell';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { user, register, isAuthConfigured } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/login" replace />;

  const bind = (name) => ({
    value: form[name],
    onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })),
  });

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Create your account" intro="Save your details for faster reordering.">
      {!isAuthConfigured && <AuthNotice>Accounts are coming soon. You can still order as a guest in the meantime.</AuthNotice>}
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name or business name" icon={User} required autoComplete="name" {...bind('name')} />
        <Field label="Email" icon={Mail} type="email" required autoComplete="email" {...bind('email')} />
        <Field label="Password" icon={Lock} type="password" required minLength={6} autoComplete="new-password" {...bind('password')} />
        {error && <p role="alert" className="text-[14px] font-medium text-red">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-center text-[14.5px] text-ink/75">
        Already registered? <Link to="/login" className="font-semibold text-blue hover:text-navy">Sign in</Link>
      </p>
    </AuthShell>
  );
}
