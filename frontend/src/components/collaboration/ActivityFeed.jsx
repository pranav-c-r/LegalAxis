import React from 'react';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const iconClasses = "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0";
    
    switch (type) {
      case 'edit':
        return (
          <div className={`${iconClasses} bg-[#f3cf1a] text-[#1a1a1a]`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className={`${iconClasses} bg-[#f3cf1a] text-[#1a1a1a]`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
        );
      case 'share':
        return (
          <div className={`${iconClasses} bg-[#f3cf1a] text-[#1a1a1a]`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
          </div>
        );
      case 'approval':
        return (
          <div className={`${iconClasses} bg-green-500 text-white`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'rejection':
        return (
          <div className={`${iconClasses} bg-red-500 text-white`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
      case 'upload':
        return (
          <div className={`${iconClasses} bg-[#f3cf1a] text-[#1a1a1a]`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${iconClasses} bg-[#343535] text-[#f3cf1a]`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        );
    }
  };

  const formatTime = (timestamp) => {
    return timestamp;
  };

  return (
    <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] rounded-2xl p-5 sm:p-6 ring-1 ring-white/5 shadow-lg">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-5 sm:mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
        Activity Feed
      </h3>
      
      {activities.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="flex items-start p-4 sm:p-5 rounded-xl bg-[#2a2a2a] ring-1 ring-white/5 hover:ring-[#f3cf1a]/20 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mr-4 flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm sm:text-base text-white">
                      <span className="font-semibold text-[#f3cf1a]">{activity.user}</span> {activity.action}
                    </p>
                    {activity.details && (
                      <p className="text-sm text-[#e0e0e0] mt-3 bg-[#343535] rounded-lg p-3 ring-1 ring-white/5 group-hover:ring-[#f3cf1a]/20 transition-all duration-300">
                        {activity.details}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[#a0a0a0] bg-[#343535] px-2.5 py-1.5 rounded-full flex-shrink-0">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                {activity.documentName && (
                  <div className="mt-3 flex items-center text-xs text-[#a0a0a0]">
                    <svg className="w-4 h-4 mr-2 text-[#f3cf1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    {activity.documentName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#2a2a2a] rounded-xl ring-1 ring-dashed ring-white/10">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#343535] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-[#a0a0a0]">No recent activity to display.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
