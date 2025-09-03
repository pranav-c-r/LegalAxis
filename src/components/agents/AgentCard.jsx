const AgentCard = ({ title, description, icon, color, metrics, path }) => {
  return (
    <div className="card hover:border-l-4 hover:border-l-primary transition-all duration-200">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg mr-4 ${color}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-quaternary mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          {metrics && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
                  <p className="text-xs text-gray-500">{metric.label}</p>
                  <p className="text-lg font-semibold text-gray-800">{metric.value}</p>
                </div>
              ))}
            </div>
          )}
          
          <a 
            href={path} 
            className="text-sm font-medium text-quaternary hover:text-quaternary/80 inline-flex items-center"
          >
            Open Agent
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;