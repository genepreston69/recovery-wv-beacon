
import React from 'react';

export const FacilityTable = () => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #4c51bf, #667eea)', color: 'white' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Facility</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>Total Clients</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>≤7 Days</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>≤30 Days</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>{'>'}30 Days</th>
            <th style={{ padding: '1rem', textAlign: 'center' }}>{'>'}90 Days</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '1rem', fontWeight: 600 }}>RPB</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>962</td>
            <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf' }}>107 (11.1%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>290 (30.1%)</td>
            <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf', fontWeight: 600 }}>672 (69.9%)</td>
            <td style={{ padding: '1rem', textAlign: 'center', color: '#4c51bf' }}>379 (39.4%)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#faf5ff' }}>
            <td style={{ padding: '1rem', fontWeight: 600 }}>RPC</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>2,141</td>
            <td style={{ padding: '1rem', textAlign: 'center', color: '#9f7aea' }}>681 (31.8%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,079 (50.4%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,062 (49.6%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>728 (34.0%)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '1rem', fontWeight: 600 }}>RPH</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>2,551</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>632 (24.8%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,236 (48.5%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,315 (51.5%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>560 (22.0%)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '1rem', fontWeight: 600 }}>RPP</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,174</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>256 (21.8%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>516 (44.0%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>658 (56.0%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>322 (27.4%)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '1rem', fontWeight: 600 }}>Point Apartments</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>127</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>25 (19.7%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>53 (41.7%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>74 (58.3%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>42 (33.1%)</td>
          </tr>
          <tr style={{ background: '#f0f4f8', fontWeight: 700 }}>
            <td style={{ padding: '1rem' }}>TOTAL</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>6,955</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>1,701 (24.5%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>3,174 (45.6%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>3,781 (54.4%)</td>
            <td style={{ padding: '1rem', textAlign: 'center' }}>2,031 (29.2%)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
