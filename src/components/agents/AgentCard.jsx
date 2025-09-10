import React from 'react';
import PropTypes from 'prop-types';

const AgentCard = ({ title, icon, description, actionText, onAction, metrics }) => {
  return (
    <div className="card overflow-hidden border border-[#A1E8AF]/10 bg-[#1B1725]/80 hover:border-[#A1E8AF]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#A1E8AF]/5 backdrop-blur-md rounded-xl group min-h-[320px] lg:min-h-[340px] xl:min-h-[320px] 2xl:min-h-[340px] flex flex-col">
      <div className="p-3 sm:p-4 lg:p-5 xl:p-4 2xl:p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
          <div className="flex items-start min-w-0 flex-1 gap-2 sm:gap-3">
            {icon && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-9 lg:h-9 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 rounded-full bg-[#3A7CA5]/20 flex items-center justify-center text-[#A1E8AF] transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#3A7CA5]/30 flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="agent-card-title text-sm sm:text-base lg:text-base xl:text-sm 2xl:text-base font-semibold bg-gradient-to-r from-[#A1E8AF] to-[#3A7CA5] bg-clip-text text-transparent hover:from-[#3A7CA5] hover:to-[#A1E8AF] transition-all duration-500 leading-tight break-words hyphens-auto word-break-break-word">
                {title}
              </h3>
            </div>
          </div>
          {actionText && (
            <button 
              onClick={onAction} 
              className="btn-primary text-xs px-2 sm:px-3 lg:px-3 xl:px-2 2xl:px-3 py-1 sm:py-1.5 bg-[#3A7CA5]/20 hover:bg-[#3A7CA5]/30 text-[#A1E8AF] hover:text-[#FFF07C] rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-[#A1E8AF]/10 border border-[#A1E8AF]/10 hover:border-[#A1E8AF]/30 flex-shrink-0 whitespace-nowrap"
            >
              {actionText}
            </button>
          )}
        </div>
        
        <p className="agent-card-description text-[#A1E8AF]/70 mb-3 sm:mb-4 font-light text-xs sm:text-sm lg:text-sm xl:text-xs 2xl:text-sm leading-relaxed flex-1 break-words word-break-break-word hyphens-auto">
          {description}
        </p>
        
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-2 xl:gap-2 2xl:gap-3 mt-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#1B1725] p-2 sm:p-3 lg:p-2 xl:p-2 2xl:p-3 rounded-lg border border-[#A1E8AF]/10 hover:border-[#A1E8AF]/30 transition-all duration-300 hover:shadow-md hover:shadow-[#A1E8AF]/5 group/metric">
                <p className="text-xs lg:text-xs xl:text-xs 2xl:text-xs text-[#A1E8AF]/60 mb-1 group-hover/metric:text-[#A1E8AF]/80 transition-all duration-300 break-words leading-tight">
                  {metric.label}
                </p>
                <div className="flex items-end flex-wrap gap-1">
                  <span className="text-base sm:text-lg lg:text-base xl:text-sm 2xl:text-base font-semibold text-[#FFF07C] group-hover/metric:scale-105 transform transition-all duration-300 inline-block leading-none">
                    {metric.value}
                  </span>
                  {metric.change && (
                    <span className={`text-xs ml-1 ${metric.change > 0 ? 'text-[#A1E8AF]' : 'text-[#FFF07C]'} font-medium transition-all duration-300 group-hover/metric:scale-105 inline-block leading-none`}>
                      {metric.change > 0 ? `+${metric.change}%` : `${metric.change}%`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

AgentCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      change: PropTypes.number
    })
  )
};

export default AgentCard;