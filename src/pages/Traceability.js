import React from 'react';
import { BATCH, STEPS } from '../utils/traceabilityData';
import './Traceability.css';

function Traceability() {
  return (
    <div className="traceability-page">
      <div className="traceability-container">
        <div className="page-header">
          <h1>Batch Traceability</h1>
          <p>Complete transparency from farm to your kitchen</p>
          <p 
  style={{
    backgroundColor: "#f9a825", // A vibrant yellow to draw attention
    borderRadius: "50px", 
    color: "white", 
    padding: "20px", 
    fontSize: "3vh", 
    textAlign: "center", 
    fontWeight: "bold",
    letterSpacing: "1px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "2px solid #f57f17", // A border to make it pop more
    width: "auto",
    margin: "20px auto",
    maxWidth: "90%",
  }}
>
  More Traceability Data Coming Soon! <br />
  <span style={{ fontSize: "2vh", fontStyle: "italic" }}>Working in Progress...</span>
</p>
        </div>

        <div className="batch-info">
          <div className="batch-header">
            <h2>{BATCH.product}</h2>
            <span className="batch-id">Batch ID: {BATCH.batchId}</span>
          </div>

          <div className="batch-details">
            <div className="detail-card">
              <h3>Origin</h3>
              <p><strong>Village:</strong> {BATCH.origin.village}</p>
              <p><strong>Valley:</strong> {BATCH.origin.valley}</p>
              <p><strong>District:</strong> {BATCH.origin.district}</p>
              <p><strong>Altitude:</strong> {BATCH.altitudeM}m</p>
            </div>

            <div className="detail-card">
              <h3>Maker</h3>
              <p><strong>Name:</strong> {BATCH.maker.name}</p>
              <p><strong>Role:</strong> {BATCH.maker.role}</p>
            </div>

            <div className="detail-card">
              <h3>Herd Information</h3>
              <p><strong>Breed:</strong> {BATCH.herd.breed}</p>
              <p><strong>Yield:</strong> {BATCH.herd.yieldMinL} - {BATCH.herd.yieldMaxL}L</p>
              <p><em>{BATCH.herd.note}</em></p>
            </div>
          </div>
        </div>

        <div className="production-timeline">
          <h2>Production Process</h2>
          <div className="timeline">
            {STEPS.map((step, index) => (
              <div key={step.id} className="timeline-step">
                <div className="step-marker">
                  <div className="step-number">{index + 1}</div>
                </div>
                <div className="step-content">
                  <div className="step-header">
                    <span className="step-code">{step.code}</span>
                    <span className="step-date">{step.date}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.details}</p>
                  <div className="step-checks">
                    <strong>Quality Checks:</strong>
                    <ul>
                      {step.checks.map((check, i) => (
                        <li key={i}>✓ {check}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="step-by">By: {step.by}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="process-specs">
          <h3>Production Specifications</h3>
          <p><strong>Method:</strong> {BATCH.specs.method}</p>
          <p><strong>Fermentation:</strong> {BATCH.specs.fermentationAcidity}</p>
          <p><strong>GR Ratio:</strong> {BATCH.specs.grRatio}</p>
        </div>
      </div>
    </div>
  );
}

export default Traceability;