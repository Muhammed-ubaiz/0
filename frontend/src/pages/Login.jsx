import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthShell from '../components/layout/AuthShell';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, signIn, signOut, isAuthConfigured } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) {
    return (
      <AuthShell title={`Hello, ${user.displayName || 'there'}`} intro={user.email}>
        <div className="grid gap-2.5">
          <Button to="/shop">Continue shopping</Button>
          <Button to="/wishlist" variant="outline">View wishlist</Button>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
      </AuthShell>
    );
  }

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      navigate(state?.from ?? '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell title="Sign in" intro="Welcome back to Ideal Pack.">
      {!isAuthConfigured && (
        <p className="mb-4 rounded-md bg-mist p-3 text-[13.5px] text-navy">Accounts are not switched on yet. You can still order as a guest.</p>
      )}
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Field label="Password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {error && <p role="alert" className="text-[14px] font-medium text-red">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={busy || !isAuthConfigured}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-center text-[14.5px] text-ink/75">
        New to Ideal Pack? <Link to="/register" className="font-semibold text-blue hover:text-navy">Create an account</Link>
      </p>
    </AuthShell>
  );
}
