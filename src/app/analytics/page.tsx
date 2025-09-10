"use client";
import React from "react";
import Authentication from "../components/Authentication";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AnalyticsPage() {
	return (
		<Authentication>
			<Navbar />
			<div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
				<Sidebar />

				<main style={{ flex: 1, padding: 24, color: "#e6f7ff", boxSizing: "border-box", background: "linear-gradient(180deg, #07122b 0%, #041827 100%)", minHeight: "100vh" }}>
					<div style={{ maxWidth: 1200, margin: "0 auto" }}>
						<h2 style={{ margin: "6px 0 18px", color: "#bfefff" }}>Analytics</h2>

						<div className="grid">
							<div className="card meter">
								<div className="meter-needle" />
								<div className="card-title">Load (kW)</div>
							</div>

							<div className="card chart">
								<div className="bars">
									<div className="bar a" />
									<div className="bar b" />
									<div className="bar c" />
									<div className="bar d" />
									<div className="bar e" />
								</div>
								<div className="card-title">Throughput</div>
							</div>

							<div className="card stats">
								<div className="stat">Uptime <strong>99.98%</strong></div>
								<div className="stat">Stations <strong>12</strong></div>
								<div className="stat">Active Sessions <strong>4</strong></div>
							</div>
						</div>
					</div>

					<style jsx>{`
						/* filepath: /home/heartbox/frontend/power-dashboard/src/app/analytics/page.tsx */
						.grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: start; }
						.card {
							background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
							padding: 16px;
							border-radius: 10px;
							box-shadow: 0 8px 24px rgba(2,6,23,0.6);
							border: 1px solid rgba(255,255,255,0.03);
						}
						.card-title { margin-top: 10px; color: #9fdff2; font-size: 13px; }

						.meter { display:flex; flex-direction:column; align-items:center; justify-content:center; height:160px; }
						.meter-needle {
							width: 6px; height: 70px; background: linear-gradient(180deg,#ffd34d,#00bfff);
							border-radius: 4px; box-shadow: 0 8px 20px rgba(0,160,255,0.12);
							animation: needle 2.8s ease-in-out infinite;
						}
						@keyframes needle {
							0% { transform: rotate(-40deg) translateY(0); }
							50% { transform: rotate(10deg) translateY(-6px); }
							100% { transform: rotate(-40deg) translateY(0); }
						}

						.chart { height:160px; display:flex; flex-direction:column; justify-content:center; align-items:center; }
						.bars { display:flex; gap:8px; align-items:end; height:86px; }
						.bar { width:18px; background: linear-gradient(180deg,#75f0ff,#007fb3); border-radius:6px; animation: grow 2s ease-in-out infinite; }
						.bar.a { animation-delay: 0s; height: 40%; }
						.bar.b { animation-delay: 0.2s; height: 65%; }
						.bar.c { animation-delay: 0.4s; height: 80%; }
						.bar.d { animation-delay: 0.6s; height: 54%; }
						.bar.e { animation-delay: 0.8s; height: 70%; }
						@keyframes grow {
							0% { transform: scaleY(0.8); opacity: 0.7; }
							50% { transform: scaleY(1.12); opacity: 1; }
							100% { transform: scaleY(0.9); opacity: 0.8; }
						}

						.stats { display:flex; flex-direction:column; gap:8px; }
						.stat { color:#bfeffb; font-size:14px; display:flex; justify-content:space-between; }
						.stat strong { color:#fff; }

						@media (max-width: 980px) {
							.grid { grid-template-columns: 1fr; }
						}
					`}</style>
				</main>
			</div>
		</Authentication>
	);
}
