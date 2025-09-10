"use client";
import React, { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

export default function Authentication({ children }: Props) {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState("");
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	const [error, setError] = useState<string | null>(null);

	// Simple mock credentials (demo)
	const MOCK_USERS = [
		{ username: "alice", password: "alice123" },
		{ username: "bob", password: "bob123" },
		{ username: "carol", password: "carol123" },
	];

	useEffect(() => {
		try {
			const u = localStorage.getItem("pd_user");
			if (u) {
				setUser(u);
				setLoggedIn(true);
			}
		} catch (e) {}
		setLoading(false);
	}, []);

	const doLogin = (e?: React.FormEvent) => {
		e?.preventDefault();
		setError(null);
		const uname = name.trim();
		if (!uname) {
			setError("Enter username");
			return;
		}
		const match = MOCK_USERS.find((m) => m.username === uname && m.password === pass);
		if (!match) {
			setError("Invalid username or password");
			return;
		}
		try {
			localStorage.setItem("pd_user", uname);
		} catch (err) {}
		setUser(uname);
		setLoggedIn(true);
	};

	const doLogout = () => {
		try {
			localStorage.removeItem("pd_user");
		} catch (err) {}
		setUser("");
		setLoggedIn(false);
	};

	// while checking persisted state
	if (loading) return null;

	if (!loggedIn) {
		return (
			<div className="auth-root" role="main" aria-label="Login">
				<div className="card">
					<div className="logo" aria-hidden>
						{/* Lightning / power logo */}
						<svg viewBox="0 0 64 64" className="bolt" xmlns="http://www.w3.org/2000/svg" aria-hidden>
							<defs>
								<linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
									<stop offset="0" stopColor="#fff3b8" />
									<stop offset="0.5" stopColor="#ffd34d" />
									<stop offset="1" stopColor="#00b1ff" />
								</linearGradient>
							</defs>
							<path d="M28 2 L8 36h20L20 62 44 26H28z" fill="url(#g1)" stroke="#fff" strokeOpacity="0.08" strokeWidth="1" />
						</svg>
					</div>

					<h1 className="title">Power Dashboard</h1>
					<p className="subtitle">Sign in to manage power stations</p>

					<form className="form" onSubmit={doLogin}>
						<input className="fld" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
						<input className="fld" type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
						<button className="btn" type="submit">Sign in</button>
					</form>

					{error && <div style={{ color: "#ffb3b3", marginTop: 10 }}>{error}</div>}

					<div className="hint">Demo credentials (use any one):</div>
					<ul className="mock-list">
						{MOCK_USERS.map((m) => (
							<li key={m.username}><strong>{m.username}</strong> / <em>{m.password}</em></li>
						))}
					</ul>

					<div className="hint">Credentials are only for demo on this local build.</div>
				</div>

				<style jsx>{`
					/* filepath: /home/heartbox/frontend/power-dashboard/src/app/components/Authentication.tsx */
					.auth-root {
						min-height: 100vh;
						display: flex;
						align-items: center;
						justify-content: center;
						background: radial-gradient(1200px 600px at 10% 10%, rgba(0,160,255,0.06), transparent 10%),
									radial-gradient(1000px 500px at 90% 90%, rgba(255,180,40,0.03), transparent 12%),
									linear-gradient(180deg, #07122b 0%, #0b2238 100%);
						padding: 24px;
						box-sizing: border-box;
					}
					.card {
						width: 420px;
						max-width: calc(100% - 48px);
						background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
						border-radius: 12px;
						padding: 28px;
						box-shadow: 0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
						text-align: center;
						color: #e6f7ff;
						border: 1px solid rgba(255,255,255,0.03);
					}
					.logo { display:flex; align-items:center; justify-content:center; margin-bottom: 10px; }
					.bolt { width: 88px; height: 88px; filter: drop-shadow(0 6px 18px rgba(0,160,255,0.14)); transform: rotate(-10deg); animation: bob 3.6s ease-in-out infinite; }
					@keyframes bob { 0%{transform:translateY(0) rotate(-10deg);}50%{transform:translateY(-6px) rotate(-6deg);}100%{transform:translateY(0) rotate(-10deg);} }

					.title { margin: 6px 0 2px; font-size: 20px; font-weight: 700; color: #bfefff; }
					.subtitle { margin: 0 0 18px; color: #9fdff2; font-size: 13px; }

					.form { display:flex; flex-direction:column; gap:10px; }
					.fld {
						padding: 12px 12px;
						border-radius: 8px;
						border: 1px solid rgba(255,255,255,0.04);
						background: rgba(255,255,255,0.02);
						color: #e6f7ff;
						outline: none;
						box-sizing: border-box;
					}
					.fld::placeholder { color: rgba(230,247,255,0.5); }

					.btn {
						margin-top: 4px;
						background: linear-gradient(90deg,#00bfff,#0077aa);
						border: none;
						color: white;
						font-weight: 700;
						padding: 12px;
						border-radius: 10px;
						cursor: pointer;
						box-shadow: 0 6px 18px rgba(0,160,255,0.18);
					}

					.mock-list { margin: 10px 0 0; padding: 0; list-style: none; color: #cfefff; font-size: 13px; }
					.mock-list li { margin: 4px 0; color: rgba(190,239,251,0.9); }

					.hint { margin-top: 12px; font-size: 12px; color: rgba(190,239,251,0.7); }

					@media (max-width: 520px) {
						.card { padding: 20px; border-radius: 10px; }
						.bolt { width: 72px; height: 72px; }
					}
				`}</style>
			</div>
		);
	}

	// logged in: render children (dashboard)
	return (
		<div className="auth-wrap">
			{children}
			{/* small floating logout control so user can sign out from the page as well */}
			<button className="quick-logout" onClick={doLogout} title="Logout">Logout</button>

			<style jsx>{`
				/* filepath: /home/heartbox/frontend/power-dashboard/src/app/components/Authentication.tsx */
				.auth-wrap { position: relative; min-height: 100vh; }
				.quick-logout {
					position: fixed;
					right: 18px;
					bottom: 18px;
					background: linear-gradient(90deg,#ff7b4d,#ffb84d);
					border: none;
					color: #072033;
					font-weight: 700;
					padding: 8px 12px;
					border-radius: 8px;
					box-shadow: 0 8px 20px rgba(0,0,0,0.25);
					cursor: pointer;
					z-index: 60;
				}
			`}</style>
		</div>
	);
}
