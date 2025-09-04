import React from 'react';
import PropTypes from 'prop-types';

const AgentCard = ({ title, icon, description, actionText, onAction, metrics }) => {
  return (
    <div className="card overflow-hidden border border-[#A1E8AF]/10 bg-[#1B1725]/80 hover:border-[#A1E8AF]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#A1E8AF]/5 backdrop-blur-md rounded-xl">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {icon && (
              <div className="w-10 h-10 rounded-full bg-[#3A7CA5]/20 flex items-center justify-center text-[#A1E8AF] mr-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#3A7CA5]/30">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-semibold bg-gradient-to-r from-[#A1E8AF] to-[#3A7CA5] bg-clip-text text-transparent hover:from-[#3A7CA5] hover:to-[#A1E8AF] transition-all duration-500">{title}</h3>
          </div>
          {actionText && (
            <button 
              onClick={onAction} 
              className="btn-primary text-sm px-4 py-1.5 bg-[#3A7CA5]/20 hover:bg-[#3A7CA5]/30 text-[#A1E8AF] hover:text-[#FFF07C] rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-[#A1E8AF]/10 border border-[#A1E8AF]/10 hover:border-[#A1E8AF]/30"
            >
              {actionText}
            </button>
          )}
        </div>
        
        <p className="text-[#A1E8AF]/70 mb-4 font-light">{description}</p>
        
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#1B1725] p-3 rounded-lg border border-[#A1E8AF]/10 hover:border-[#A1E8AF]/30 transition-all duration-300 hover:shadow-md hover:shadow-[#A1E8AF]/5 group">
                <p className="text-xs text-[#A1E8AF]/60 mb-1 group-hover:text-[#A1E8AF]/80 transition-all duration-300">{metric.label}</p>
                <div className="flex items-end">
                  <span className="text-xl font-semibold text-[#FFF07C] group-hover:scale-105 transform transition-all duration-300 inline-block">{metric.value}</span>
                  {metric.change && (
                    <span className={`text-xs ml-2 ${metric.change > 0 ? 'text-[#A1E8AF]' : 'text-[#FFF07C]'} font-medium transition-all duration-300 group-hover:scale-105 inline-block`}>
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