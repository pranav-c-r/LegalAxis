// CommentThread.jsx
import { useState } from 'react';

const CommentThread = ({ comments, documentId }) => {
  const [newComment, setNewComment] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [replyText, setReplyText] = useState({});

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    console.log('Adding comment:', newComment, 'to document:', documentId);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText[commentId] || replyText[commentId].trim() === '') return;
    console.log('Adding reply:', replyText[commentId], 'to comment:', commentId);
    setReplyText({ ...replyText, [commentId]: '' });
  };

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-iconbg flex items-center justify-center text-page font-bold text-sm sm:text-base lg:text-lg shadow-lg flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              className="w-full p-3 sm:p-4 bg-boxbg border border-iconbg/20 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-iconbg focus:border-transparent text-textcolor placeholder-textcolor/50 resize-none text-sm sm:text-base"
              placeholder="Add a comment..."
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:justify-end gap-2">
              <button 
                className="bg-iconbg text-page px-4 py-2 rounded-lg hover:bg-iconbg/90 transition-all duration-300 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={handleAddComment}
                disabled={newComment.trim() === ''}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {comments.map((comment, index) => (
        <div 
          key={comment.id} 
          className="border-b border-white/10 pb-6 last:border-0 group animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#597081] to-[#36494E] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {comment.author.initials}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="font-semibold text-white text-lg">{comment.author.name}</span>
                  <span className="text-sm text-gray-400 ml-3">{comment.timestamp}</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
              <div className="text-gray-200 mb-4 bg-white/5 rounded-xl p-4 border border-white/5">
                {comment.text}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <button 
                  className="text-gray-400 hover:text-[#A9CEF4] flex items-center transition-colors duration-300"
                  onClick={() => toggleReplies(comment.id)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                  </svg>
                  {comment.replies.length > 0 ? `Replies (${comment.replies.length})` : 'Reply'}
                </button>
              </div>

              {showReplies[comment.id] && (
                <div className="mt-6 pl-6 border-l-2 border-[#A9CEF4]/30">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mb-4 last:mb-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#597081] to-[#36494E] flex items-center justify-center text-white text-xs font-bold">
                          {reply.author.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium text-white text-sm">{reply.author.name}</span>
                              <span className="text-xs text-gray-400 ml-2">{reply.timestamp}</span>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm bg-white/5 rounded-lg p-3">
                            {reply.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9CEF4] to-[#7EA0B7] flex items-center justify-center text-white text-xs font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#A9CEF4] focus:border-transparent text-white placeholder-gray-400 resize-none"
                          placeholder="Add a reply..."
                          rows="2"
                          value={replyText[comment.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                          <button 
                            className="btn-primary text-sm py-2 px-4"
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText[comment.id] || replyText[comment.id].trim() === ''}
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentThread;