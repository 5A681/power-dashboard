"use client";
import React from "react";
import Navbar from "./components/Navbar";
import GridLine from "./components/GridLine";
import Sidebar from "./components/Sidebar";
import Authentication from "./components/Authentication";

export default function Home() {
  return (
    <Authentication>
      <Navbar />

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar />

        <main className="content">
          <div className="wrap">
            <header className="page-header">
              <h1>Dashboard</h1>
              <p className="subtitle">Overview of stations and power flows</p>
            </header>

            <section className="grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <article key={i} className="card">
                  <div className="card-title">Station {i + 1}</div>
                  <GridLine />
                </article>
              ))}
            </section>
          </div>

          <style jsx>{`
            .content {
              flex: 1;
              padding: 20px;
              background: linear-gradient(180deg, #07122b 0%, #041827 100%);
              color: #e6f7ff;
              min-height: 100vh;
              box-sizing: border-box;
            }
            .wrap { max-width: 1400px; margin: 0 auto; }
            .page-header { display:flex; align-items:baseline; gap:12px; margin-bottom: 18px; }
            .page-header h1 { margin:0; font-size:20px; color:#bfefff; }
            .subtitle { margin:0; color:#9fdff2; font-size:13px; }

            .grid {
              display:grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 18px;
              align-items: start;
            }
            .card {
              background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
              padding: 12px;
              border-radius: 10px;
              box-shadow: 0 8px 24px rgba(2,6,23,0.6);
              border: 1px solid rgba(255,255,255,0.03);
              display:flex;
              justify-content:center;
            }
            .card-title { color:#9fdff2; font-size:13px; margin-bottom:8px; }

            /* larger screens: add more columns */
            @media (min-width: 1200px) {
              .grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (min-width: 1800px) {
              .grid { grid-template-columns: repeat(4, 1fr); }
            }
            @media (max-width: 640px) {
              .grid { grid-template-columns: 1fr; }
              .page-header { flex-direction:column; align-items:flex-start; gap:6px; }
            }
          `}</style>
        </main>
      </div>
    </Authentication>
  );
}
