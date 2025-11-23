import React from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import ProjectionsChart from '../components/dashboard/ProjectionsChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RevenueByLocation from '../components/dashboard/RevenueByLocation';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import TotalSales from '../components/dashboard/TotalSales';
import { useSearch } from '../context/SearchContext';
import { X } from 'lucide-react';

const DashboardPage = ({ refreshKey = 0, isMobile = false }) => {
  const { shouldShowCard, hasActiveSearch, searchQuery, clearSearch, updateSearch } = useSearch();

  // Use global CSS variables instead of theme context
  const surfaceBg = 'var(--theme-bg)';
  const cardBg = 'var(--theme-card-bg)';
  const statsCardBg = 'var(--theme-surface)';
  const borderColor = 'var(--theme-border)';
  const textColor = 'var(--theme-text)';

  // Check if any cards should be shown
  const hasVisibleCards = shouldShowCard('Customers') || shouldShowCard('Orders') || 
                         shouldShowCard('Revenue') || shouldShowCard('Growth') || 
                         shouldShowCard('Projections vs Actuals') || shouldShowCard('Revenue Chart') || 
                         shouldShowCard('Revenue by Location') || shouldShowCard('Top Selling Products') || 
                         shouldShowCard('Total Sales');

  return (
    <div 
      className="w-full max-w-none space-y-4 sm:space-y-6 lg:space-y-8" 
      key={refreshKey}
      style={{ backgroundColor: surfaceBg, minHeight: '100vh' }}
    >
      {/* Page Title with search indicator */}
      <div className="flex justify-between items-center">
        <h1
          className="text-lg sm:text-xl lg:text-2xl font-semibold"
          style={{ color: textColor }}
        >
          eCommerce
        </h1>
        {hasActiveSearch && (
          <div className="flex items-center space-x-2">
            <span 
              className="text-sm px-3 py-1 rounded-full flex items-center space-x-2"
              style={{ 
                color: 'var(--theme-text)',
                backgroundColor: 'var(--theme-hover)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <span>Searching: "{searchQuery}"</span>
              <button
                onClick={clearSearch}
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'inherit' }}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards and Projections Chart */}
      {(shouldShowCard('Customers') || shouldShowCard('Orders') || shouldShowCard('Revenue') || shouldShowCard('Growth') || shouldShowCard('Projections vs Actuals')) && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
          {/* Stats Cards */}
          {(shouldShowCard('Customers') || shouldShowCard('Orders') || shouldShowCard('Revenue') || shouldShowCard('Growth')) && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full order-1 min-h-[200px] sm:min-h-[252px]"
              style={{ 
                background: statsCardBg,
                border: 'none',
                boxShadow: 'var(--theme-shadow)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full">
                <StatsCards key={`stats-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

          {/* Projections Chart */}
          {shouldShowCard('Projections vs Actuals') && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full order-2 min-h-[200px] sm:min-h-[252px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: 'var(--theme-shadow)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full">
                <ProjectionsChart key={`projections-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revenue Chart and Revenue by Location */}
      {(shouldShowCard('Revenue Chart') || shouldShowCard('Revenue by Location') || shouldShowCard('Revenue')) && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
          {(shouldShowCard('Revenue Chart') || shouldShowCard('Revenue')) && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full min-w-0 order-1 min-h-[200px] sm:min-h-[318px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: 'var(--theme-shadow)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="w-full h-full min-w-[320px] overflow-x-auto">
                <RevenueChart key={`revenue-chart-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

          {shouldShowCard('Revenue by Location') && (
            <div className="flex justify-center xl:justify-start order-2">
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 min-h-[200px] sm:min-h-[318px] w-full"
                style={{ 
                  background: cardBg, 
                  border: `1px solid ${borderColor}`,
                  boxShadow: 'var(--theme-shadow)',
                  transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                  opacity: hasActiveSearch ? 0.98 : 1
                }}
              >
                <div className="w-full h-full">
                  <RevenueByLocation key={`revenue-location-${refreshKey}`} isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Selling Products and Total Sales */}
      {(shouldShowCard('Top Selling Products') || shouldShowCard('Total Sales')) && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
          {shouldShowCard('Top Selling Products') && (
            <div
              className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 w-full min-w-0 order-1 min-h-[200px] sm:min-h-[264px]"
              style={{ 
                background: cardBg, 
                border: `1px solid ${borderColor}`,
                boxShadow: 'var(--theme-shadow)',
                transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                opacity: hasActiveSearch ? 0.98 : 1
              }}
            >
              <div className="min-w-[300px] overflow-x-auto">
                <TopSellingProducts key={`top-products-${refreshKey}`} isMobile={isMobile} />
              </div>
            </div>
          )}

          {shouldShowCard('Total Sales') && (
            <div className="flex justify-center xl:justify-start order-2">
              <div
                className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 min-h-[200px] sm:min-h-[264px] w-full"
                style={{ 
                  background: cardBg, 
                  border: `1px solid ${borderColor}`,
                  boxShadow: 'var(--theme-shadow)',
                  transform: hasActiveSearch ? 'scale(1.01)' : 'scale(1)',
                  opacity: hasActiveSearch ? 0.98 : 1
                }}
              >
                <div className="w-full h-full">
                  <TotalSales key={`total-sales-${refreshKey}`} isMobile={isMobile} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results Message */}
      {hasActiveSearch && !hasVisibleCards && (
        <div 
          className="text-center py-16 rounded-xl"
          style={{ 
            backgroundColor: 'var(--theme-hover)',
            border: '1px dashed var(--theme-border)'
          }}
        >
          <div className="max-w-md mx-auto">
            <div 
              className="text-4xl mb-4"
              style={{ opacity: 0.5 }}
            >
              🔍
            </div>
            <div 
              className="text-xl font-medium mb-3"
              style={{ color: 'var(--theme-text)' }}
            >
              No cards found for "{searchQuery}"
            </div>
            <div 
              className="text-sm mb-6"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Try searching for one of these terms:
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs mb-6">
              {['Revenue', 'Sales', 'Products', 'Customers', 'Orders', 'Growth', 'Projections', 'Location'].map(term => (
                <button 
                  key={term}
                  className="px-3 py-2 rounded-full cursor-pointer transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--theme-hover)',
                    color: 'var(--theme-text)',
                    border: '1px solid var(--theme-border)'
                  }}
                  onClick={() => updateSearch(term)}
                >
                  {term}
                </button>
              ))}
            </div>
            <button
              onClick={clearSearch}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--theme-hover)',
                color: 'var(--theme-text)',
                border: '1px solid var(--theme-border)'
              }}
            >
              Show all cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;