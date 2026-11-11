import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff, Info, Loader2, Lock, Mail, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const PAGE_TITLE = 'Sign in | Ideal Pack';

const input =
  'h-12 w-full rounded-xl border border-navy/15 bg-white pl-11 text-[15px] text-ink shadow-card transition-all placeholder:text-ink/40 hover:border-navy/30 focus:border-blue focus:shadow-[0_0_0_4px_rgb(36_74_145/0.12)] focus:outline-none';

const enter = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] },
});

function Message({ tone, children }) {
  const Icon = tone === 'error' ? AlertCircle : tone === 'success' ? CheckCircle2 : Info;
  const colour = tone === 'error' ? 'border-red/30 text-red' : 'border-blue/20 bg-mist text-navy';
  return (
    <p role={tone === 'error' ? 'alert' : 'status'} className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[13.5px] font-medium leading-snug ${colour}`}>
      <Icon size={17} className="mt-px shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path fill="#244a91" d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.32 2.97-7.33Z" />
      <path fill="#192957" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
      <path fill="#244a91" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9Z" />
      <path fill="#ed171f" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98Z" />
    </svg>
  );
}

export default function Login() {
  const { user, signIn, signInWithGoogle, resetPassword, signOut, isAuthConfigured } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = previous;
    };
  }, []);

  const run = async (kind, action) => {
    setMessage(null);
    setBusy(kind);
    try {
      await action();
    } catch (err) {
      setMessage({ tone: 'error', text: err.message });
    } finally {
      setBusy(null);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    run('password', async () => {
      await signIn(email.trim(), password, remember);
      navigate(state?.from ?? '/', { replace: true });
    });
  };

  const forgot = () => {
    if (!email.trim()) {
      setMessage({ tone: 'info', text: 'Enter your email address above, then choose “Forgot password?” again.' });
      return;
    }
    run('reset', async () => {
      await resetPassword(email.trim());
      setMessage({ tone: 'success', text: `If an account exists for ${email.trim()}, we’ve sent a link to reset your password.` });
    });
  };

  const close = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'));

  const google = () =>
    run('google', async () => {
      await signInWithGoogle(remember);
      navigate(state?.from ?? '/', { replace: true });
    });

  return (
    <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-white px-4 py-10 sm:py-16">
      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        aria-labelledby="login-title"
        className="relative w-full max-w-[440px] rounded-2xl border border-navy/10 bg-white px-6 py-8 shadow-panel sm:px-10 sm:py-10"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close and go back"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-ink/55 transition-colors hover:bg-mist hover:text-navy"
        >
          <X size={19} />
        </button>
        <img src="/logo-original.png" alt="Ideal Pack" className="mx-auto mb-6 h-10 w-auto" />
        <div>
          {user ? (
            <motion.div {...enter(0.1)}>
              <h1 id="login-title" className="text-center text-[30px] font-bold leading-[1.1] sm:text-[34px]">Hello, {user.displayName || 'there'}</h1>
              <p className="mt-2 text-center text-[15px] text-ink/70">You’re signed in as {user.email}.</p>
              <div className="mt-8 grid gap-2.5">
                <Button to="/shop" size="lg" className="rounded-xl">Continue shopping</Button>
                <Button to="/wishlist" variant="outline" size="lg" className="rounded-xl">View wishlist</Button>
                <Button variant="outline" size="lg" className="rounded-xl" onClick={signOut}>Sign out</Button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div {...enter(0.1)}>
                <h1 id="login-title" className="text-center text-[30px] font-bold leading-[1.1] sm:text-[34px]">Sign In</h1>
                <p className="mt-2 text-center text-[15px] text-ink/70">Enter your credentials to access your account.</p>
              </motion.div>

              <motion.form {...enter(0.18)} onSubmit={submit} noValidate={false} className="mt-7 space-y-5">
                {!isAuthConfigured && <Message tone="info">Accounts are coming soon. You can still order as a guest in the meantime.</Message>}

                <div>
                  <label htmlFor="login-email" className="mb-2 block text-[13.5px] font-semibold text-navy">Email address</label>
                  <div className="relative">
                    <Mail size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue" />
                    <input id="login-email" type="email" required autoComplete="email" placeholder="you@business.ae" value={email} onChange={(event) => setEmail(event.target.value)} className={input} />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="login-password" className="text-[13.5px] font-semibold text-navy">Password</label>
                    <button type="button" onClick={forgot} disabled={busy === 'reset'} className="text-[13px] font-semibold text-blue hover:text-navy hover:underline">
                      {busy === 'reset' ? 'Sending…' : 'Forgot password?'}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      placeholder="Your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`${input} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-ink/55 transition-colors hover:bg-mist hover:text-navy"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[14px] text-ink/80">
                  <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 cursor-pointer rounded accent-blue" />
                  Remember me
                </label>

                {message && <Message tone={message.tone}>{message.text}</Message>}

                <button
                  type="submit"
                  disabled={busy !== null}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue text-[15.5px] font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy active:translate-y-0 disabled:translate-y-0 disabled:opacity-70"
                >
                  {busy === 'password' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Signing in…
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>

                {isAuthConfigured && (
                  <>
                    <div className="flex items-center gap-3 text-[12.5px] text-ink/55" aria-hidden="true">
                      <span className="h-px flex-1 bg-navy/10" />
                      or
                      <span className="h-px flex-1 bg-navy/10" />
                    </div>
                    <button
                      type="button"
                      onClick={google}
                      disabled={busy !== null}
                      className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-navy/15 bg-white text-[14.5px] font-semibold text-navy shadow-card transition-colors hover:border-navy/35 hover:bg-mist disabled:opacity-70"
                    >
                      {busy === 'google' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <GoogleMark />}
                      Continue with Google
                    </button>
                  </>
                )}
              </motion.form>

              <motion.p {...enter(0.26)} className="mt-8 text-center text-[14.5px] text-ink/75">
                Don’t have an account?{' '}
                <Link to="/register" className="font-semibold text-blue hover:text-navy hover:underline">Sign Up</Link>
              </motion.p>
              <motion.p {...enter(0.3)} className="mt-2 text-center text-[13.5px] text-ink/60">
                Just browsing? <Link to="/shop" className="font-medium text-blue hover:underline">Continue as guest</Link>
              </motion.p>
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
}
