"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const [stationsOpen, setStationsOpen] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [username, setUsername] = useState("");
	const [inputUser, setInputUser] = useState("");
	const [inputPass, setInputPass] = useState("");

	const pathname = usePathname();

	useEffect(() => {
		// load persisted user (very simple)
		try {
			const u = localStorage.getItem("pd_user");
			if (u) {
				setUsername(u);
				setIsLoggedIn(true);
			}
		} catch (e) {
			// ignore
		}
	}, []);

	const doLogin = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!inputUser.trim()) return;
		// NOTE: replace with real auth call as needed
		setUsername(inputUser.trim());
		setIsLoggedIn(true);
		setShowLogin(false);
		try {
			localStorage.setItem("pd_user", inputUser.trim());
		} catch (err) {}
		setInputPass("");
	};

	const doLogout = () => {
		setIsLoggedIn(false);
		setUsername("");
		try {
			localStorage.removeItem("pd_user");
		} catch (err) {}
	};

	return (
		<aside className={`sidebar ${collapsed ? "collapsed" : ""}`} aria-label="Sidebar">
			<div className="brand">
				<button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
					{collapsed ? "☰" : "⟨"}
				</button>
				{!collapsed && <div className="title">Power Dashboard</div>}
			</div>

			<nav className="menu" role="navigation">
				<ul>
					<li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
						<Link href="/" className="menu-link">
							<span className="icon-btn" aria-hidden>
								{/* Dashboard icon */}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" fill="currentColor"/></svg>
							</span>
							<span className="label">Dashboard</span>
						</Link>
					</li>
					
					{/* Analytics: changed to a Link and active state */}
					<li className={`menu-item ${pathname === "/analytics" ? "active" : ""}`}>
						<Link href="/analytics" className="menu-link">
							<span className="icon-btn" aria-hidden>
								{/* Analytics icon */}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 9l-6 6-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							</span>
							<span className="label">Analytics</span>
						</Link>
					</li>

					<li className={`menu-item has-children ${stationsOpen ? "open" : ""}`}>
						<button className="menu-toggle" onClick={() => setStationsOpen(!stationsOpen)} aria-expanded={stationsOpen}>
							<span className="icon-btn" aria-hidden>
								{/* Station icon */}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 2v11h10V2H7z" fill="currentColor"/><path d="M5 13v7h14v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							</span>
							<span className="label">Stations</span>
							<span className="chev">{stationsOpen ? "▾" : "▸"}</span>
						</button>

						{stationsOpen && (
							<ul className="sub">
								<li className="sub-item">All Stations</li>
								<li className="sub-item">Add Station</li>
								<li className="sub-item">Station Map</li>
							</ul>
						)}
					</li>

					<li className="menu-item">
						<button className="icon-btn" aria-hidden>
							{/* Settings */}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 21.5 16.7l.06-.06A1.65 1.65 0 0021.4 15z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
						</button>
						<span className="label">Settings</span>
					</li>
				</ul>
			</nav>

			<div className="account">
				{isLoggedIn ? (
					<div className="account-info">
						<div className="avatar" aria-hidden>
							{/* simple avatar */}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" fill="currentColor"/><path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
						</div>
						{!collapsed && (
							<div className="meta">
								<div className="name">{username || "User"}</div>
								<div className="role">Operator</div>
							</div>
						)}
						<button className="auth" onClick={doLogout}>Logout</button>
					</div>
				) : (
					<div style={{ width: "100%" }}>
						{showLogin ? (
							<form className="login-form" onSubmit={doLogin}>
								<input
									className="input"
									placeholder="Username"
									value={inputUser}
									onChange={(e) => setInputUser(e.target.value)}
								/>
								<input
									className="input"
									type="password"
									placeholder="Password"
									value={inputPass}
									onChange={(e) => setInputPass(e.target.value)}
								/>
								<div style={{ display: "flex", gap: 8, marginTop: 8 }}>
									<button type="submit" className="auth login">Sign in</button>
									<button type="button" className="auth" onClick={() => setShowLogin(false)}>Cancel</button>
								</div>
							</form>
						) : (
							<button className="auth login" onClick={() => setShowLogin(true)}>Login</button>
						)}
					</div>
				)}
			</div>

			<style jsx>{`
				.sidebar {
					width: 220px;
					min-width: 220px;
					background: linear-gradient(180deg,#041627,#07263a);
					color: #cfefff;
					height: 100vh;
					padding: 12px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					border-right: 1px solid rgba(255,255,255,0.03);
				}
				.sidebar.collapsed {
					width: 64px;
					min-width: 64px;
					padding: 10px 8px;
				}
				.brand {
					display:flex;
					align-items:center;
					gap:12px;
				}
				.collapse-btn {
					background: transparent;
					border: none;
					color: #9fe9ff;
					font-size: 14px;
					cursor: pointer;
				}
				.title {
					font-weight: 700;
					letter-spacing: 0.4px;
				}

				.menu { margin-top: 18px; flex: 1; overflow: auto; padding-right: 6px; }
				.menu ul { list-style: none; padding: 0; margin: 0; display:flex; flex-direction: column; gap:6px; }
				.menu-item {
					display:flex;
					align-items:center;
					gap:10px;
					padding: 8px;
					border-radius: 6px;
					cursor: pointer;
					color: #cfefff;
				}
				.menu-item:hover { background: rgba(255,255,255,0.02); }
				.menu-item.active { background: linear-gradient(90deg, rgba(0,160,255,0.06), rgba(255,255,255,0.01)); box-shadow: inset 0 0 8px rgba(0,160,255,0.04); }
				.icon-btn { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; background: transparent; border: none; color:inherit; }
				.menu-link { display:flex; align-items:center; gap:10px; width:100%; color:inherit; text-decoration:none; }
				.label { flex: 1; text-align:left; font-size: 14px; }
				.chev { font-size: 12px; color: #9fe9ff; margin-left: 4px; }

				.has-children .sub {
					margin-top: 6px;
					margin-left: 36px;
					display:flex;
					flex-direction:column;
					gap:6px;
				}
				.sub-item {
					font-size: 13px;
					color: #bfeffb;
					padding:6px 8px;
					border-radius: 6px;
					cursor: pointer;
				}
				.sub-item:hover { background: rgba(255,255,255,0.02); }

				.account {
					margin-top: 12px;
					display:flex;
					align-items:center;
					justify-content:center;
					padding-top: 12px;
					border-top: 1px solid rgba(255,255,255,0.03);
				}
				.account-info { display:flex; align-items:center; gap:8px; width:100%; padding:6px; }
				.avatar { width:36px; height:36px; color:#9fe9ff; }
				.meta { display:flex; flex-direction:column; }
				.name { font-weight:600; }
				.role { font-size:12px; color: #9fdff2; margin-top:2px; }
				.auth {
					margin-left:auto;
					background: linear-gradient(90deg,#00bfff,#0077aa);
					border: none;
					color: white;
					padding:6px 8px;
					border-radius: 6px;
					cursor: pointer;
					font-weight:600;
				}
				.auth.login { width:100%; padding:8px 10px; font-weight:700; }
				.login-form { display:flex; flex-direction:column; gap:6px; }
				.input {
					width:100%;
					padding:8px;
					border-radius:6px;
					border:1px solid rgba(255,255,255,0.04);
					background: rgba(255,255,255,0.02);
					color: inherit;
					box-sizing: border-box;
				}

				/* collapsed mode tweaks */
				.sidebar.collapsed .title,
				.sidebar.collapsed .label,
				.sidebar.collapsed .meta,
				.sidebar.collapsed .chev,
				.sidebar.collapsed .sub { display: none; }
				.sidebar.collapsed .menu { padding-right: 0; }
				.sidebar.collapsed .auth { display: none; }

				/* small screen */
				@media (max-width: 760px) {
					.sidebar {
						position: sticky;
						top: 0;
						height: auto;
						width: 100%;
						min-width: 0;
						display:flex;
						flex-direction:row;
						gap:12px;
						padding:8px;
					}
					.menu { display:flex; gap:8px; overflow:auto; }
					.menu ul { flex-direction:row; align-items:center; }
					.menu-item { padding:6px; border-radius:8px; }
					.account { display:none; }
				}
			`}</style>
		</aside>
	);
}