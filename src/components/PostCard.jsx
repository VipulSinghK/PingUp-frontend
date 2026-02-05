import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";

const PostCard = ({ post }) => {
  const postWithHashtags = post.content?.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600">$1</span>'
  );

  const [likes, setLikes] = useState(post.likes_count || []);
  const currentUser = dummyUserData;

  const handleLike = () => {
    if (likes.includes(currentUser.id)) {
      setLikes(likes.filter((id) => id !== currentUser.id));
    } else {
      setLikes([...likes, currentUser.id]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* User Info */}
      <div className="flex items-center gap-3 cursor-pointer mb-2">
        <img
          src={post.user.profile_picture}
          alt=""
          className="w-10 h-10 rounded-full shadow"
        />

        <div>
          <div className="flex items-center gap-1 font-semibold">
            {post.user.full_name}
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line mb-3"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* Post Images */}
      {post.image_urls?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.image_urls.map((img, index) => (
            <img
              src={img}
              key={index}
              alt=""
              className={`w-full object-cover rounded-lg ${
                post.image_urls.length === 1 ? "col-span-2 h-auto" : "h-48"
              }`}
            />
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between text-gray-600 text-sm pt-2 border-t border-gray-300">
        {/* Like */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
          <Heart
            className={`h-4 w-4 ${
              likes.includes(currentUser.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            }`}
          />
          <span>{likes.length}</span>
        </div>

        {/* Comment */}
        <div className="flex items-center gap-1 cursor-pointer">
          <MessageCircle className="h-4 w-4" />
          <span>Comment</span>
        </div>

        {/* Share */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
