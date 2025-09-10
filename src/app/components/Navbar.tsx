"use client";
import React, { useEffect, useState, useRef } from "react";

export default function Navbar() {
	const gauges = [
		{ id: "g1", label: "Grid A", pct: 78 },
		{ id: "g2", label: "Grid B", pct: 54 },
		{ id: "g3", label: "Grid C", pct: 90 },
		{ id: "g4", label: "Grid D", pct: 32 },
	];

	// circle geometry (shared)
	const radius = 16;
	const circumference = 2 * Math.PI * radius;

	// animated stroke offsets (start at full circle)
	const [offsets, setOffsets] = useState<Record<string, number>>(() => {
		const init: Record<string, number> = {};
		gauges.forEach((g) => (init[g.id] = circumference));
		return init;
	});

	// animated numeric counts
	const [counts, setCounts] = useState<Record<string, number>>(() => {
		const init: Record<string, number> = {};
		gauges.forEach((g) => (init[g.id] = 0));
		return init;
	});

	const rafRefs = useRef<Record<string, number | null>>({});
	useEffect(() => {
		const duration = 900; // ms
		const startTime = performance.now();

		// animate each gauge
		gauges.forEach((g, idx) => {
			const targetOffset = Math.round(circumference * (1 - g.pct / 100));
			// stagger start slightly per gauge
			const delay = idx * 120;

			// animate stroke offset by setting state after small delay (CSS transition handles smoothness)
			const toOffset = () =>
				setOffsets((prev) => {
					if (prev[g.id] === targetOffset) return prev;
					return { ...prev, [g.id]: targetOffset };
				});
			const tId = window.setTimeout(toOffset, delay + 60);

			// numeric animation using requestAnimationFrame
			let rafId: number;
			let start: number | null = null;
			function step(now: number) {
				if (start === null) start = now;
				const elapsed = now - start;
				const p = Math.min(elapsed / duration, 1);
				const eased = p < 0.5 ? (2 * p * p) : (-1 + (4 - 2 * p) * p); // simple ease-like
				const value = Math.round(g.pct * eased);
				setCounts((prev) => ({ ...prev, [g.id]: value }));
				if (p < 1) {
					rafId = requestAnimationFrame(step);
					rafRefs.current[g.id] = rafId;
				} else {
					// ensure final value
					setCounts((prev) => ({ ...prev, [g.id]: g.pct }));
				}
			}

			// start numeric animation after same delay
			const startNum = window.setTimeout(() => {
				rafId = requestAnimationFrame(step);
				rafRefs.current[g.id] = rafId;
			}, delay + 60);

			// cleanup timers on unmount
			rafRefs.current[`${g.id}_timeout`] = tId;
			rafRefs.current[`${g.id}_startTimeout`] = startNum;
		});

		return () => {
			// cancel all rAFs and timeouts
			Object.keys(rafRefs.current).forEach((k) => {
				const v = rafRefs.current[k];
				if (typeof v === "number") {
					// determine if it's rAF or timeout by key naming
					if (k.endsWith("_timeout") || k.endsWith("_startTimeout")) {
						clearTimeout(v);
					} else {
						cancelAnimationFrame(v);
					}
				}
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // run once on mount

	// { added code } - periodic gentle updates to make gauges feel live
	useEffect(() => {
		const interval = setInterval(() => {
			gauges.forEach((g) => {
				// small random jitter around base pct
				const jitter = Math.floor((Math.random() - 0.5) * 12); // -6..+5
				const newPct = Math.max(3, Math.min(98, g.pct + jitter));

				// update ring (CSS transition will animate the stroke)
				const targetOffset = Math.round(circumference * (1 - newPct / 100));
				setOffsets((prev) => ({ ...prev, [g.id]: targetOffset }));

				// animate numeric count from current to newPct
				const start = performance.now();
				const startVal = counts[g.id] ?? 0;
				const delta = newPct - startVal;
				const duration = 800;
				let rafId: number;
				function tick(now: number) {
					const t = Math.min(1, (now - start) / duration);
					const eased = t < 0.5 ? (2 * t * t) : (-1 + (4 - 2 * t) * t);
					const value = Math.round(startVal + delta * eased);
					setCounts((prev) => ({ ...prev, [g.id]: value }));
					if (t < 1) {
						rafId = requestAnimationFrame(tick);
						rafRefs.current[g.id] = rafId;
					} else {
						setCounts((prev) => ({ ...prev, [g.id]: newPct }));
					}
				}
				rafId = requestAnimationFrame(tick);
				rafRefs.current[g.id] = rafId;
			});
		}, 4200);

		return () => {
			clearInterval(interval);
			// cancel outstanding rAFs
			Object.keys(rafRefs.current).forEach((k) => {
				const v = rafRefs.current[k];
				if (typeof v === "number") {
					cancelAnimationFrame(v);
				}
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [/* no deps to run once */]);

	return (
		<header className="navbar" role="banner">
			<div className="container">
				<div className="left">
					<div className="logo">
						<svg viewBox="0 0 48 48" className="bolt" aria-hidden>
							<path d="M20 2 L6 28h12l-4 18 22-28H28z" fill="url(#g)" />
							<defs>
								<linearGradient id="g" x1="0" x2="1">
									<stop offset="0" stopColor="#fff3b8" />
									<stop offset="0.5" stopColor="#ffd34d" />
									<stop offset="1" stopColor="#00b1ff" />
								</linearGradient>
							</defs>
						</svg>
						<span className="brand">Power Grid</span>
					</div>
				</div>

				<nav className="right" aria-hidden="false">
					{/* Gauges */}
					<div className="gauges" aria-hidden="true">
						{gauges.map((g) => {
							const radius = 16;
							const circumference = 2 * Math.PI * radius;
							const offset = Math.round(circumference * (1 - g.pct / 100));
							// use displayed (animated) percentage to determine high-load styling
							const displayed = counts[g.id] ?? 0;
							const high = displayed >= 80;
							return (
								<div key={g.id} className={`gauge ${high ? "high" : ""}`}>
									<svg className="gauge-svg" width="40" height="40" viewBox="0 0 40 40" aria-hidden>
										<circle className="g-bg" cx="20" cy="20" r={radius} strokeWidth="4" fill="none" />
										<circle
											className="g-fg"
											cx="20"
											cy="20"
											r={radius}
											strokeWidth="4"
											fill="none"
											style={{
												strokeDasharray: `${circumference}`,
												strokeDashoffset: `${offsets[g.id] ?? circumference}`,
											}}
										/>
									</svg>
									<div className="g-meta">
										<div className="g-pct">{counts[g.id] ?? 0}%</div>
										<div className="g-label">{g.label}</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* existing power animation */}
					<div className="power-anim" aria-hidden="true">
						<div className="bars">
							<div className="bar b1" />
							<div className="bar b2" />
							<div className="bar b3" />
							<div className="bar b4" />
							<div className="bar b5" />
							<div className="bar b6" />
						</div>
						<div className="spark" />
					</div>
				</nav>
			</div>

			<style jsx>{`
				.navbar {
					position: sticky;
					top: 0;
					z-index: 40;
					padding: 12px 20px;
					/* animated dark sheen */
					background: linear-gradient(90deg, #07122b 0%, #0b2238 50%, #07122b 100%);
					background-size: 300% 100%;
					animation: sheen 8s linear infinite;
					color: #e6f7ff;
					box-shadow: 0 2px 12px rgba(2,6,23,0.7);
					backdrop-filter: blur(6px);
				}
				@keyframes sheen {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}

				.container {
					max-width: 1200px;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.left { display:flex; align-items:center; gap:12px; }
				.logo { display:flex; align-items:center; gap:10px; }
				.brand {
					font-weight: 700;
					letter-spacing: 0.6px;
					font-size: 1.05rem;
					color: #e6f7ff;
				}

				.bolt {
					width: 36px;
					height: 36px;
					transform-origin: center;
					filter: drop-shadow(0 8px 20px rgba(0,160,255,0.12));
					animation: boltPulse 2.8s ease-in-out infinite;
				}
				@keyframes boltPulse {
					0% { transform: rotate(-8deg) scale(0.98); filter: drop-shadow(0 6px 14px rgba(0,160,255,0.06)); }
					45% { transform: rotate(-2deg) scale(1.06); filter: drop-shadow(0 12px 30px rgba(0,180,255,0.28)); }
					100% { transform: rotate(-8deg) scale(0.98); filter: drop-shadow(0 6px 14px rgba(0,160,255,0.06)); }
				}

				.right { display:flex; align-items:center; gap:16px; }

				.power-anim {
					position: relative;
					display:flex;
					align-items:center;
					gap:12px;
					padding:6px 10px;
					border-radius:8px;
					background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,160,255,0.02));
					box-shadow: inset 0 0 12px rgba(0,0,0,0.35);
					overflow: visible;
				}

				.bars { display:flex; align-items:flex-end; gap:6px; height:28px; }

				.bar {
					width:6px;
					height:12px;
					background: linear-gradient(180deg,#6bf0ff 0%, #00a3ff 60%, #004b8f 100%);
					border-radius:2px;
					transform-origin: bottom center;
					box-shadow: 0 0 12px rgba(0,160,255,0.14);
					animation: barMove 1200ms cubic-bezier(.2,.9,.3,1) infinite;
				}
				.b1 { animation-delay: 0ms; }
				.b2 { animation-delay: 120ms; }
				.b3 { animation-delay: 240ms; }
				.b4 { animation-delay: 360ms; }
				.b5 { animation-delay: 480ms; }
				.b6 { animation-delay: 600ms; }

				@keyframes barMove {
					0% { transform: scaleY(0.5) translateY(4px); opacity:0.6; box-shadow:0 0 6px rgba(0,160,255,0.06); }
					45% { transform: scaleY(1.45) translateY(0); opacity:1; box-shadow:0 0 18px rgba(0,160,255,0.28); }
					100% { transform: scaleY(0.7) translateY(3px); opacity:0.8; box-shadow:0 0 6px rgba(0,160,255,0.06); }
				}

				/* spark travels left->right across bars to show motion */
				.spark {
					position:absolute;
					left:8px;
					top:50%;
					transform: translateY(-50%);
					width:10px;
					height:10px;
					border-radius:50%;
					background: radial-gradient(circle at 35% 35%, #fff6e6 0%, #ffd34d 40%, #00bfff 70%);
					box-shadow: 0 0 18px rgba(0,180,255,0.28);
					animation: sparkTravel 2.2s linear infinite;
					pointer-events: none;
				}
				@keyframes sparkTravel {
					0% { left: 6px; opacity:0; transform: translateY(-50%) scale(0.6) rotate(0deg); filter: blur(0.4px); }
					8% { opacity:1; transform: translateY(-50%) scale(1) rotate(10deg); }
					55% { left: calc(100% - 20px); opacity:1; transform: translateY(-50%) scale(1) rotate(0deg); filter: blur(0); }
					100% { left: calc(100% + 12px); opacity:0; transform: translateY(-50%) scale(0.6) rotate(-10deg); }
				}

				/* Gauges */
				.gauges {
					display:flex;
					gap:10px;
					align-items:center;
					margin-right: 6px;
				}
				.gauge {
					position: relative;
					display:flex;
					flex-direction:row;
					align-items:center;
					gap:8px;
					min-width: 98px;
					padding: 4px 6px;
					border-radius:8px;
					background: linear-gradient(90deg, rgba(255,255,255,0.01), rgba(0,160,255,0.02));
					box-shadow: inset 0 -1px 0 rgba(255,255,255,0.02);
					transition: transform 260ms ease, box-shadow 300ms ease;
					overflow: visible;
				}

				/* rotating subtle ring (visual motion) */
				.gauge::before{
					content: "";
					position: absolute;
					left: 6px;
					top: 6px;
					width: 28px;
					height: 28px;
					border-radius: 50%;
					border: 2px solid rgba(0,160,255,0.04);
					pointer-events: none;
					transform-origin: 50% 50%;
					animation: ringRotate 6s linear infinite;
				}
				@keyframes ringRotate {
					0% { transform: rotate(0deg); opacity: 0.95; }
					50% { transform: rotate(180deg); opacity: 0.7; }
					100% { transform: rotate(360deg); opacity: 0.95; }
				}

				/* highlight heavy-load gauges */
				.gauge.high {
					transform: translateY(-2px);
					box-shadow: 0 6px 30px rgba(0,160,255,0.12);
					animation: gaugePulse 2.4s ease-in-out infinite;
				}
				.gauge.high::before {
					border-color: rgba(0,200,255,0.18);
					box-shadow: 0 0 20px rgba(0,180,255,0.16);
				}
				@keyframes gaugePulse {
					0% { transform: translateY(-1px) scale(1); box-shadow: 0 6px 18px rgba(0,160,255,0.08); }
					50% { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 40px rgba(0,160,255,0.18); }
					100% { transform: translateY(-1px) scale(1); box-shadow: 0 6px 18px rgba(0,160,255,0.08); }
				}

				.gauge-svg { display:block; }
				.g-bg {
					stroke: rgba(255,255,255,0.06);
				}
				.g-fg {
					stroke: url(#g);
					stroke-linecap: round;
					transform: rotate(-90deg);
					transform-origin: 50% 50%;
					transition: stroke-dashoffset 900ms ease-in-out;
					filter: drop-shadow(0 4px 8px rgba(0,160,255,0.06));
				}

				.g-meta { display:flex; flex-direction:column; line-height:1; }
				.g-pct {
					font-weight:700;
					font-size:12px;
					color:#e6f7ff;
					animation: pctPop 900ms ease;
				}
				.g-label {
					font-size:10px;
					color: #9fdff2;
					opacity:0.9;
				}
				@keyframes pctPop {
					0% { transform: scale(0.92); opacity:0.6; }
					60% { transform: scale(1.06); opacity:1; }
					100% { transform: scale(1); opacity:1; }
				}

				@media (max-width: 640px) {
					.gauges { display:none; } /* hide gauges on small screens */
				}
			`}</style>
		</header>
	);
}