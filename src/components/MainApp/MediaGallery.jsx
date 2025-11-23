import React, { useState, useEffect } from 'react';

const MediaGallery = ({ pet, onUpdatePet }) => {
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [editingMediaId, setEditingMediaId] = useState(null);
    const [newMedia, setNewMedia] = useState({
        file: null,
        filePreview: null,
        fileType: null,
        title: '',
        date: '',
        category: 'Photo',
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        // When the page loads, read pet.media from localStorage and render existing items into the gallery grid.
        if (pet) {
            const raw = localStorage.getItem('pet.media');
            if (raw) {
                let mediaItems = [];
                try {
                    mediaItems = JSON.parse(raw) || [];
                } catch (e) {
                    mediaItems = [];
                    console.error("Failed to parse pet.media from localStorage", e);
                }

                // Avoid infinite loop by only updating if the gallery data is different.
                if (JSON.stringify(pet.gallery) !== JSON.stringify(mediaItems)) {
                    const updatedPet = {
                        ...pet,
                        gallery: mediaItems
                    };
                    onUpdatePet(updatedPet);
                }
            }
        }
    }, [pet, onUpdatePet]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedia(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setNewMedia(prev => ({ ...prev, file: null, filePreview: null, fileType: null, category: 'Photo' })); // Reset category on no file
            setErrors(prev => ({ ...prev, file: undefined })); // Clear file error
            return;
        }

        // 10 MB limit
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({ ...prev, file: 'File size exceeds 10 MB limit.' }));
            setNewMedia(prev => ({ ...prev, file: null, filePreview: null, fileType: null, category: 'Photo' }));
            return;
        }

        let detectedFileType = 'other';
        let detectedCategory = 'Photo'; // Default category

        if (file.type.startsWith('image/')) {
            detectedFileType = 'image';
            detectedCategory = 'Photo';
        } else if (file.type.startsWith('video/')) {
            detectedFileType = 'video';
            detectedCategory = 'Video';
        } else {
            // For other file types, we don't automatically set category to Photo/Video
            // The category will remain whatever it was before, or the default 'Photo'
            // if the user hasn't changed it.
            // The user specified "only select between photo and video", so we won't
            // automatically set it to 'Other' here.
        }

        setNewMedia(prev => ({
            ...prev, file,
            fileType: detectedFileType,
            filePreview: null,
            category: detectedCategory // Set category based on file type
        }));
        setErrors(prev => ({ ...prev, file: undefined })); // Clear file error

        if (detectedFileType === 'image') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNewMedia(prev => ({ ...prev, filePreview: event.target.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!editingMediaId && !newMedia.file) {
            newErrors.file = 'Please upload a file.';
        }
        if (!newMedia.title.trim()) {
            newErrors.title = 'Please enter a title.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveMedia = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        let updatedGallery;
        if (editingMediaId) {
            updatedGallery = pet.gallery.map(item => {
                if (item.id === editingMediaId) {
                    return {
                        ...item,
                        file: newMedia.fileType === 'image' ? (newMedia.filePreview || newMedia.file) : newMedia.file,
                        fileType: newMedia.fileType,
                        title: newMedia.title,
                        date: newMedia.date,
                        category: newMedia.category,
                        notes: newMedia.notes,
                isFavorite: false, // New property
                caption: '', // New property for generated caption
                    };
                }
                return item;
            });
        } else {
            const mediaToSave = {
                id: Date.now(),
                file: newMedia.fileType === 'image' ? newMedia.filePreview : null,
                fileType: newMedia.fileType,
                title: newMedia.title,
                date: newMedia.date || new Date().toISOString().slice(0, 10),
                category: newMedia.category,
                notes: newMedia.notes,
            };
            updatedGallery = [...(pet.gallery || []), mediaToSave];
        }

        // Save to localStorage
        localStorage.setItem('pet.media', JSON.stringify(updatedGallery));

        const updatedPet = { ...pet, gallery: updatedGallery };
        onUpdatePet(updatedPet);

        // Only close modal if editing, otherwise just reset form for new entry
        if (editingMediaId) {
            closeModal();
        } else {
            // Reset form fields for a new entry
            setNewMedia({ file: null, filePreview: null, fileType: null, title: '', date: '', category: 'Photo', notes: '' });
            setErrors({});
            // Keep modal open
        }
    };

    const openModal = () => {
        setShowMediaModal(true);
    };

    const closeModal = () => {
        setShowMediaModal(false);
        setNewMedia({ file: null, filePreview: null, fileType: null, title: '', date: '', category: 'Photo', notes: '' });
        setErrors({});
        setEditingMediaId(null);
    };

    const openDetailsModal = (mediaId) => {
        const mediaItem = pet.gallery.find(m => m.id === mediaId);
        setSelectedMedia(mediaItem);
        setShowDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedMedia(null);
    };

    const openEditForId = (mediaId) => {
        const mediaItem = pet.gallery.find(m => m.id === mediaId);
        if (mediaItem) {
            setNewMedia({
                file: mediaItem.file,
                filePreview: mediaItem.fileType === 'image' ? mediaItem.file : null,
                fileType: mediaItem.fileType,
                title: mediaItem.title,
                date: mediaItem.date,
                category: mediaItem.category,
                notes: mediaItem.notes,
                isFavorite: mediaItem.isFavorite, // Include isFavorite
                caption: mediaItem.caption,     // Include caption
            });
            setEditingMediaId(mediaId);
            closeDetailsModal();
            setShowMediaModal(true);
        }
    };

    const handleDeleteMedia = (id) => {
        if (!window.confirm('Delete this media item?')) {
            return;
        }

        const updatedGallery = pet.gallery.filter(item => item.id !== id);

        localStorage.setItem('pet.media', JSON.stringify(updatedGallery));

        const updatedPet = { ...pet, gallery: updatedGallery };
        onUpdatePet(updatedPet);
        closeDetailsModal(); // Close the details modal after deletion
    };

    const handleToggleFavorite = (id) => {
        const updatedGallery = pet.gallery.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        );

        localStorage.setItem('pet.media', JSON.stringify(updatedGallery));

        const updatedPet = { ...pet, gallery: updatedGallery };
        onUpdatePet(updatedPet);
    };

    const handleGenerateCaption = async (id) => {
        const item = pet.gallery.find(m => m.id === id);
        if (!item) return;

        const prompt = `Write a short cute caption for a pet ${item.fileType === 'image' ? 'photo' : 'video'} titled "${item.title}". Keep it under 20 words.`;
        // Placeholder for actual Gemini API call
        const generatedCaption = await callGeminiAPI(prompt, "You are a creative caption writer.");

        const updatedGallery = pet.gallery.map(media =>
            media.id === id ? { ...media, caption: generatedCaption } : media
        );

        localStorage.setItem('pet.media', JSON.stringify(updatedGallery));

        const updatedPet = { ...pet, gallery: updatedGallery };
        onUpdatePet(updatedPet);
    };

    // example minimal stub if no API key:
    async function callGeminiAPI(userPrompt, systemInstruction){
        // fallback mock:
        const item = pet.gallery[0]; // Use the first item for a mock caption
        return `Cute caption: "${item?.title || 'Sweet pet'} ❤️"`;
    }

    return (
        <>
            <section className="container mx-auto my-8 p-4 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600">📸</h3>
                    <p className="text-sm text-slate-500">A collection of your pet's best moments.</p>
                </div>
                <div className="flex justify-end mb-4">
                    <button id="add-media-btn" onClick={openModal} className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full transition-colors">
                        + Add Media
                    </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <select id="media-filter-category" className="p-2 border rounded-md" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="favorites">Favorites Only</option>
                        <option value="Photo">Photos</option>
                        <option value="Video">Videos</option>
                        <option value="Vet Visit">Vet Visits</option>
                        <option value="Grooming">Grooming</option>
                        <option value="Playtime">Playtime</option>
                        <option value="Other">Other</option>
                    </select>
                    <select id="media-sort-date" className="p-2 border rounded-md" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {(pet.gallery && pet.gallery.length > 0) ? (
                        pet.gallery
                            .filter(media => {
                                if (filterCategory === 'all') return true;
                                if (filterCategory === 'favorites') return media.isFavorite;
                                return media.category === filterCategory;
                            })
                            .sort((a, b) => {
                                const dateA = new Date(a.date);
                                const dateB = new Date(b.date);
                                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
                            })
                            .map(media => (
                            <div key={media.id} className="group relative bg-white rounded-lg aspect-square overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                                <div className="absolute right-2 top-2 z-10">
                                    <button
                                        className={`favorite-toggle text-2xl ${media.isFavorite ? 'text-red-500' : 'text-gray-300'}`}
                                        onClick={(e) => { e.stopPropagation(); handleToggleFavorite(media.id); }}
                                    >
                                        ❤️
                                    </button>
                                </div>
                                <div onClick={() => openDetailsModal(media.id)} className="w-full h-full"> {/* This div will handle opening details modal */}
                                    {media.fileType === 'image' ? (
                                        <img src={media.file} alt={media.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h4 className="text-white font-bold text-lg">{media.title}</h4>
                                        <p className="text-slate-300 text-sm">{media.category} • {media.date}</p>
                                    </div>
                                </div>
                                {/* New button and caption div */}
                                <button className="generate-caption-btn mt-2 text-sm text-slate-600" onClick={() => handleGenerateCaption(media.id)}>✨ Generate Caption</button>
                                <div className="caption-text text-sm text-slate-700 mt-1" id={`caption-${media.id}`}>{media.caption}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 col-span-full text-center">No media yet. Add some memories!</p>
                    )}
                </div>
            </section>

            {showMediaModal && (
                <div id="media-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => { if (e.target.id === 'media-modal') closeModal(); }}>
                    <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
                        <button id="modal-close-top" aria-label="Close" onClick={closeModal} className="absolute right-4 top-4 text-slate-500 hover:text-slate-700">✕</button>
                        <div className="prose">
                            <h3 className="text-lg font-semibold text-slate-800">{editingMediaId ? 'Edit Media' : 'Add Media'}</h3>
                            <p className="text-sm text-slate-500">{editingMediaId ? 'Update the details for this media.' : 'Upload a photo or video for your pet.'}</p>
                        </div>
                        <form id="media-form" className="mt-4 space-y-4" onSubmit={handleSaveMedia} noValidate>
                            <div>
                                <label htmlFor="media-file" className="block text-sm font-medium text-slate-700">File</label>
                                <input id="media-file" type="file" accept="image/*,video/*" onChange={handleFileChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                {errors.file && <div className="validation-msg text-sm text-red-600 mt-1">{errors.file}</div>}
                            </div>

                            <div id="preview-container" className="mt-2">
                                {newMedia.fileType === 'image' && newMedia.filePreview && (
                                    <img src={newMedia.filePreview} alt="preview" id="media-preview" className="w-40 h-28 object-cover rounded-md border shadow-sm" />
                                )}
                                {newMedia.fileType === 'video' && (
                                    <div className="w-40 h-28 flex items-center justify-center bg-slate-100 rounded-md border text-slate-500">
                                        Video selected
                                    </div>
                                )}
                                {newMedia.fileType === 'other' && (
                                    <div className="w-40 h-28 flex items-center justify-center bg-slate-100 rounded-md border text-red-500">
                                        Unsupported file type
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="media-title" className="block text-sm font-medium text-slate-700">Title</label>
                                <input id="media-title" name="title" type="text" value={newMedia.title} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                {errors.title && <div className="validation-msg text-sm text-red-600 mt-1">{errors.title}</div>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="media-date" className="block text-sm font-medium text-slate-700">Date</label>
                                    <input id="media-date" name="date" type="date" value={newMedia.date} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="media-category" className="block text-sm font-medium text-slate-700">Category</label>
                                    <select id="media-category" name="category" value={newMedia.category} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                        <option>Photo</option><option>Video</option><option>Vet Visit</option><option>Grooming</option><option>Playtime</option><option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="media-notes" className="block text-sm font-medium text-slate-700">Notes</label>
                                <textarea id="media-notes" name="notes" rows="3" value={newMedia.notes} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" id="media-cancel" onClick={closeModal} className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Cancel</button>
                                <button type="submit" id="media-save" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDetailsModal && selectedMedia && (
                <div id="media-details-modal" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={(e) => { if (e.target.id === 'media-details-modal') closeDetailsModal(); }}>
                    <div className="relative bg-white rounded-2xl w-full max-w-4xl p-6 shadow-2xl max-h-[90vh] overflow-auto">
                        <button id="modal-close-details" aria-label="Close" onClick={closeDetailsModal} className="absolute right-4 top-4 text-slate-500 hover:text-slate-700">✕</button>
                        <div className="prose">
                            <h3 className="text-lg font-semibold text-slate-800">Details</h3>
                        </div>
                        <div className="mt-4">
                            {selectedMedia.fileType === 'image' ? (
                                <img src={selectedMedia.file} alt={selectedMedia.title} className="w-full max-h-[60vh] object-contain rounded-md" />
                            ) : (
                                <video controls className="w-full max-h-[60vh] rounded-md">
                                    <source src={selectedMedia.file} />
                                </video>
                            )}
                            <p className="text-sm text-slate-500 mt-2">{selectedMedia.category} • {selectedMedia.date}</p>
                            <p className="text-sm text-slate-600 mt-2">{selectedMedia.notes}</p>
                            <div className="mt-4 flex gap-2 justify-end">
                                <button id="detail-edit" onClick={() => openEditForId(selectedMedia.id)} className="px-3 py-2 rounded bg-slate-100">Edit</button>
                                <button id="detail-delete" onClick={() => handleDeleteMedia(selectedMedia.id)} className="px-3 py-2 rounded bg-red-100 text-red-600">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaGallery;