import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import BackToTop from "../components/BackToTop";
import { PieChart, Pie, Cell, LineChart, Line } from "recharts";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const previewData = [
    { name: "Discretionary", value: 40 },
    { name: "Groceries", value: 25 },
    { name: "Utilities", value: 20 },
    { name: "Transport", value: 15 },
  ];

  const COLORS = ["#3b5bdb", "#22c55e", "#f59e0b", "#ef4444"];

  const simulationPreview = [
    { year: 1, investment: 50000, car: 40000 },
    { year: 2, investment: 120000, car: 90000 },
    { year: 3, investment: 200000, car: 150000 },
    { year: 4, investment: 300000, car: 210000 },
  ];

  const [visibleIcons, setVisibleIcons] = useState([false, false, false]);
  const [startIcons, setStartIcons] = useState(false);
  const [chartDone, setChartDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

   
    gsap.fromTo(
      ".hero",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

   
    gsap.fromTo(
      ".option-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.2,
      }
    );

   
    gsap.fromTo(
      ".how-it-works",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".how-it-works",
          start: "top 85%",
        },
      }
    );

  
    gsap.fromTo(
      ".step",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".steps",
          start: "top 85%",
        },
      }
    );

    
    gsap.fromTo(
      ".learn",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".learn",
          start: "top 85%",
        },
      }
    );

  }, []);


  useEffect(() => {
    if (!chartDone) return;

    setStartIcons(true);

    setTimeout(() => {
      setVisibleIcons((prev) => [true, prev[1], prev[2]]);
    }, 0);

    setTimeout(() => {
      setVisibleIcons((prev) => [prev[0], true, prev[2]]);
    }, 400);

    setTimeout(() => {
      setVisibleIcons((prev) => [prev[0], prev[1], true]);
    }, 800);
  }, [chartDone]);

  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        <h1>NextGen Wealth Studio</h1>
        <p>
          A financial planning companion designed for young South African
          professionals navigating their first five years of earning.
        </p>
      </div>

      <div className="options">

        <Link to="/dashboard" className="option-card">
          <h2>MoneyShot</h2>

          <div className="preview-chart">
            <PieChart width={180} height={180}>
              <Pie
                data={previewData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                onAnimationEnd={() => {
                  setTimeout(() => setChartDone(true), 200);
                }}
              >
                {previewData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <p>Get a clear snapshot of your finances.</p>
        </Link>

        <Link to="/tracks" className="option-card">
          <h2>Strategy Tracks</h2>

          {startIcons && (
            <div className="track-icons-preview">
              <div className={`icon ${visibleIcons[0] ? "show" : ""}`}>🏠</div>
              <div className={`icon ${visibleIcons[1] ? "show" : ""}`}>⚖️</div>
              <div className={`icon ${visibleIcons[2] ? "show" : ""}`}>🌍</div>
            </div>
          )}

          <p>Choose a financial path tailored to your goals.</p>
        </Link>

        <Link to="/simulations" className="option-card">
          <h2>Simulation Lab</h2>

          <div className="preview-chart">
            {chartDone && (
              <LineChart width={180} height={140} data={simulationPreview}>
                <Line type="monotone" dataKey="investment" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="car" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            )}
          </div>

          <p>Explore financial decisions and long-term impact.</p>
        </Link>

      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1. Understand Your Money</h3>
            <p>Break down your income and expenses.</p>
          </div>

          <div className="step">
            <h3>2. Choose a Strategy</h3>
            <p>Select a financial path that fits your goals.</p>
          </div>

          <div className="step">
            <h3>3. Test Your Decisions</h3>
            <p>Explore real-life financial choices.</p>
          </div>
        </div>
      </div>

      <div className="learn">
        <h2>Concepts You’ll Learn</h2>
        <ul>
          <li>What is a healthy savings rate?</li>
          <li>Should you rent or buy?</li>
          <li>RA vs TFSA</li>
          <li>How much to invest</li>
        </ul>
      </div>
      <BackToTop/>
    </div>
  );
}