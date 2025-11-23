import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ServicesPage.css';

const providers = {
  Grooming: [
    { name: "Pawfect Groomers", location: "Lahore", rating: "⭐ 4.8" },
    { name: "Fluffy Spa", location: "Karachi", rating: "⭐ 4.7" },
  ],
  Adoption: [
    { name: "Happy Paws Shelter", location: "Islamabad", rating: "⭐ 4.9" },
    { name: "Rescue Haven", location: "Lahore", rating: "⭐ 4.6" },
  ],
  Marketplace: [
    { name: "Pet Essentials Store", location: "Online", rating: "⭐ 4.8" },
    { name: "Paw Mart", location: "Karachi", rating: "⭐ 4.5" },
  ],
  Training: [
    { name: "Obedience Experts", location: "Lahore", rating: "⭐ 4.9" },
    { name: "Smart Pups Academy", location: "Karachi", rating: "⭐ 4.7" },
  ],
  Medication: [
    { name: "VetMed Pharmacy", location: "Lahore", rating: "⭐ 4.8" },
    { name: "Pet Health Hub", location: "Islamabad", rating: "⭐ 4.7" },
  ],
};

const BookingModal = ({ closeBookingModal, provider, handleBookingSubmit, bookingData, setBookingData }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    return (
    <div
      id="bookingModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingModalTitle"
      tabIndex="0"
      ref={modalRef}
    >
      <div className="bg-white rounded-2xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/3 p-6 relative shadow-base">
        <div className="tooltip">
        <button
          id="closeBookingModal"
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl btn-animate"
          onClick={closeBookingModal}
          aria-label="Close booking modal"
        >
          ✖
        </button>
        <span className="tooltip-text">Close</span>
        </div>

        <h2 id="bookingModalTitle" className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Book Service with {provider.name}
        </h2>

        <form id="bookingForm" className="space-y-4" onSubmit={handleBookingSubmit}>
          <select
            id="petSelect"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={bookingData.pet}
            onChange={(e) => setBookingData({ ...bookingData, pet: e.target.value })}
            aria-label="Select a pet"
          >
            <option value="">Select Pet</option>
            <option value="Buddy">Buddy</option>
            <option value="Bella">Bella</option>
            <option value="Max">Max</option>
          </select>

          <input
            type="date"
            id="bookingDate"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={bookingData.date}
            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
            aria-label="Select a booking date"
          />

          <input
            type="time"
            id="bookingTime"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={bookingData.time}
            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
            aria-label="Select a booking time"
          />

          <textarea
            id="bookingNotes"
            placeholder="Additional notes (optional)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={bookingData.notes}
            onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
            aria-label="Additional notes for the booking"
          ></textarea>

          <div className="flex justify-end gap-3">
            <div className="tooltip">
            <button
              type="button"
              id="cancelBooking"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg px-4 py-2 btn-animate"
              onClick={closeBookingModal}
              aria-label="Cancel booking"
            >
              Cancel
            </button>
            <span className="tooltip-text">Cancel booking</span>
            </div>
            <div className="tooltip">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 btn-animate"
              aria-label="Confirm booking"
            >
              Book Now
            </button>
            <span className="tooltip-text">Confirm and book</span>
            </div>
          </div>
        </form>
      </div>
    </div>
)};

const ProviderCard = ({ provider, service, openBookingModal }) => (
    <div className="border p-4 rounded-lg shadow-sm flex justify-between items-center card-hover shadow-base">
        <div>
            <h4 className="font-semibold text-gray-800">{provider.name}</h4>
            <p className="text-sm text-gray-500">{provider.location}</p>
            <p className="text-sm text-yellow-500">{provider.rating}</p>
        </div>
        <div className="tooltip">
        <button
            className="bookNowBtn bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1 text-sm btn-animate"
            data-provider={provider.name}
            data-service={service}
            onClick={() => openBookingModal(provider)}
            aria-label={`Book now with ${provider.name}`}
        >
            Book Now
        </button>
        <span className="tooltip-text">Schedule your selected service</span>
        </div>
    </div>
);

const EditBookingModal = ({ booking, closeEditModal, handleEditBookingSubmit, setEditingBooking }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    return (
    <div
      id="editBookingModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editBookingModalTitle"
      tabIndex="0"
      ref={modalRef}
    >
      <div className="bg-white rounded-2xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/3 p-6 relative shadow-base">
        <div className="tooltip">
        <button
          id="closeEditModal"
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl btn-animate"
          onClick={closeEditModal}
          aria-label="Close edit booking modal"
        >
          ✖
        </button>
        <span className="tooltip-text">Close</span>
        </div>

        <h2 id="editBookingModalTitle" className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Edit Booking
        </h2>

        <form id="editBookingForm" className="space-y-4" onSubmit={handleEditBookingSubmit}>
          <select
            id="editPetSelect"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={booking.pet}
            onChange={(e) => setEditingBooking({ ...booking, pet: e.target.value })}
            aria-label="Select a pet to edit"
          >
            <option value="Buddy">Buddy</option>
            <option value="Bella">Bella</option>
            <option value="Max">Max</option>
          </select>

          <input
            type="date"
            id="editBookingDate"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={booking.date}
            onChange={(e) => setEditingBooking({ ...booking, date: e.target.value })}
            aria-label="Select a new booking date"
          />

          <input
            type="time"
            id="editBookingTime"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={booking.time}
            onChange={(e) => setEditingBooking({ ...booking, time: e.target.value })}
            aria-label="Select a new booking time"
          />

          <textarea
            id="editBookingNotes"
            placeholder="Additional notes (optional)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={booking.notes}
            onChange={(e) => setEditingBooking({ ...booking, notes: e.target.value })}
            aria-label="Additional notes for the booking"
          ></textarea>

          <div className="flex justify-end gap-3">
            <div className="tooltip">
            <button
              type="button"
              id="cancelEdit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg px-4 py-2 btn-animate"
              onClick={closeEditModal}
              aria-label="Cancel editing booking"
            >
              Cancel
            </button>
            <span className="tooltip-text">Cancel changes</span>
            </div>
            <div className="tooltip">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 btn-animate"
              aria-label="Save changes to booking"
            >
              Save Changes
            </button>
            <span className="tooltip-text">Save your changes</span>
            </div>
          </div>
        </form>
      </div>
    </div>
)};

const ServicesPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [bookingData, setBookingData] = useState({
        pet: '',
        date: '',
        time: '',
        notes: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const [editingBookingIndex, setEditingBookingIndex] = useState(null);

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];
        setBookings(savedBookings);
    }, []);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash && providers[hash]) {
            openModal(hash);
        }
    }, [location]);

    const openModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    const openBookingModal = (provider) => {
        setSelectedProvider(provider);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedProvider(null);
        setBookingData({ pet: '', date: '', time: '', notes: '' }); // Reset form
    };

    const openEditModal = (booking, index) => {
        setEditingBooking(booking);
        setEditingBookingIndex(index);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingBooking(null);
        setEditingBookingIndex(null);
    };

    const handleEditBookingSubmit = (e) => {
        e.preventDefault();
        const savedBookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];
        savedBookings[editingBookingIndex] = editingBooking;
        localStorage.setItem("serviceBookings", JSON.stringify(savedBookings));
        setBookings(savedBookings);
        alert("✅ Booking updated successfully!");
        closeEditModal();
    };

    const handleDeleteBooking = (index) => {
        if (confirm("🗑️ Are you sure you want to delete this booking?")) {
            const savedBookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];
            savedBookings.splice(index, 1);
            localStorage.setItem("serviceBookings", JSON.stringify(savedBookings));
            setBookings(savedBookings);
        }
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const { pet, date, time, notes } = bookingData;

        if (!pet || !date || !time) {
            alert("⚠️ Please fill all required fields!");
            return;
        }

        const booking = { 
            provider: selectedProvider.name, 
            service: selectedService, 
            ...bookingData 
        };
        const savedBookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];
        savedBookings.push(booking);
        localStorage.setItem("serviceBookings", JSON.stringify(savedBookings));
        setBookings(savedBookings);

        alert("✅ Booking Confirmed!");
        closeBookingModal();
    };

    return (
        <div id="services" className="page-content bg-gray-50 py-12 section-container">
            <div className="container mx-auto px-6">
                <div id="servicesGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
                  {/* 🧼 Grooming */}
                  <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg card-hover shadow-base flex flex-col justify-between h-full" tabIndex="0">
                    <div>
                        <div className="text-5xl mb-3">🧼</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Grooming & Care</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Find local groomers, trainers, and walkers.
                        </p>
                    </div>
                    <div className="tooltip">
                    <button
                      className="viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                      data-service="Grooming"
                      onClick={() => openModal('Grooming')}
                      aria-label="View Grooming Providers"
                    >
                      View Providers
                    </button>
                    <span className="tooltip-text">See nearby professionals for this service</span>
                    </div>
                  </div>
            
                  {/* 🤝 Adoption */}
                  <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg card-hover shadow-base flex flex-col justify-between h-full" tabIndex="0">
                    <div>
                        <div className="text-5xl mb-3">🏠</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Adoption / Rehoming</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Browse or list adoptable pets.
                        </p>
                    </div>
                    <div className="tooltip">
                    <button
                      className="viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                      data-service="Adoption"
                      onClick={() => openModal('Adoption')}
                      aria-label="View Adoption Providers"
                    >
                      View Providers
                    </button>
                    <span className="tooltip-text">See nearby professionals for this service</span>
                    </div>
                  </div>
            
                  {/* 🛒 Marketplace */}
                  <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg card-hover shadow-base flex flex-col justify-between h-full" tabIndex="0">
                    <div>
                        <div className="text-5xl mb-3">🛒</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Marketplace</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Shop for essential pet products.
                        </p>
                    </div>
                    <div className="tooltip">
                    <button
                      className="viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                      data-service="Marketplace"
                      onClick={() => openModal('Marketplace')}
                      aria-label="View Marketplace Providers"
                    >
                      View Providers
                    </button>
                    <span className="tooltip-text">See nearby professionals for this service</span>
                    </div>
                  </div>
            
                  {/* 🐕 Training */}
                  <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg card-hover shadow-base flex flex-col justify-between h-full" tabIndex="0">
                    <div>
                        <div className="text-5xl mb-3">🐕</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Training</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Professional trainers to guide your pet’s behavior.
                        </p>
                    </div>
                    <div className="tooltip">
                    <button
                      className="viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                      data-service="Training"
                      onClick={() => openModal('Training')}
                      aria-label="View Training Providers"
                    >
                      View Providers
                    </button>
                    <span className="tooltip-text">See nearby professionals for this service</span>
                    </div>
                  </div>
            
                  {/* 💊 Medication Reminders */}
                  <div className="bg-white shadow-md rounded-2xl p-6 text-center transition hover:shadow-lg card-hover shadow-base flex flex-col justify-between h-full" tabIndex="0">
                    <div>
                        <div className="text-5xl mb-3">💊</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Medication Reminders</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          View upcoming medication schedules.
                        </p>
                    </div>
                    <div className="tooltip">
                    <button
                      className="viewProvidersBtn bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                      data-service="Medication"
                      onClick={() => openModal('Medication')}
                      aria-label="View Medication Providers"
                    >
                      View Providers
                    </button>
                    <span className="tooltip-text">See nearby professionals for this service</span>
                    </div>
                  </div>
            
                </div>

                {/* =================== SEARCH & FILTER BAR START =================== */}
                <div
                  id="servicesFilterBar"
                  className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8"
                >
                  {/* Search Input */}
                  <input
                    type="text"
                    id="serviceSearch"
                    placeholder="🔍 Search service..."
                    className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Search for a service"
                  />

                  {/* Sort Dropdown */}
                  <select
                    id="serviceSort"
                    className="w-full sm:w-1/4 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Sort services"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="top">Top Rated</option>
                    <option value="nearest">Nearest</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                {/* =================== SEARCH & FILTER BAR END =================== */}
            </div>

            {/* =================== PROVIDER MODAL START =================== */}
            <div
              id="providerModal"
              className={`fixed inset-0 bg-black bg-opacity-50 ${isModalOpen ? 'flex' : 'hidden'} items-center justify-center z-50 fade-enter`}
              onClick={(e) => {
                if (e.target.id === 'providerModal') {
                  closeModal();
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="providerModalTitle"
              tabIndex="0"
            >
              <div
                className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative shadow-base"
              >
                {/* Close Button */}
                <div className="tooltip">
                <button
                  id="closeProviderModal"
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl btn-animate"
                  onClick={closeModal}
                  aria-label="Close provider modal"
                >
                  ✖
                </button>
                <span className="tooltip-text">Close</span>
                </div>

                {/* Modal Title */}
                <h2 id="providerModalTitle" className="text-2xl font-bold text-blue-600 mb-4 text-center">
                  Available Providers for {selectedService}
                </h2>

                {/* Provider List */}
                <div id="providerList" className="space-y-4">
                  {selectedService && providers[selectedService] && providers[selectedService].length > 0 ?
                    providers[selectedService].map((provider, index) => (
                        <ProviderCard key={index} provider={provider} service={selectedService} openBookingModal={openBookingModal} />
                    )) :
                    <p className="text-center text-gray-500">No providers found for this service.</p>
                  }
                </div>
              </div>
            </div>
            {/* =================== PROVIDER MODAL END =================== */}

            {isBookingModalOpen && <BookingModal closeBookingModal={closeBookingModal} provider={selectedProvider} handleBookingSubmit={handleBookingSubmit} bookingData={bookingData} setBookingData={setBookingData} />}

            {isEditModalOpen && <EditBookingModal booking={editingBooking} closeEditModal={closeEditModal} handleEditBookingSubmit={handleEditBookingSubmit} setEditingBooking={setEditingBooking} />}

            {/* =================== MY BOOKINGS SECTION START =================== */}
            <section id="myBookings" className="bg-gray-50 py-12 mt-10 section-container">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                  📋 My Bookings
                </h2>
                <div id="bookingsContainer" className="space-y-4">
                  {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                      <div key={index} className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 flex justify-between items-start card-hover shadow-base" tabIndex="0">
                        <div>
                          <h3 className="font-semibold text-blue-700 mb-1">🐶 {booking.pet}</h3>
                          <p className="text-gray-600 text-sm mb-1">📅 {booking.date} at {booking.time}</p>
                          {booking.notes && <p className="text-gray-500 text-xs italic">📝 {booking.notes}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="tooltip">
                          <button
                            className="editBookingBtn bg-yellow-400 hover:bg-yellow-500 text-white rounded-md px-3 py-1 text-sm btn-animate"
                            data-index={index}
                            onClick={() => openEditModal(booking, index)}
                            aria-label={`Edit booking for ${booking.pet}`}
                          >
                            ✏️ Edit
                          </button>
                          <span className="tooltip-text">Edit this booking</span>
                          </div>
                          <div className="tooltip">
                          <button
                            className="deleteBookingBtn text-red-500 hover:text-red-700 text-sm font-semibold btn-animate"
                            onClick={() => handleDeleteBooking(index)}
                            aria-label={`Delete booking for ${booking.pet}`}
                          >
                            ❌ Delete
                          </button>
                          <span className="tooltip-text">Delete this booking</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p id="noBookingsMsg" className="text-center text-gray-500">
                      No bookings yet. Book your first service to see it here.
                    </p>
                  )}
                </div>
              </div>
            </section>
            {/* =================== MY BOOKINGS SECTION END =================== */}

            {/* =================== AI SUGGESTION CARD START =================== */}
            <section id="aiSuggestionCard" className="py-12 bg-gray-50 section-container">
              <div className="container mx-auto px-6">
                <div
                  className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100 card-hover shadow-base"
                  tabIndex="0"
                >
                  <div className="text-5xl mb-3">🤖</div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">
                    AI Suggestions for You
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your pet <span className="font-semibold text-blue-600">Bella</span> hasn’t
                    been groomed in 6 weeks.<br />
                    We recommend scheduling grooming soon!
                  </p>
                  <div className="tooltip">
                  <button
                    id="generateSuggestionBtn"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2 text-sm transition btn-animate"
                    aria-label="Generate a new AI suggestion"
                  >
                    Generate New Suggestion
                  </button>
                  <span className="tooltip-text">Get a new AI suggestion</span>
                  </div>
                </div>
              </div>
            </section>
            {/* =================== AI SUGGESTION CARD END =================== */}
        </div>
    );
};

export default ServicesPage;
