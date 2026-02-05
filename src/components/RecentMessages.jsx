import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dummyRecentMessagesData } from '../assets/assets';

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMessages = async () => {
      try {
        // In a real application, replace with actual API call:
        // const response = await fetch('/api/messages/recent');
        // const data = await response.json();

        // For development/demo using static dummy data
        setMessages(dummyRecentMessagesData);
      } catch (error) {
        console.error('Failed to load recent messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentMessages();
  }, []);

  return (
    <div className="bg-white max-w-xs mt-4 p-4 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Messages</h3>

      {isLoading ? (
        <div className="text-center text-gray-500 py-4 text-sm">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 py-6 text-sm">
          No recent messages
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-3">
            {messages.map((message) => (
              <li key={message.id || message.conversationId}>
                <Link
                  to={`/messages/${message.conversationId || message.id}`}
                  className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={message.sender?.avatar || message.user?.profile_picture}
                      alt={`${message.sender?.name || 'User'} avatar`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  </div>

                  {/* Message preview */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {message.sender?.name || message.user?.full_name || 'Unknown'}
                      </p>
                      <span className="text-xs text-gray-500">
                        {message.timestamp
                          ? new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {message.lastMessage || message.preview || 'No message content'}
                    </p>
                  </div>

                  {/* Unread indicator (optional) */}
                  {message.unreadCount > 0 && (
                    <div className="flex-shrink-0 bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {message.unreadCount}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div> 
      )}
    </div>
  );
};

export default RecentMessages;