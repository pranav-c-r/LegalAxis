import React from 'react';
import PropTypes from 'prop-types';

const AgentCard = ({ title, icon, description, actionText, onAction, metrics }) => {
  return (
    <div className="card overflow-hidden border border-[#7EA0B7]/20 bg-[#36494E]/80 hover:border-[#7EA0B7]/40 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {icon && (
              <div className="w-10 h-10 rounded-full bg-[#A9CEF4]/20 flex items-center justify-center text-[#A9CEF4] mr-3">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-semibold text-[#A9CEF4]">{title}</h3>
          </div>
          {actionText && (
            <button 
              onClick={onAction} 
              className="btn-primary text-sm px-3 py-1 bg-[#A9CEF4]/10 hover:bg-[#A9CEF4]/20 text-[#A9CEF4] rounded-lg transition-all"
            >
              {actionText}
            </button>
          )}
        </div>
        
        <p className="text-[#7EA0B7] mb-4">{description}</p>
        
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-[#36494E] p-3 rounded-lg border border-[#7EA0B7]/10">
                <p className="text-xs text-[#7EA0B7] mb-1">{metric.label}</p>
                <div className="flex items-end">
                  <span className="text-xl font-semibold text-[#A9CEF4]">{metric.value}</span>
                  {metric.change && (
                    <span className={`text-xs ml-2 ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
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