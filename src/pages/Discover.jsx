import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, UserCheck, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// For demonstration; replace with real API/data in production
const dummySuggestedUsers = [
  { id: 1, name: 'Aarav Sharma', username: 'aarav_sh', avatar: null, isFollowing: false },
  { id: 2, name: 'Priya Patel', username: 'priya_p', avatar: null, isFollowing: true },
  { id: 3, name: 'Rahul Verma', username: 'rahulv_22', avatar: null, isFollowing: false },
  { id: 4, name: 'Sneha Gupta', username: 'sneha_g', avatar: null, isFollowing: false },
  { id: 5, name: 'Vikram Singh', username: 'vikram_s', avatar: null, isFollowing: true },
];

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple client-side debounce (300–500 ms is typical for search)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Simulate search (replace with real API call)
  const performSearch = useCallback(async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    // Artificial delay to mimic network
    await new Promise((resolve) => setTimeout(resolve, 600));

    const filtered = dummySuggestedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setLoading(false);
  }, []);

  // Trigger search when debounced value changes
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const toggleFollow = (userId) => {
    setSearchResults((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );

    // In real app → send follow/unfollow request to backend here
    console.log(`Toggled follow for user ${userId}`);
  };

  const UserCard = ({ user }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-medium text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/profile/${user.id || user.username}`)}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
          title="View profile"
        >
          <Search size={20} />
        </button>

        <button
          onClick={() => toggleFollow(user.id)}
          className={`px-5 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
            user.isFollowing
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {user.isFollowing ? (
            <>
              <UserCheck size={16} /> Following
            </>
          ) : (
            <>
              <UserPlus size={16} /> Follow
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Discover</h1>

        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for people..."
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-900 placeholder-gray-400 transition"
          />
        </div>

        {/* Results / Suggestions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {debouncedQuery ? (
            <>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Results for "{debouncedQuery}"
                </h2>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="py-12 text-center text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center text-gray-500">
                    <Search size={48} className="mx-auto mb-4 opacity-40" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="mt-2">
                      Try adjusting your search or check the spelling.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Suggested People
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {dummySuggestedUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;