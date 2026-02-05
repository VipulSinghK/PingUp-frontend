// src/components/Storiesbar.jsx
import React, { useEffect, useState } from 'react';
import { dummyStoriesData } from '../assets/assets';
import { Plus } from 'lucide-react';
import moment from 'moment';
import StoryModal from './StoryModal';
import StoryViewer from './StoryViewer';

const Storiesbar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  // Load initial stories (in real app → replace with API call)
  useEffect(() => {
    // For development/demo purposes only
    setStories(dummyStoriesData || []);
    
    // In production you would do something like:
    // const loadStories = async () => {
    //   try {
    //     const res = await fetch('/api/stories');
    //     const data = await res.json();
    //     setStories(data);
    //   } catch (err) {
    //     console.error('Failed to load stories:', err);
    //   }
    // };
    // loadStories();
  }, []);

  // Function to refresh stories after new story is created
  const refreshStories = async () => {
    // In real app → fetch fresh stories from server
    // For demo: we can simulate by re-setting dummy data or leaving as is
    // setStories(dummyStoriesData || []);
    
    // Recommended real implementation:
    try {
      const res = await fetch('/api/stories'); // adjust endpoint
      const data = await res.json();
      setStories(data);
    } catch (err) {
      console.error('Failed to refresh stories:', err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {/* Create Story Card */}
        <div
          onClick={() => setShowModal(true)}
          className="
            rounded-xl shadow-sm min-w-[108px] max-w-[108px] 
            aspect-[3/4] cursor-pointer 
            hover:shadow-md transition-all duration-200
            border-2 border-dashed border-indigo-400/60 
            bg-gradient-to-b from-indigo-50/80 to-white/50
            flex-shrink-0
          "
        >
          <div className="h-full flex flex-col items-center justify-center p-3">
            <div
              className="
                size-12 bg-gradient-to-br from-indigo-500 to-purple-600 
                rounded-full flex items-center justify-center mb-2.5
                shadow-md
              "
            >
              <Plus className="w-7 h-7 text-white" strokeWidth={2.8} />
            </div>
            <p className="text-xs font-medium text-indigo-900 text-center leading-tight">
              Create<br />Story
            </p>
          </div>
        </div>

        {/* Story items */}
        {stories.map((story) => (
          <div
            onClick={() => setViewStory(story)}
            key={story.id}
            className="
              min-w-[108px] max-w-[108px] aspect-[3/4] 
              rounded-xl overflow-hidden shadow-sm 
              hover:shadow-lg transition-all duration-200 cursor-pointer
              ring-1 ring-gray-200 hover:ring-indigo-300
              flex-shrink-0
            "
          >
            <div className="relative h-full">
              <img
                src={story.previewImage || story.userAvatar || 'https://via.placeholder.com/150x200?text=Story'}
                alt={`${story.username || 'User'}'s story`}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

              {/* Username + time */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-semibold truncate">
                  {story.username || 'User'}
                </p>
                <p className="text-white/80 text-[10px] mt-0.5">
                  {story.createdAt 
                    ? moment(story.createdAt).fromNow() 
                    : 'Just now'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {stories.length === 0 && (
          <div className="min-w-[108px] text-sm text-gray-500 italic flex items-center justify-center">
            No stories yet
          </div>
        )}
      </div>

      {/* Story Creation Modal */}
      {showModal && (
        <StoryModal 
          setShowModal={setShowModal} 
          fetchStories={refreshStories}
        />
      )}

      {/* Story Viewer (Full-screen viewer) */}
      {viewStory && (
        <StoryViewer 
          viewstory={viewStory} 
          setViewStory={setViewStory} 
        />
      )}
    </div>
  );
};

export default Storiesbar;