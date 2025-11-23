import React, { useState, useEffect } from 'react';

const CommunityPage = () => {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('pet.community');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });
    const [newPostText, setNewPostText] = useState('');
    const [newPostMedia, setNewPostMedia] = useState(null);
    const [newPostPet, setNewPostPet] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('Story');
    const [openCommentSection, setOpenCommentSection] = useState(null);
    const [newCommentText, setNewCommentText] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState({});
    const [isSuggestingReply, setIsSuggestingReply] = useState({});
    const [aiSummary, setAiSummary] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [showGuidelines, setShowGuidelines] = useState(true);
    const [topInfluencers, setTopInfluencers] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [buttonPosition, setButtonPosition] = useState('initial');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const threshold = 200; // Adjust this value as needed
            if (scrollY > threshold) {
                setButtonPosition('fixed');
            } else {
                setButtonPosition('initial');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Mock data for influencers and popular posts
        const influencers = posts.reduce((acc, post) => {
            acc[post.user] = (acc[post.user] || 0) + 1;
            return acc;
        }, {});
        const sortedInfluencers = Object.entries(influencers)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([user, count]) => ({ user, count }));
        setTopInfluencers(sortedInfluencers);

        const sortedPopular = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);
        setPopularPosts(sortedPopular);
    }, [posts]);


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation for file type
        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
            alert("Please upload a valid image or video file.");
            e.target.value = ""; // Clear the input
            return;
        }

        setNewPostMedia(file);
    };

    const handlePostSubmit = () => {
        const text = newPostText.trim();
        const file = newPostMedia;

        if (!text && !file) {
            alert("Please write something or upload an image/video!");
            return;
        }

        const newPost = {
            id: Date.now(),
            user: "Guest User",
            pet: newPostPet,
            category: newPostCategory, // 🏷️ NEW PROPERTY
            text: text,
            image: file ? URL.createObjectURL(file) : null,
            date: new Date().toLocaleString(),
            likes: 0,
            liked: false,
            comments: [],
        };

        const newPosts = [newPost, ...posts];
        setPosts(newPosts);
        localStorage.setItem('pet.community', JSON.stringify(newPosts));

        // Reset form
        setNewPostText('');
        setNewPostMedia(null);
        setNewPostPet('');
        setNewPostCategory('Story'); // reset
        document.getElementById("postMedia").value = "";
        closeModal();
    };

    const handleLike = (postId) => {
        const newPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        });
        setPosts(newPosts);
        localStorage.setItem('pet.community', JSON.stringify(newPosts));
    };

    const handleCommentToggle = (postId) => {
        if (openCommentSection === postId) {
            setOpenCommentSection(null);
        } else {
            setOpenCommentSection(postId);
        }
    };

    const handleAddComment = (postId) => {
        const text = newCommentText.trim();
        if (!text) return;

        const newPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, { user: 'Guest User', text }],
                };
            }
            return post;
        });

        setPosts(newPosts);
        localStorage.setItem('pet.community', JSON.stringify(newPosts));
        setNewCommentText('');
    };

    const handleDeletePost = (postId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        const newPosts = posts.filter(post => post.id !== postId);
        setPosts(newPosts);
        localStorage.setItem('pet.community', JSON.stringify(newPosts));
    };

    const generateAICaption = async () => {
        const text = newPostText.trim();
        const pet = newPostPet || "my pet";

        setIsGeneratingCaption(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate friendly caption (mock AI logic)
        const captions = [
            `🐾 ${pet} just made my day again! ❤️`,
            `Life’s better with ${pet} around 🐶✨`,
            `Cuteness overload by ${pet}! 😍`,
            `${pet} says hi to all furry friends! 🐕`,
            `Lazy day with ${pet}, endless cuddles 💤🐾`,
        ];

        const randomCaption =
            captions[Math.floor(Math.random() * captions.length)];

        setNewPostText(randomCaption);

        setIsGeneratingCaption(false);

        console.log(
            `🤖 AI Caption Generated (mock): "${randomCaption}"\nPrompt would've been: "Write a friendly caption for a post about '${text}' and pet '${pet}'."`
        );
    };

    const handleSortToggle = () => {
        setSortOrder(currentOrder => currentOrder === 'desc' ? 'asc' : 'desc');
    };

    const suggestAIReply = async (postId) => {
        setIsSuggestingReply(prev => ({ ...prev, [postId]: true }));
        setAiSuggestion(prev => ({ ...prev, [postId]: '' }));

        // Simulate short delay (mock AI)
        await new Promise((r) => setTimeout(r, 1200));

        const suggestions = [
            "Aww, that’s adorable! 🥰",
            "Haha, pets are the best! 😂",
            "So sweet — give them a treat from me! 🍪🐾",
            "That’s an awesome tip, thanks for sharing! 🙌",
            "I totally relate! My pet does the same 😄",
        ];

        const randomSuggestion =
            suggestions[Math.floor(Math.random() * suggestions.length)];

        setAiSuggestion(prev => ({ ...prev, [postId]: randomSuggestion }));
        setIsSuggestingReply(prev => ({ ...prev, [postId]: false }));
    };

    const useAISuggestion = (postId) => {
        setNewCommentText(aiSuggestion[postId]);
        setAiSuggestion(prev => ({ ...prev, [postId]: '' }));
    };

    const generateSummary = async () => {
        setIsGeneratingSummary(true);
        setAiSummary('Thinking... analyzing community activity 🧩');

        // Simulate short delay
        await new Promise((r) => setTimeout(r, 1500));

        // Mock AI logic: count posts & comments
        const totalPosts = posts.length;
        const totalComments = posts.reduce((sum, p) => sum + p.comments.length, 0);

        const summaryOptions = [
            `🐾 This week ${totalPosts} posts were shared with ${totalComments} total comments. Community is thriving!`,
            `💬 ${totalPosts} discussions sparked ${totalComments} comments — keep the pawsome energy up!`,
            `🌟 ${totalPosts} new posts and ${totalComments} replies this week — great teamwork!`,
        ];
        const randomSummary = summaryOptions[Math.floor(Math.random() * summaryOptions.length)];

        setAiSummary(randomSummary);
        setIsGeneratingSummary(false);

        console.log("✅ AI Weekly Summary generated:", randomSummary);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const sortedAndFilteredPosts = posts
        .filter(post => {
            if (filterType === 'All') {
                return true;
            }
            return post.category === filterType;
        })
        .sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.id - a.id; // Sort by timestamp (descending)
            }
            return a.id - b.id; // Sort by timestamp (ascending)
        });

    return (
        <div id="community" className="page-content">
            {/* ===================== COMMUNITY SECTION ===================== */}
            <section id="communitySection" className="container mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT COLUMN: Feed Area */}
                    <div className="lg:col-span-2">
                        {/* Create Post Modal */}
                        {isModalOpen && (
                            <div id="createPostModal" onClick={(e) => { if (e.target.id === 'createPostModal') closeModal(); }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                                <div className="bg-white shadow-md rounded-xl p-4 mt-6 w-full max-w-lg relative">
                                    <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Post</h2>

                                    {/* Post Textarea */}
                                    <textarea
                                        id="postText"
                                        placeholder="Share something about your pet..."
                                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
                                        rows="3"
                                        value={newPostText}
                                        onChange={(e) => setNewPostText(e.target.value)}
                                    ></textarea>

                                    {/* Upload Media Input */}
                                    <div className="mt-3">
                                        <label
                                            htmlFor="postMedia"
                                            className="block text-gray-600 text-sm font-medium mb-1"
                                        >Upload Media:</label>
                                        <input
                                            type="file"
                                            id="postMedia"
                                            accept="image/*,video/*"
                                            onChange={handleFileUpload}
                                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-white file:bg-blue-500 hover:file:bg-blue-600 cursor-pointer"
                                        />
                                    </div>

                                    {/* Pet Tag Dropdown */}
                                    <div className="mt-3">
                                        <label
                                            htmlFor="petTag"
                                            className="block text-gray-600 text-sm font-medium mb-1"
                                        >Tag Pet:</label>
                                        <select
                                            id="petTag"
                                            value={newPostPet}
                                            onChange={(e) => setNewPostPet(e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200 mt-1 mb-2"
                                        >
                                            <option value="">None</option>
                                            <option value="Max">Max</option>
                                            <option value="Bella">Bella</option>
                                            <option value="Charlie">Charlie</option>
                                        </select>
                                    </div>

                                    {/* Post Type Dropdown */}
                                    <div className="mt-3">
                                      <label
                                        htmlFor="postCategory"
                                        className="block text-gray-600 text-sm font-medium mb-1"
                                        >Post Type:</label
                                      >
                                      <select
                                        id="postCategory"
                                        value={newPostCategory}
                                        onChange={(e) => setNewPostCategory(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 w-full text-gray-700 focus:ring focus:ring-blue-200"
                                      >
                                        <option value="Story">Story</option>
                                        <option value="Question">Question</option>
                                        <option value="Tip">Tip</option>
                                        <option value="Funny">Funny</option>
                                      </select>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end items-center space-x-2 mt-3">
                                        <button
                                            id="generateCaptionBtn"
                                            onClick={generateAICaption}
                                            disabled={isGeneratingCaption}
                                            className="text-white bg-purple-500 hover:bg-purple-600 rounded-lg px-4 py-2 transition disabled:bg-purple-300"
                                        >
                                            {isGeneratingCaption ? '✨ Generating...' : '✨ Generate Caption'}
                                        </button>
                                        <button
                                            id="postBtn"
                                            onClick={handlePostSubmit}
                                            className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 🔹 Filter + Sort + Add Post Section */}
                        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100">
                          {/* Filter Controls */}
                          <div className="flex items-center gap-3">
                            <label htmlFor="filterType" className="text-sm text-gray-600 font-medium">Filter by:</label>
                            <select
                              id="filterType"
                              value={filterType}
                              onChange={(e) => setFilterType(e.target.value)}
                              className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring focus:ring-blue-200"
                            >
                              <option value="All">All</option>
                              <option value="Story">Story</option>
                              <option value="Question">Question</option>
                              <option value="Tip">Tip</option>
                              <option value="Funny">Funny</option>
                            </select>

                            <button
                              id="sortBtn"
                              onClick={handleSortToggle}
                              className="text-white bg-gray-600 hover:bg-gray-700 rounded-lg px-3 py-2 text-sm"
                            >
                              Sort by Date {sortOrder === 'desc' ? '↓' : '↑'}
                            </button>
                          </div>

                          {/* Add Post Button */}
                          <div className="flex justify-center md:justify-end">
                            <button
                              id="addPostBtn"
                              onClick={openModal}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md px-6 py-2 flex items-center space-x-2"
                            >
                              <span className="text-lg">➕</span>
                              <span>Add Post</span>
                            </button>
                          </div>
                        </div>

                        {/* Feed Container */}
                        <div id="communityFeed" className="mt-10">
                            {sortedAndFilteredPosts.length === 0 ? (
                                <p
                                    id="emptyFeedMsg"
                                    className="text-center text-gray-500 bg-gray-50 py-8 px-4 rounded-xl mt-6 border border-gray-100"
                                >
                                    {filterType === 'All' ? 'No posts yet — be the first to share!' : `No ${filterType.toLowerCase()} posts yet.`}
                                </p>
                            ) : (
                                sortedAndFilteredPosts.map((post) => (
                                    <div key={post.id} className="bg-white shadow-md rounded-xl p-4 mb-6 transition hover:shadow-lg border border-gray-100 relative">
                                        <button 
                                            onClick={() => handleDeletePost(post.id)}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition text-lg"
                                            title="Delete Post"
                                        >🗑️</button>
                                        <div className="flex justify-between items-center mb-1 pr-6">
                                            <h3 className="font-semibold text-gray-800">{post.user} {post.pet ? <span className='text-sm text-gray-500'>({post.pet})</span> : ""}</h3>
                                            <p className="text-xs text-gray-400">{post.date}</p>
                                        </div>
                                        <p className="text-gray-700 mb-3">{post.text}</p>
                                        {post.category && <p className="text-xs text-gray-500 italic mb-2">🏷️ {post.category}</p>}
                                        {post.image && <img src={post.image} alt="Post image" className="rounded-lg max-h-60 object-cover mb-3 w-full"/>}
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <button 
                                              onClick={() => handleLike(post.id)}
                                              className="like-btn flex items-center space-x-1 text-red-500 hover:text-red-600 transition"
                                            >
                                              <span>{post.liked ? "❤️" : "🤍"}</span>
                                              <span>{post.likes} Likes</span>
                                            </button>
                                            <button onClick={() => handleCommentToggle(post.id)} className="comment-toggle text-blue-500 hover:underline text-sm">
                                              💬 {post.comments.length} Comments
                                            </button>
                                        </div>
                                        {openCommentSection === post.id && (
                                            <div className="comment-section mt-3">
                                                <div className="mt-2">
                                                  <input 
                                                    type="text" 
                                                    placeholder="Write a comment..." 
                                                    value={newCommentText}
                                                    onChange={(e) => setNewCommentText(e.target.value)}
                                                    className="w-full border rounded-md p-2 text-sm mb-2 focus:outline-none focus:ring focus:ring-blue-200"/>
                                                  <div className="flex space-x-2 mb-2">
                                                    <button
                                                      onClick={() => handleAddComment(post.id)}
                                                      className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 text-sm">
                                                      Send
                                                    </button>
                                                    <button
                                                      onClick={() => suggestAIReply(post.id)}
                                                      className="text-white bg-purple-500 hover:bg-purple-600 rounded-lg px-3 py-1 text-sm">
                                                      💡 Suggest Reply
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="mt-2">
                                                  {isSuggestingReply[post.id] && <p className="text-gray-400 italic">💡 Thinking of a great reply...</p>}
                                                  {aiSuggestion[post.id] && (
                                                    <div className="bg-gray-50 border rounded-md p-2 mt-2 text-gray-700">
                                                      💬 Suggested reply: “{aiSuggestion[post.id]}”
                                                      <button
                                                        onClick={() => useAISuggestion(post.id)}
                                                        className="ml-2 text-blue-500 hover:underline text-sm"
                                                      >
                                                        Use this
                                                      </button>
                                                    </div>
                                                  )}
                                                  {post.comments.map((c, i) => (
                                                    <p key={i} className="text-gray-700 text-sm bg-gray-50 rounded-md p-2">{c.user}: {c.text}</p>
                                                  ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar Widgets */}
                    <div id="communitySidebar" className="space-y-6">
                        {/* 🐾 Top Pet Influencers Widget */}
                        <div id="topInfluencersCard" className="bg-white shadow-md rounded-xl p-4 border border-gray-100">
                          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            🌟 Top Pet Influencers
                          </h2>
                          <ul id="influencerList" className="text-gray-700 text-sm space-y-1">
                            {topInfluencers.length > 0 ? (
                                topInfluencers.map((influencer, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{influencer.user}</span>
                                        <span>{influencer.count} posts</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 italic">No data yet — make your first post!</li>
                            )}
                          </ul>
                        </div>

                        {/* 🔥 Popular Posts Widget */}
                        <div id="popularPostsCard" className="bg-white shadow-md rounded-xl p-4 border border-gray-100">
                          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            🔥 Popular Posts
                          </h2>
                          <ul id="popularPostList" className="text-gray-700 text-sm space-y-1">
                            {popularPosts.length > 0 ? (
                                popularPosts.map((post) => (
                                    <li key={post.id} className="flex justify-between">
                                        <span className="truncate w-40">{post.text}</span>
                                        <span>❤️ {post.likes}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 italic">No popular posts yet.</li>
                            )}
                          </ul>
                        </div>

                        {/* 🧠 AI Weekly Summary Card */}
                        <div id="aiSummaryCard" className="bg-white shadow-md rounded-xl p-4 border border-gray-100">
                          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            🧠 AI Weekly Summary
                          </h2>
                          <p id="aiSummaryText" className="text-gray-600 mb-3">
                            {aiSummary || 'No summary yet — click below to generate insights.'}
                          </p>
                          <button
                            id="generateSummaryBtn"
                            onClick={generateSummary}
                            disabled={isGeneratingSummary}
                            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm transition disabled:bg-blue-400"
                          >
                            {isGeneratingSummary ? '🔍 Generating Summary...' : '🔍 Generate Summary'}
                          </button>
                        </div>

                        {/* 📜 Community Guidelines Card */}
                        {showGuidelines && (
                          <div id="guidelinesCard" className="bg-white shadow-md rounded-xl p-4 border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              📜 Community Guidelines
                            </h2>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                              <li>🐶 Be kind and respectful — everyone loves their pets differently!</li>
                              <li>💬 No spam or self-promotion — keep conversations helpful and fun.</li>
                              <li>🩺 Share tips safely — consult a vet for serious health issues.</li>
                              <li>🌟 Report any inappropriate content to admins.</li>
                            </ul>
                          </div>
                        )}

                        {/* Toggle Guidelines Button */}
                        <div className="text-right mt-3">
                          <button
                            id="toggleGuidelinesBtn"
                            onClick={() => setShowGuidelines(!showGuidelines)}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
                          </button>
                        </div>
                    </div>
                </div> {/* Closing div for grid */}
            </section>
        </div>
    );
};

export default CommunityPage;