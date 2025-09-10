"use client";
import React from "react";

export default function GridLine() {
	return (
		<div className="gridline-wrap" aria-label="Power station charging animation">
			{/* Charging station + solar block */}
			<div className="station">
				<div className="station-top">
					<div className="station-logo">EV</div>
					<div className="leds">
						<span className="led l1" />
						<span className="led l2" />
						<span className="led l3" />
					</div>
				</div>

				<div className="station-body">
					<div className="connector-arm" aria-hidden>
						<div className="arm-joint" />
						<div className="arm-segment" />
						<div className="plug-head">
							<div className="plug-prongs" />
						</div>
						{/* small arcs near plug */}
						<div className="arc a1" />
						<div className="arc a2" />
					</div>

					<div className="meter">
						<div className="meter-face">
							<div className="needle" />
							<div className="gauge-label">kW</div>
						</div>
					</div>
				</div>

				<div className="station-base" />
			</div>

			{/* Solar panel + sun */}
			<div className="solar">
				<div className="sun">
					<div className="ray r1" />
					<div className="ray r2" />
				</div>

				<div className="panel">
					<div className="cells">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="cell" />
						))}
					</div>
				</div>
			</div>

			{/* Cable / pathway for energy */}
			<div className="cable">
				<div className="pulse p1" />
				<div className="pulse p2" />
				<div className="pulse p3" />
			</div>

			{/* Battery */}
			<div className="battery" aria-hidden="true">
				<div className="cap" />
				<div className="shell">
					<div className="fill" />
					{/* connector target glow */}
					<div className="port-glow" />
				</div>
			</div>

			{/* New: Power Dispatch area (Power Center supplies two Substations) */}
			<div className="power-dispatch" aria-hidden="true">
				<div className="power-center" title="Power Center">
					<div className="core" />
					<div className="label">Center</div>
				</div>

				<div className="dispatch">
					{/* Line to Substation A */}
					<div className="line-wrap">
						<div className="line l-a" />
						<div className="pulse-line p-a" />
						<div className="substation s-a">
							<div className="sub-title">Sub A</div>
							<div className="sub-meter">
								<div className="sub-needle" />
							</div>
							<div className="sub-battery">
								<div className="sub-fill" />
							</div>
						</div>
					</div>

					{/* Line to Substation B */}
					<div className="line-wrap">
						<div className="line l-b" />
						<div className="pulse-line p-b" />
						<div className="substation s-b">
							<div className="sub-title">Sub B</div>
							<div className="sub-meter">
								<div className="sub-needle" />
							</div>
							<div className="sub-battery">
								<div className="sub-fill" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.gridline-wrap {
					display: flex;
					align-items: center;
					gap: 16px;
					padding: 14px;
					justify-content: space-between;
					width: 100%;
					max-width: 100%; /* allow full width of parent card */
					margin: 0;
					box-sizing: border-box;
					background: linear-gradient(180deg, rgba(2,8,18,0.02), transparent);
					flex-wrap: wrap; /* allow items to wrap on narrow screens */
				}

				/* Station */
				.station {
					width: 92px; /* slightly smaller to fit */
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
				}
				.station-top {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 6px 8px;
					background: linear-gradient(180deg,#072033,#03243a);
					border-radius: 6px;
					box-shadow: 0 6px 14px rgba(0,0,0,0.35);
				}
				.station-logo {
					font-weight: 700;
					font-size: 0.95rem;
					color: #cfefff;
				}
				.leds { display:flex; gap:6px; }
				.led {
					width:8px; height:8px; border-radius:50%; box-shadow:0 0 6px rgba(0,0,0,0.5);
					background: rgba(255,255,255,0.08);
				}
				.l1 { animation: ledPulse 2s infinite; animation-delay: 0s; }
				.l2 { animation: ledPulse 2s infinite; animation-delay: 0.25s; }
				.l3 { animation: ledPulse 2s infinite; animation-delay: 0.5s; }
				@keyframes ledPulse {
					0% { background: #18343f; box-shadow: none; }
					50% { background: #00e0ff; box-shadow: 0 0 8px rgba(0,224,255,0.6); }
					100% { background: #18343f; box-shadow: none; }
				}

				.station-body {
					width: 100%;
					display:flex;
					gap:8px;
					align-items:center;
					justify-content:center;
					position: relative;
				}

				.connector-arm {
					position: relative;
					width: 56px;
					height: 56px;
					display:flex;
					align-items:center;
					justify-content:center;
					/* arm rotates/extends to the right periodically */
					animation: armReach 3.6s ease-in-out infinite;
				}
				.arm-joint {
					position:absolute;
					width:12px; height:12px; border-radius:50%;
					background: radial-gradient(circle, #bfefff, #007fb3);
					box-shadow: 0 0 8px rgba(0,140,200,0.28);
					left: 6px;
				}
				.arm-segment {
					position:absolute;
					left: 14px;
					height: 6px;
					width: 28px;
					border-radius: 4px;
					background: linear-gradient(90deg,#0b2740,#00304f);
					box-shadow: inset 0 -2px 6px rgba(0,0,0,0.6);
					transform-origin: left center;
					/* small bending */
					animation: armBend 3.6s ease-in-out infinite;
				}
				.plug-head {
					position:absolute;
					right: -6px;
					width: 20px;
					height: 14px;
					background: linear-gradient(180deg,#cfefff,#6fbfff);
					border-radius: 3px;
					box-shadow: 0 4px 10px rgba(0,0,0,0.35);
					transform-origin: center;
				}
				.plug-prongs {
					position:absolute;
					top: 2px; left:4px;
					width: 10px; height: 6px;
					background: linear-gradient(180deg,#fff,#9fdfff);
					border-radius:1px;
				}

				/* arcs / sparks near plug when arm extends */
				.arc {
					position:absolute;
					width: 10px; height:10px;
					border-radius:50%;
					opacity:0;
					filter: blur(0.6px);
					box-shadow: 0 0 12px rgba(0,180,255,0.35);
				}
				.a1 { left: 32px; top: 10px; animation: arcPop 3.6s linear infinite; animation-delay: 0.4s; }
				.a2 { left: 34px; top: 34px; animation: arcPop 3.6s linear infinite; animation-delay: 0.6s; }
				@keyframes arcPop {
					0% { transform: scale(0.4); opacity:0; }
					25% { transform: scale(1); opacity:1; }
					45% { transform: scale(0.8); opacity:0.6; }
					100% { transform: scale(0.4); opacity:0; }
				}

				@keyframes armReach {
					0% { transform: translateX(0) rotate(0deg); }
					18% { transform: translateX(0) rotate(0deg); }
					40% { transform: translateX(18px) rotate(-6deg); }
					60% { transform: translateX(36px) rotate(-8deg); }
					80% { transform: translateX(18px) rotate(-6deg); }
					100% { transform: translateX(0) rotate(0deg); }
				}
				@keyframes armBend {
					0% { transform: scaleX(1) translateY(0); }
					40% { transform: scaleX(1.02) translateY(-1px); }
					60% { transform: scaleX(0.98) translateY(1px); }
					100% { transform: scaleX(1) translateY(0); }
				}

				.meter {
					width: 44px;
					height: 44px;
					display:flex;
					align-items:center;
					justify-content:center;
				}
				.meter-face {
					width: 44px;
					height: 44px;
					border-radius:50%;
					background: radial-gradient(circle at 30% 30%, #eaf9ff, #c7f2ff 20%, #083142 100%);
					position: relative;
					box-shadow: inset 0 -8px 18px rgba(0,0,0,0.4);
					overflow: hidden;
				}
				.needle {
					position:absolute;
					width:2px; height:18px; left:50%; top:12px;
					background: linear-gradient(180deg,#ffefc4,#ffb84d);
					transform-origin: bottom center;
					animation: needleMove 3s ease-in-out infinite;
				}
				.gauge-label {
					position:absolute;
					bottom:4px; left:50%; transform:translateX(-50%);
					font-size:9px; color:#073242;
				}
				@keyframes needleMove {
					0% { transform: translateX(-50%) rotate(-36deg); }
					35% { transform: translateX(-50%) rotate(8deg); }
					65% { transform: translateX(-50%) rotate(28deg); }
					100% { transform: translateX(-50%) rotate(-36deg); }
				}

				.station-base {
					width: 72%;
					height:8px;
					background: linear-gradient(180deg,#061a2a,#031219);
					border-radius:4px;
					margin-top:6px;
				}

				/* Solar block */
				.solar {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
					width: 76px;
				}
				.sun {
					position: relative;
					width: 36px;
					height: 36px;
					border-radius: 50%;
					background: radial-gradient(circle at 30% 30%, #fff3b8, #ffd34d 40%, #ffb400 100%);
					box-shadow: 0 0 14px rgba(255,180,40,0.22);
				}
				.ray {
					position: absolute;
					width: 3px;
					height: 10px;
					background: linear-gradient(180deg, rgba(255,210,110,0.95), rgba(255,150,30,0.9));
					top: -6px;
					left: 50%;
					transform-origin: bottom center;
					opacity: 0.9;
					animation: sunPulse 2.4s linear infinite;
				}
				.r1 { transform: translateX(-50%) rotate(0deg); animation-delay: 0s; }
				.r2 { transform: translateX(-50%) rotate(90deg); animation-delay: 0.15s; }
				@keyframes sunPulse {
					0% { transform: translateX(-50%) scaleY(0.7); opacity: 0.6; }
					50% { transform: translateX(-50%) scaleY(1.15); opacity: 1; }
					100% { transform: translateX(-50%) scaleY(0.7); opacity: 0.7; }
				}

				.panel {
					width: 84px;
					height: 44px;
					background: linear-gradient(180deg,#0b2740,#09243a);
					border-radius: 6px;
					padding: 6px;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0 4px 12px rgba(2,10,20,0.35);
				}
				.cells {
					display: grid;
					grid-template-columns: repeat(3, 18px);
					grid-gap: 6px;
				}
				.cell {
					width: 18px;
					height: 14px;
					background: linear-gradient(180deg,#003a5a,#002337);
					border-radius: 2px;
					box-shadow: inset 0 -6px 10px rgba(0,0,0,0.35);
				}

				/* Cable */
				.cable {
					flex: 1 1 auto; /* allow grow and shrink */
					height: 12px;
					max-width: 100%;
					min-width: 72px;
					background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.02) 100%);
					border-radius: 999px;
					position: relative;
					overflow: hidden;
					box-shadow: inset 0 -1px 0 rgba(0,0,0,0.25);
				}
				.pulse {
					position: absolute;
					left: -28px;
					top: 50%;
					transform: translateY(-50%);
					width: 14px;
					height: 14px;
					border-radius: 50%;
					background: radial-gradient(circle at 35% 35%, #dffcff 0%, #00b1ff 40%, rgba(0,160,255,0.08) 70%);
					box-shadow: 0 0 20px rgba(0,160,255,0.28);
					animation: travel 1.6s linear infinite;
					opacity: 0;
					mix-blend-mode: screen;
				}
				.p1 { animation-delay: 0s; }
				.p2 { animation-delay: 0.55s; }
				.p3 { animation-delay: 1.05s; }

				@keyframes travel {
					0% { left: -28px; transform: translateY(-50%) scale(0.6); opacity: 0; filter: blur(0.6px); }
					12% { opacity: 1; transform: translateY(-50%) scale(1); filter: blur(0); }
					70% { left: calc(100% - 28px); opacity: 1; transform: translateY(-50%) scale(1); }
					100% { left: calc(100% + 18px); transform: translateY(-50%) scale(0.5); opacity: 0; }
				}

				/* Battery */
				.battery {
					display: flex;
					align-items: center;
					gap: 6px;
					width: 80px;
				}
				.cap {
					width: 8px;
					height: 18px;
					background: linear-gradient(180deg,#cfefff,#6fbfff);
					border-radius: 2px;
					box-shadow: inset 0 -2px 4px rgba(0,0,0,0.15);
				}
				.shell {
					width: 64px;
					height: 32px;
					border-radius: 4px;
					background: linear-gradient(180deg,#072033,#03243a);
					padding: 4px;
					box-sizing: border-box;
					position: relative;
					overflow: hidden;
					border: 2px solid rgba(255,255,255,0.06);
				}
				.fill {
					position: absolute;
					left: 6px;
					top: 6px;
					bottom: 6px;
					width: 6%;
					background: linear-gradient(90deg,#75f0ff,#00a3ff 60%,#006aa6);
					border-radius: 2px;
					box-shadow: 0 0 12px rgba(0,160,255,0.18), inset 0 -8px 18px rgba(0,0,0,0.18);
					animation: charge 3s ease-in-out infinite;
				}
				.port-glow {
					position:absolute;
					right:8px;
					top:50%;
					transform:translateY(-50%);
					width:10px; height:12px; border-radius:2px;
					background: radial-gradient(circle at 40% 30%, rgba(0,240,255,0.9), rgba(0,140,200,0.12));
					opacity:0; pointer-events:none;
					animation: portPulse 3.6s infinite;
				}
				@keyframes portPulse {
					0% { opacity: 0; transform: translateY(-50%) scale(0.8); }
					35% { opacity: 1; transform: translateY(-50%) scale(1.05); }
					65% { opacity: 1; transform: translateY(-50%) scale(1.02); }
					100% { opacity: 0; transform: translateY(-50%) scale(0.8); }
				}
				@keyframes charge {
					0% { width: 6%; }
					30% { width: 42%; }
					60% { width: 82%; }
					85% { width: 96%; }
					100% { width: 6%; }
				}

				/* New styles for power dispatch */
				.power-dispatch {
					margin-top: 14px;
					width: 100%;
					display: flex;
					align-items: flex-start;
					gap: 18px;
					justify-content: center;
					position: relative;
					padding: 12px 6px 2px;
					box-sizing: border-box;
				}
				.power-center {
					width: 84px;
					display:flex;
					flex-direction:column;
					align-items:center;
					gap:8px;
				}
				.power-center .core {
					width: 52px;
					height: 52px;
					border-radius: 50%;
					background: radial-gradient(circle at 30% 30%, #bff7ff, #00a3ff 40%, #006aa6 100%);
					box-shadow: 0 0 28px rgba(0,160,255,0.28);
					animation: corePulse 3s ease-in-out infinite;
				}
				.power-center .label {
					font-size: 12px;
					color: #cfefff;
					opacity: 0.9;
				}
				@keyframes corePulse {
					0% { transform: scale(0.98); box-shadow: 0 0 18px rgba(0,160,255,0.16); }
					50% { transform: scale(1.04); box-shadow: 0 0 36px rgba(0,160,255,0.36); }
					100% { transform: scale(0.98); box-shadow: 0 0 18px rgba(0,160,255,0.16); }
				}

				.dispatch {
					flex: 1 1 auto;
					display: flex;
					flex-direction: column;
					gap: 8px;
					justify-content: center;
					max-width: 100%;
				}

				.line-wrap {
					position: relative;
					display:flex;
					align-items:center;
					gap: 12px;
				}
				.line {
					flex: 1;
					height: 6px;
					border-radius: 999px;
					background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(0,160,255,0.12));
					position: relative;
					overflow: hidden;
					box-shadow: inset 0 -1px 0 rgba(0,0,0,0.15);
				}
				.line::before {
					content: "";
					position:absolute;
					top:0; left:0; right:0; bottom:0;
					background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(0,200,255,0.08) 50%, rgba(255,255,255,0.02) 100%);
					opacity: 0.8;
					background-size: 200% 100%;
					animation: flowBg 2s linear infinite;
				}
				@keyframes flowBg {
					0% { background-position: 0% 0%; }
					100% { background-position: -100% 0%; }
				}

				.pulse-line {
					position: absolute;
					left: -18px;
					top: 50%;
					transform: translateY(-50%);
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: radial-gradient(circle at 35% 35%, #e6ffff 0%, #00a3ff 45%, rgba(0,160,255,0.08) 80%);
					box-shadow: 0 0 16px rgba(0,160,255,0.28);
					animation: pulseTravel 2s linear infinite;
					opacity: 0;
				}
				.p-a { animation-delay: 0s; }
				.p-b { animation-delay: 0.9s; }
				@keyframes pulseTravel {
					0% { left: -18px; opacity: 0; transform: translateY(-50%) scale(0.6); }
					10% { opacity: 1; transform: translateY(-50%) scale(1); }
					70% { left: calc(100% + 8px); opacity: 1; transform: translateY(-50%) scale(1); }
					100% { left: calc(100% + 24px); opacity: 0; transform: translateY(-50%) scale(0.5); }
				}

				.substation {
					width: 96px;
					display:flex;
					flex-direction:column;
					align-items:center;
					gap:6px;
					padding-left: 10px;
				}
				.sub-title { font-size: 12px; color: #bfeffb; }
				.sub-meter {
					width: 56px;
					height: 28px;
					border-radius: 999px;
					background: linear-gradient(180deg,#0b2740,#03243a);
					display:flex;
					align-items:center;
					justify-content:center;
					position: relative;
					box-shadow: inset 0 -6px 12px rgba(0,0,0,0.4);
				}
				.sub-needle {
					width:2px; height:14px; background: #7ff0ff; transform-origin: bottom center;
					animation: subNeedle 2.4s ease-in-out infinite;
				}
				@keyframes subNeedle {
					0% { transform: rotate(-30deg); opacity:0.6; }
					40% { transform: rotate(8deg); opacity:1; }
					80% { transform: rotate(20deg); opacity:0.9; }
					100% { transform: rotate(-30deg); opacity:0.6; }
				}
				.sub-battery {
					width: 76px;
					height: 22px;
					border-radius: 4px;
					background: #021521;
					padding: 3px;
					box-sizing: border-box;
					position: relative;
					overflow: hidden;
					border: 1px solid rgba(255,255,255,0.03);
				}
				.sub-fill {
					position:absolute;
					left:4px; top:3px; bottom:3px;
					width: 8%;
					border-radius:2px;
					background: linear-gradient(90deg,#98f8ff,#00b1ff);
					box-shadow: 0 0 10px rgba(0,160,255,0.2);
					animation: subCharge 2.4s ease-in-out infinite;
				}
				@keyframes subCharge {
					0% { width: 6%; opacity:0.6; }
					30% { width: 46%; opacity:1; }
					60% { width: 86%; opacity:0.95; }
					90% { width: 96%; opacity:0.9; }
					100% { width: 6%; opacity:0.6; }
				}

				/* Small responsive tweaks */
				@media (max-width: 760px) {
					.gridline-wrap { gap: 12px; padding: 12px; }
					.station { width: 86px; }
					.connector-arm { width: 48px; height:48px; }
					.cable { min-width: 80px; max-width: 100%; }
					.shell { width: 56px; height: 28px; }
					.power-dispatch { flex-direction: column; align-items:center; gap:14px; }
					.dispatch { max-width: 320px; }
					.substation { width: 84px; }
				}
			`}</style>
		</div>
	);
}