import React from 'react';
import { VALUE_CHAIN } from '../utils/traceabilityData';
import './FarmerImpact.css';
import img_10001 from "../utils/img_10001.jpeg"
import img_10002 from "../utils/img_10002.jpeg"

function FarmerImpact() {
  const totalShare = VALUE_CHAIN.reduce((sum, item) => sum + item.share, 0);

  return (
    <div className="farmer-impact-page">
      <div className="impact-container">
        <div className="page-header">
          <h1>Farmer Impact & Fair Trade</h1>
          <p>Where every rupee goes - complete transparency in our value chain</p>
        </div>

        <div className="value-chain">
          <h2>Value Chain Breakdown</h2>
          <p className="chain-intro">
            For every ₹100 you spend, here's how it's distributed across our value chain:
          </p>

          <div className="chain-visual">
            {VALUE_CHAIN.map((item, index) => (
              <div key={index} className="chain-item">
                <div className="chain-bar-container">
                  <div
                    className="chain-bar"
                    style={{ width: `${(item.share / totalShare) * 100}%` }}
                  >
                    <span className="bar-label">{item.share}%</span>
                  </div>
                </div>
                <div className="chain-details">
                  <h3>{item.node}</h3>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="impact-stats">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">55%</div>
              <div className="stat-label">Goes to Mountain Farmers</div>
              <p>Compared to 20-30% in conventional supply chains</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Farmer Families Supported</div>
              <p>Direct partnerships in 5+ Himalayan villages</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">3x</div>
              <div className="stat-label">Income Increase</div>
              <p>Average farmer income compared to conventional farming</p>
            </div>

            <div className="stat-card">
              <div className="stat-number">60%</div>
              <div className="stat-label">Women Entrepreneurs</div>
              <p>Women-led enterprises in our network</p>
            </div>
          </div>
        </div>

        <div className="farmer-stories">
          <h2>Farmer Stories</h2>

          <div className="story-card">
            <div className="story-image">
              <img src={img_10001} alt="Nirmala Devi" />
            </div>
            <div className="story-content">
              <h3>Nirmala Devi - Ghee Maker</h3>
              <p className="story-location">Bhangeli Village, Gangotri Valley</p>
              <p>
                "Five years ago, I started making ghee using my grandmother's bilona method.
                Through Orangutan Organics, I now employ three other women, my children study in good schools,
                and I've become a source of pride in my community. The fair prices mean we can live with
                dignity in our ancestral village."
              </p>
            </div>
          </div>

          <div className="story-card">
            <div className="story-image">
              <img src={img_10002} alt="Bhangeli Cooperative" />
            </div>
            <div className="story-content">
              <h3>Orang Utan Farmers Consortium</h3>
              <p className="story-location">25 Farming Families</p>
              <p>
                Our cooperative grows Himalayan rajma and red rice. Partnership with OUO has brought
                40% higher income, young farmers are returning from cities, and we've built a community
                center and library. Traditional farming is now economically viable again.
              </p>
            </div>
          </div>
        </div>

        <div className="commitments">
          <h2>Our Commitments</h2>
          <div className="commitments-grid">
            <div className="commitment-card">
              <div className="commitment-icon">🤝</div>
              <h3>Fair Pricing</h3>
              <p>Farmers receive 55% of final product price - double the industry standard</p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon">💰</div>
              <h3>Advance Payments</h3>
              <p>Pre-harvest payments so farmers aren't forced to borrow from moneylenders</p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon">📜</div>
              <h3>Long-term Contracts</h3>
              <p>Multi-year agreements provide income security and planning capability</p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon">🎓</div>
              <h3>Skill Development</h3>
              <p>Training in organic certification, food safety, and value-added processing</p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon">♀️</div>
              <h3>Women's Empowerment</h3>
              <p>60% of our partners are women, many primary decision-makers</p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon">🌱</div>
              <h3>Environmental Care</h3>
              <p>Organic farming practices preserve mountain ecosystems for future generations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerImpact;