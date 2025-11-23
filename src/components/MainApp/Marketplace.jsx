import React, { useState, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Marketplace.css';
import { CartContext } from '../../contexts/CartContext';

const Marketplace = () => {
    const { showToast } = useOutletContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productTitle, setProductTitle] = useState('');
    const [productCategory, setProductCategory] = useState('Pet Supplies');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const { addToCart } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [sortOrder, setSortOrder] = useState('default');

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    const categories = ['All Products', 'Pet Supplies', 'Food', 'Grooming Tools', 'Toys', 'Accessories', 'Beds & Comfort', 'Health & Medicine', 'Training Equipment'];

    const bannedWords = ["nude", "sex", "kill", "drugs", "adult", "weapon"];

    const safeText = (text) => {
        const lower = text.toLowerCase();
        return !bannedWords.some((word) => lower.includes(word));
    };

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("marketProducts")) || [];
        setProducts(storedProducts);
    }, []);

    useEffect(() => {
        localStorage.setItem("marketProducts", JSON.stringify(products));
    }, [products]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        // Reset form
        setProductTitle('');
        setProductCategory('Pet Supplies');
        setProductPrice('');
        setProductImage('');
        setProductDescription('');
    };

    const openDetailsModal = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedProduct(null);
        setReviewRating(5);
        setReviewText('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const product = {
            id: Date.now(),
            title: productTitle,
            category: productCategory,
            price: productPrice,
            image: productImage || "https://via.placeholder.com/300x200",
            description: productDescription,
            reviews: []
        };

        setProducts([...products, product]);
        closeModal();
        showToast('✅ Product added successfully!');
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!safeText(reviewText)) {
            showToast("❌ Your review contains inappropriate content.");
            return;
        }

        if (!reviewText.trim() || reviewRating === 0) {
            showToast("⚠️ Please provide a rating and a review text.");
            return;
        }

        const newReview = {
            rating: reviewRating,
            text: reviewText,
            date: new Date().toLocaleDateString(),
        };

        const updatedProducts = products.map(p => {
            if (p.id === selectedProduct.id) {
                const updatedProduct = { ...p, reviews: [...(p.reviews || []), newReview] };
                setSelectedProduct(updatedProduct);
                return updatedProduct;
            }
            return p;
        });

        setProducts(updatedProducts);
        setReviewRating(5);
        setReviewText('');
        showToast("✅ Review added successfully!");
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'All Products' || product.category === selectedCategory;
        const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    let sortedProducts = [...filteredProducts];
    if (sortOrder !== 'default') {
        sortedProducts.sort((a, b) => {
            switch (sortOrder) {
                case 'priceLow':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'priceHigh':
                    return parseFloat(b.price) - parseFloat(a.price);
                case 'az':
                    return a.title.localeCompare(b.title);
                case 'za':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    return (
        <>
            {/* ================= MARKETPLACE SECTION START ================= */}
            <section id="marketplaceSection" className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    {/* Marketplace Tabs */}
                    <div id="marketplaceTabs" className="flex flex-wrap gap-3 mb-8">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`market-tab ${selectedCategory === category ? 'active-tab' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* SEARCH BAR & SORT */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-grow">
                            <input
                                type="text"
                                id="marketSearchInput"
                                placeholder="🔍 Search products..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <select
                                id="marketSortSelect"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="priceLow">Price: Low → High</option>
                                <option value="priceHigh">Price: High → Low</option>
                                <option value="az">A → Z</option>
                                <option value="za">Z → A</option>
                            </select>
                        </div>
                    </div>

                    {/* Marketplace Product Grid */}
                    <div
                        id="marketGrid"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product, index) => (
                                <div key={product.id || index} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col">
                                    <img
                                        src={product.image}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                        alt={product.title}
                                    />
                                    <h3 className="font-semibold text-gray-800 mb-1">{product.title}</h3>
                                    <p className="text-blue-600 font-bold mb-1">${product.price}</p>
                                    <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="addToCartBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm w-full mb-2"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => openDetailsModal(product)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2 text-sm w-full"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">No products found. Try a different search.</p>
                        )}
                    </div>

                    {/* ================= AI SUGGESTION CARD ================= */}
                    <section className="mt-12">
                      <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
                        <div className="text-5xl mb-3">🤖</div>

                        <h3 className="text-2xl font-bold text-blue-700 mb-2">
                          AI Suggestions for Your Pet
                        </h3>

                        <p className="text-gray-600 text-sm mb-4">
                          Based on your pet’s age and breed, here are some recommended products.
                        </p>

                        <button
                          id="generateAISuggestion"
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm"
                        >
                          Generate Suggestion
                        </button>
                      </div>
                    </section>
                </div>
            </section>
            {/* ================= MARKETPLACE SECTION END ================= */}

            {/* Floating Add Product Button */}
            <button
                id="addProductBtn"
                onClick={openModal}
                className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition"
                title="Add New Product"
            >
                ➕
            </button>

            {/* ================= ADD PRODUCT MODAL START ================= */}
            <div
                id="addProductModal"
                className={`fixed inset-0 bg-black bg-opacity-50 ${isModalOpen ? 'flex' : 'hidden'} items-center justify-center z-50`}
            >
                <div className="bg-white rounded-2xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/3 p-6 relative">
                    <button
                        id="closeAddProductModal"
                        onClick={closeModal}
                        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✖
                    </button>

                    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                        Add New Product
                    </h2>

                    <form id="addProductForm" className="space-y-4" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            id="productTitle"
                            placeholder="Product Title"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                            value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                            required
                        />

                        <select
                            id="productCategory"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <option>Pet Supplies</option>
                            <option>Food</option>
                            <option>Grooming Tools</option>
                            <option>Toys</option>
                            <option>Accessories</option>
                            <option>Beds & Comfort</option>
                            <option>Health & Medicine</option>
                            <option>Training Equipment</option>
                        </select>

                        <input
                            type="number"
                            id="productPrice"
                            placeholder="Price ($)"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            id="productImage"
                            placeholder="Image URL"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                            value={productImage}
                            onChange={(e) => setProductImage(e.target.value)}
                        />

                        <textarea
                            id="productDescription"
                            placeholder="Short Description"
                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 w-full"
                        >
                            Save Product
                        </button>

                    </form>
                </div>
            </div>
            {/* ================= ADD PRODUCT MODAL END ================= */}

            {/* ================= PRODUCT DETAILS MODAL START ================= */}
            {selectedProduct && (
                <div
                    id="productDetailsModal"
                    className={`fixed inset-0 bg-black bg-opacity-60 ${isDetailsModalOpen ? 'flex' : 'hidden'} items-center justify-center z-50 overflow-y-auto`}
                >
                    <div className="bg-white rounded-2xl shadow-lg w-11/12 sm:w-3/4 lg:w-2/3 p-6 sm:p-8 my-8 relative max-h-screen overflow-y-auto">
                        <button
                            onClick={closeDetailsModal}
                            className="absolute top-4 right-5 text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            ✖
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Info */}
                            <div>
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.title}</h2>
                                <p className="text-2xl text-blue-600 font-bold mb-4">${selectedProduct.price}</p>
                                <p className="text-gray-700">{selectedProduct.description}</p>
                            </div>

                            {/* Reviews and Form */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Reviews</h3>
                                
                                {/* Existing Reviews */}
                                <div className="space-y-4 max-h-48 overflow-y-auto mb-6">
                                    {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                                        selectedProduct.reviews.map((review, index) => (
                                            <div key={index} className="border-b pb-3">
                                                <div className="flex items-center mb-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                                    ))}
                                                    <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
                                                </div>
                                                <p className="text-gray-600">{review.text}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No reviews yet.</p>
                                    )}
                                </div>

                                {/* Add Review Form */}
                                <form onSubmit={handleReviewSubmit} className="space-y-4">
                                    <h4 className="text-xl font-bold">Leave a Review</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={ratingValue}
                                                        className={`text-3xl focus:outline-none ${ratingValue <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        onClick={() => setReviewRating(ratingValue)}
                                                    >
                                                        ★
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">Review</label>
                                        <textarea
                                            id="reviewText"
                                            rows="4"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* ================= PRODUCT DETAILS MODAL END ================= */}
        </>
    );
};

export default Marketplace;