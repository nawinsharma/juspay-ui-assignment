import React, { useContext, useRef } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import darkGraph from '../../assets/dark-graph.svg';
import lightGraph from '../../assets/light-graph.svg';

const RevenueChart = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const previousWeek = [51, 50, 57, 68, 60, 54, 34];
  const currentWeek = [44, 55, 62, 37, 66, 58, 58];
  
  // Calculate totals for legend
  const currentWeekTotal = currentWeek.reduce((sum, val) => sum + val, 0) * 1000;
  const previousWeekTotal = previousWeek.reduce((sum, val) => sum + val, 0) * 1000;
  
  // Format numbers with commas
  const formatCurrency = (num) => {
    return `$${num.toLocaleString()}`;
  };
  
  // Consistent theme colors
  const theme = {
    text: darkMode ? '#ffffff' : '#1f2937',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    border: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    gridLine: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
    currentWeekColor: darkMode ? 'var(--Primary-Brand, #C6C7F8)' : '#1F2937',
    previousWeekColor: '#A8C5DA',
    partition: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(28,28,28,0.2)'
  };

  return (
    <div 
      className="w-full h-full" 
      style={{ 
        minWidth: isMobile ? '300px' : '600px', 
        position: 'relative',
        padding: isMobile ? '16px' : '20px',
        background: darkMode ? '#282828' : 'var(--Primary-Light, #F7F9FB)',
        borderRadius: '8px'
      }} 
      ref={chartRef}
    >
      {/* Header Section */}
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-3' : 'space-x-4'} mb-6`}>
        <h3 
          className={`font-semibold ${isMobile ? 'text-lg self-start' : 'text-xl'}`}
          style={{ color: theme.text, margin: 0 }}
        >
          Revenue
        </h3>
        
        {/* Partition Line - Only show on desktop */}
        {!isMobile && (
          <div 
            style={{ 
              width: '1px', 
              height: '20px', 
              backgroundColor: theme.partition,
              flexShrink: 0
            }} 
          />
        )}
        
        {/* Legends */}
        <div className={`flex items-center ${isMobile ? 'self-start space-x-6' : 'space-x-6'}`}>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: theme.currentWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className="text-sm"
              style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: 400 }}
            >
              Current Week <span style={{ fontWeight: 700 }}>{formatCurrency(currentWeekTotal)}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: theme.previousWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className="text-sm"
              style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: 400 }}
            >
              Previous Week <span style={{ fontWeight: 700 }}>{formatCurrency(previousWeekTotal)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={`flex ${isMobile ? 'h-[220px]' : 'h-[260px]'}`}>
        {/* Y-axis labels - Fixed position */}
        <div 
          className="flex flex-col justify-between items-end flex-shrink-0"
          style={{ 
            paddingRight: isMobile ? 12 : 16,
            paddingTop: isMobile ? 8 : 12,
            paddingBottom: isMobile ? 20 : 24,
            height: '100%'
          }}
        >
          {['80M', '60M', '40M', '20M', '0'].map(v => (
            <span 
              key={v} 
              className="text-xs"
              style={{ color: theme.textSecondary, fontWeight: 500 }}
            >
              {v}
            </span>
          ))}
        </div>

        {/* Chart Container */}
        <div 
          className="w-full flex flex-col"
        >
          {/* Chart container */}
          <div
            className="relative flex-1"
            style={{
              borderBottom: `1px solid ${theme.border}`,
              paddingTop: isMobile ? 8 : 12,
              paddingBottom: isMobile ? 4 : 6,
              boxSizing: 'border-box',
              width: '100%',
              minHeight: 0
            }}
          >
            {/* Grid lines */}
            {['20%', '40%', '60%', '80%'].map((top, idx) => (
              <div 
                key={idx} 
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  right: 0, 
                  top, 
                  height: 1, 
                  backgroundColor: theme.gridLine 
                }} 
              />
            ))}

            {/* SVG Chart */}
            <div 
              className="w-full h-full relative" 
              style={{ 
                minHeight: '100px'
              }}
            >
              <img
                src={darkMode ? darkGraph : lightGraph}
                alt="Revenue Graph"
                className="w-full h-full"
                style={{
                  objectFit: 'fill'
                }}
              />
            </div>
          </div>

          {/* X-axis labels - Always visible, positioned below chart */}
          <div 
            className="flex justify-between"
            style={{ 
              paddingLeft: 2, 
              paddingRight: 2,
              paddingTop: isMobile ? 4 : 6,
              height: isMobile ? '16px' : '20px',
              flexShrink: 0
            }}
          >
            {labels.map((label) => (
              <span 
                key={label} 
                className="text-xs"
                style={{ 
                  color: theme.textSecondary, 
                  fontWeight: 500,
                  flex: '1',
                  textAlign: 'center'
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;