
import React, { useState } from 'react';

const CommunityPage = ({ communityPosts, setCommunityPosts }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim() === '') return;

    const newPost = {
      id: Date.now(),
      userName: 'You',
      userAvatar: 'https://placehold.co/100x100/94a3b8/FFFFFF?text=Y',
      petPhoto: 'https://placehold.co/600x400/cbd5e1/333?text=Your+Pet',
      caption: postContent,
      likes: 0,
      comments: 0,
      liked: false
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setPostContent('');
  };

  const handleLike = (postId) => {
    setCommunityPosts(communityPosts.map(post =>
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  return (
    <div id="community" className="page-content">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Create a Post</h2>
            <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" placeholder="Share a story or ask a question..."></textarea>
            <div className="flex justify-between items-center mt-3">
              <button className="text-slate-500 hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </button>
              <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors">Post</button>
            </div>
          </div>

          <div id="feed-container" className="space-y-6">
            {communityPosts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-5 flex items-center gap-4">
                  <img src={post.userAvatar} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-800">{post.userName}</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <div className="px-5 pb-3">
                  <p>{post.caption}</p>
                </div>
                <img src={post.petPhoto} className="w-full h-auto object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleLike(post.id)} className={`like-btn flex items-center gap-2 hover:text-red-500 transition-colors ${post.liked ? 'liked' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                        <span className="font-semibold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <span className="font-semibold">{post.comments}</span>
                      </button>
                    </div>
                    <button className="hover:text-slate-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div id="pet-of-the-week" className="bg-white p-5 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-yellow-500 mb-3">🏅 Pet of the Week</h2>
            <img src="https://placehold.co/600x400/d1c4e9/333?text=Bella" className="w-full h-48 object-cover rounded-xl shadow-md mb-3" />
            <h3 className="text-2xl font-bold text-slate-800">Bella</h3>
            <p className="text-slate-500">owned by Ahmad</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Top Contributors</h3>
            <ul id="leaderboard-list" className="space-y-3">
              <li class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://placehold.co/100x100/FBBF24/FFFFFF?text=A" class="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p class="font-bold text-slate-800">Ahmad <span class="ml-1">🥇</span></p>
                    <p class="text-xs text-slate-500">540 points</p>
                  </div>
                </div>
              </li>
              <li class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://placehold.co/100x100/F472B6/FFFFFF?text=A" class="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p class="font-bold text-slate-800">Alice <span class="ml-1">🥈</span></p>
                    <p class="text-xs text-slate-500">320 points</p>
                  </div>
                </div>
              </li>
              <li class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="https://placehold.co/100x100/60A5FA/FFFFFF?text=B" class="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p class="font-bold text-slate-800">Bob <span class="ml-1">🥉</span></p>
                    <p class="text-xs text-slate-500">210 points</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
