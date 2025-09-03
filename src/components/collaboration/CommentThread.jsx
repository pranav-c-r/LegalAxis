import { useState } from 'react';

const CommentThread = ({ comments, documentId }) => {
  const [newComment, setNewComment] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [replyText, setReplyText] = useState({});

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    // In a real app, this would call an API to add the comment
    console.log('Adding comment:', newComment, 'to document:', documentId);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText[commentId] || replyText[commentId].trim() === '') return;
    // In a real app, this would call an API to add the reply
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
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
              placeholder="Add a comment..."
              rows="2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button 
                className="btn-primary py-1.5 px-3 text-sm"
                onClick={handleAddComment}
                disabled={newComment.trim() === ''}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {comment.author.initials}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="font-medium text-gray-900">{comment.author.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
              <div className="text-gray-700 mb-2">{comment.text}</div>
              <div className="flex items-center space-x-4 text-xs">
                <button 
                  className="text-gray-500 hover:text-quaternary flex items-center"
                  onClick={() => toggleReplies(comment.id)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                  </svg>
                  {comment.replies.length > 0 ? `Replies (${comment.replies.length})` : 'Reply'}
                </button>
              </div>

              {showReplies[comment.id] && (
                <div className="mt-3 pl-4 border-l-2 border-gray-100">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mb-3 last:mb-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                          {reply.author.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <span className="font-medium text-gray-900 text-sm">{reply.author.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{reply.timestamp}</span>
                            </div>
                          </div>
                          <div className="text-gray-700 text-sm">{reply.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-medium">
                        JD
                      </div>
                      <div className="flex-1">
                        <textarea
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-tertiary focus:border-tertiary"
                          placeholder="Add a reply..."
                          rows="1"
                          value={replyText[comment.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                        ></textarea>
                        <div className="mt-1 flex justify-end">
                          <button 
                            className="bg-quaternary text-white py-1 px-2 rounded text-xs font-medium hover:bg-quaternary/90"
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText[comment.id] || replyText[comment.id].trim() === ''}
                          >
                            Reply
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