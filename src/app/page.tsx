"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import GridLine from "./components/GridLine";
import Sidebar from "./components/Sidebar";
import Authentication from "./components/Authentication";

export default function Home() {
  return (
    <Authentication>
      <Navbar />
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area on the right */}
        <div
          style={{
            flex: 1,
            padding: 20,
            background: "linear-gradient(180deg, #07122b 0%, #041827 100%)",
            color: "#e6f7ff",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          {/* Content header / container */}
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <GridLine />
            <div style={{ height: 18 }} />
            <GridLine />
            <div style={{ height: 18 }} />
            <GridLine />
          </div>
        </div>
      </div>
    </Authentication>
  );
}
