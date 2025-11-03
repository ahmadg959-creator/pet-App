import React from 'react';

const CommunityPost = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex gap-4 border border-slate-200">
        <img src={post.petPhoto} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
        <div>
            <div className="flex items-center gap-2 mb-1">
                <img src={post.userAvatar} className="h-6 w-6 rounded-full" />
                <p className="font-bold text-sm text-slate-700">{post.userName}</p>
            </div>
            <p className="text-sm text-slate-600">{post.caption}</p>
            <p className="text-xs text-red-500 mt-1 font-semibold">{post.likes} likes</p>
        </div>
    </div>
  );
};

export default CommunityPost;
