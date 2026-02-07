import React from 'react';
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from '../assets/assets';

const Connections = () => {
  const navigate = useNavigate();

  const dataArray = [
    { label: 'Followers',          value: followers,         icon: Users,         color: 'bg-blue-100 text-blue-700' },
    { label: 'Following',          value: following,         icon: UserCheck,     color: 'bg-green-100 text-green-700' },
    { label: 'Pending Connections', value: pendingConnections, icon: UserRoundPen,  color: 'bg-amber-100 text-amber-700' },
    { label: 'Connections',        value: connections,       icon: UserPlus,      color: 'bg-purple-100 text-purple-700' },
  ];

  // Example user card component (reusable)
  const UserCard = ({ user }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
              {user.name?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-500">@{user.username || 'user'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(`/profile/${user.id || user.username}`)}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
          title="View profile"
        >
          <MessageSquare size={20} />
        </button>
        <button className="px-4 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
          Message
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Header / Stats */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Connections</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {dataArray.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-5 shadow-sm ${item.color} flex flex-col items-center justify-center text-center`}
              >
                <Icon size={28} className="mb-2" />
                <div className="text-2xl font-bold">{item.value?.length || 0}</div>
                <div className="text-sm font-medium">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content - Tabs + List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Simple tabs (you can make them functional later) */}
          <div className="border-b border-gray-200 px-6 pt-4">
            <nav className="flex gap-8">
              <button className="pb-4 border-b-2 border-indigo-600 font-medium text-indigo-700">
                All Connections
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900 transition-colors">
                Followers
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900 transition-colors">
                Following
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900 transition-colors">
                Pending
              </button>
            </nav>
          </div>

          {/* List */}
          <div className="p-6">
            {connections && connections.length > 0 ? (
              <div className="space-y-4">
                {connections.map((user, idx) => (
                  <UserCard key={user.id || idx} user={user} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500">
                <Users size={48} className="mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium">No connections yet</p>
                <p className="mt-2">When you connect with people, they'll appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;