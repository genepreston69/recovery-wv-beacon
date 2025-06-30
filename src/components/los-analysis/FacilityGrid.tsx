
import React from 'react';

export const FacilityGrid = () => {
  return (
    <div className="facility-grid">
      <div className="facility-card best">
        <h3 style={{ color: '#4c51bf' }}>🏆 RPB - Best Performance</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>962 clients served</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Average LOS</span>
            <strong>106.8 days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Early Departure (≤7 days)</span>
            <strong style={{ color: '#4c51bf' }}>11.1%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>30-Day Retention</span>
            <strong style={{ color: '#4c51bf' }}>69.9%</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '69.9%' }}></div>
        </div>
      </div>
      
      <div className="facility-card concern">
        <h3 style={{ color: '#9f7aea' }}>👩 RPC - Women's Facility</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>2,141 clients served</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Average LOS</span>
            <strong>103.1 days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Early Departure (≤7 days)</span>
            <strong style={{ color: '#9f7aea' }}>31.8%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>30-Day Retention</span>
            <strong style={{ color: '#9f7aea' }}>49.6%</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '49.6%', background: 'linear-gradient(90deg, #9f7aea, #b794f4)' }}></div>
        </div>
      </div>
      
      <div className="facility-card">
        <h3 style={{ color: '#667eea' }}>📍 RPH - Largest Facility</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>2,551 clients served</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Average LOS</span>
            <strong>62.1 days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Early Departure (≤7 days)</span>
            <strong>24.8%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>30-Day Retention</span>
            <strong>51.5%</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '51.5%' }}></div>
        </div>
      </div>
      
      <div className="facility-card">
        <h3 style={{ color: '#667eea' }}>🏢 RPP - Mid-Size Facility</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>1,174 clients served</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Average LOS</span>
            <strong>77.1 days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Early Departure (≤7 days)</span>
            <strong>21.8%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>30-Day Retention</span>
            <strong>56.0%</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '56.0%' }}></div>
        </div>
      </div>
      
      <div className="facility-card">
        <h3 style={{ color: '#667eea' }}>🏠 The Point Apartments</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>127 clients served</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Average LOS</span>
            <strong>95.2 days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Early Departure (≤7 days)</span>
            <strong>19.7%</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>30-Day Retention</span>
            <strong>58.3%</strong>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '58.3%' }}></div>
        </div>
      </div>
    </div>
  );
};
