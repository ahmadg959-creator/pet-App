import React, { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import QuickOverviewCard from './QuickOverviewCard';
import CommunityPost from './CommunityPost';
import ServiceCard from './ServiceCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { pets, consultations } = useOutletContext();

  const getActivityScore = (pet) => {
    if (!pet) return 0;
    const health = pet.health || {};
    return (
        (health.vaccinations?.length || 0) +
        (health.deworming?.length || 0) +
        (health.medications?.length || 0) +
        (health.medicalHistory?.length || 0) +
        (pet.growth?.length || 0) +
        (pet.reminders?.length || 0) +
        (pet.gallery?.length || 0)
    );
  };

  const favoritePet = pets.reduce((fav, current) => {
    if (!fav) return current;
    return getActivityScore(current) > getActivityScore(fav) ? current : fav;
  }, null);

  const findNextUpcomingEvent = () => {
    const allEvents = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Collect events from pets
    pets.forEach(pet => {
        // Vaccinations
        (pet.health?.vaccinations || []).forEach(v => {
            if (v.nextDue && new Date(v.nextDue) >= today) {
                allEvents.push({
                    date: new Date(v.nextDue),
                    title: `${v.name} (Vaccine)`,
                    petName: pet.name,
                    link: `/my-pets/${pet.id}`
                });
            }
        });
        // Deworming
        (pet.health?.deworming || []).forEach(d => {
            if (d.nextDue && new Date(d.nextDue) >= today) {
                allEvents.push({
                    date: new Date(d.nextDue),
                    title: `${d.name} (Deworming)`,
                    petName: pet.name,
                    link: `/my-pets/${pet.id}`
                });
            }
        });
        // Reminders
        (pet.reminders || []).forEach(r => {
            if (r.date && r.status === 'pending' && new Date(r.date) >= today) {
                allEvents.push({
                    date: new Date(r.date),
                    title: r.title,
                    petName: pet.name,
                    link: `/my-pets/${pet.id}`
                });
            }
        });
    });

    // Collect events from consultations
    (consultations || []).forEach(c => {
        if (c.date && c.status === 'Upcoming' && new Date(c.date) >= today) {
            allEvents.push({
                date: new Date(c.date),
                title: `Vet Visit with ${c.vetName}`,
                petName: c.pet,
                link: '/vet-doc#consultations-vet'
            });
        }
    });

    if (allEvents.length === 0) return null;

    allEvents.sort((a, b) => a.date - b.date);
    const nextEvent = allEvents[0];

    const diffTime = nextEvent.date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { ...nextEvent, daysUntil: diffDays };
  };

  const findMostRecentVisit = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastConsultations = (consultations || []).filter(c => {
        const eventDate = new Date(c.date);
        return c.status === 'Past' || eventDate < today;
    });

    if (pastConsultations.length === 0) return null;

    pastConsultations.sort((a, b) => new Date(b.date) - new Date(a.date));
    return pastConsultations[0];
  };

  const nextEvent = findNextUpcomingEvent();
  const recentVisit = findMostRecentVisit();

  const communityPosts = [
    { id: 1, userName: 'Alice', userAvatar: 'https://placehold.co/100x100/F472B6/FFFFFF?text=A', petPhoto: 'https://placehold.co/600x400/f9a8d4/333?text=Mochi', caption: 'Mochi enjoying the sunny spot on the carpet! ☀️ #catlife', likes: 125, createdAt: new Date(new Date().setDate(new Date().getDate() - 1)) }, // Yesterday
    { id: 2, userName: 'Bob', userAvatar: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=B', petPhoto: 'https://placehold.co/600x400/93c5fd/333?text=Rocky', caption: 'Rocky loves his new frisbee! We played for hours today.', likes: 88, createdAt: new Date(new Date().setDate(new Date().getDate() - 4)) }, // 4 days ago
  ];

  const newPostsCount = communityPosts.filter(p => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return p.createdAt > threeDaysAgo;
  }).length;

  const newPostsText = newPostsCount > 0 ? `${newPostsCount} new post${newPostsCount > 1 ? 's' : ''}` : 'No new posts';

  const handleNavigation = (path) => {
    if (path) {
      navigate(`/${path}`);
    }
  };

  const heroButton = favoritePet ? (
    <button onClick={() => navigate(`/my-pets/${favoritePet.id}`)} data-pet-id={favoritePet.id} className="view-pet-profile-btn bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
      View {favoritePet.name}'s Profile
    </button>
  ) : (
    <button onClick={() => navigate('/my-pets')} className="view-pet-profile-btn bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
      View Pet Profiles
    </button>
  );

  const nextReminderCard = useMemo(() => {
    if (nextEvent) {
      let daysText = 'Today';
      if (nextEvent.daysUntil === 1) {
        daysText = 'Tomorrow';
      } else if (nextEvent.daysUntil > 1) {
        daysText = `${nextEvent.daysUntil} days`;
      }
      
      return (
        <QuickOverviewCard 
          onClick={() => navigate(nextEvent.link)} 
          icon='💉' 
          title='Next Reminder' 
          value={daysText}
          page='my-pets' 
          colorClass='bg-yellow-100 text-yellow-800' 
        />
      );
    }
    return (
      <QuickOverviewCard 
        disabled={true}
        icon='💉' 
        title='Next Reminder' 
        value='No upcoming' 
        page='my-pets' 
        colorClass='bg-yellow-100 text-yellow-800' 
      />
    );
  }, [nextEvent, navigate]);

  return (
    <div id="home" className="page-content">
      {/* Empty state for new users */}
      <div id="home-empty-state" className="hidden text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to PetCare!</h1>
        <p className="text-slate-500 mb-6">No pets yet? Let's add your furry friend and get started! 🐶💖</p>
        <button onClick={() => handleNavigation('my-pets')} data-page="my-pets" data-view="add-pet-form" className="shortcut-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
          Add Your First Pet
        </button>
      </div>

      {/* Main Dashboard for users with pets */}
      <div id="home-dashboard">
        {/* Hero Section */}
        <div id="home-hero-section" className="bg-gradient-to-br from-sky-100 to-amber-50 p-8 rounded-3xl shadow-lg mb-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <h1 className="text-4xl lg:text-5xl font-bold text-slate-800">Welcome back, User! 🐕</h1>
                      <p className="text-lg text-slate-600 mt-2">Your pet’s world, all in one place.</p>
                      <div className="mt-4 bg-yellow-100 text-yellow-800 text-sm font-semibold p-3 rounded-xl inline-block shadow">
                        <strong>Reminder:</strong> {nextEvent ? `${nextEvent.title} for ${nextEvent.petName}` : 'No upcoming reminders.'}
                      </div>
                      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        {heroButton}
                        <button onClick={() => navigate('/vet-doc#find-vet')} data-page="vet-doc" data-view="find-vet" className="shortcut-btn bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-full transition-colors">Book a Vet Visit</button>
                      </div>
                    </div>
                    <div className="relative w-48 h-48 flex-shrink-0">
                      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                        <path fill="#FDBF60" d="M100 180 C 60 180, 60 120, 100 120 C 140 120, 140 180, 100 180 Z" />
                        <path fill="#333" d="M100 120 Q 80 110, 70 90 T 70 60 Q 80 40, 100 40 Q 120 40, 130 60 T 130 90 Q 120 110, 100 120 Z" />
                        <circle className="blinking-eye" fill="white" cx="85" cy="75" r="8" />
                        <circle fill="black" cx="85" cy="75" r="4" />
                        <circle className="blinking-eye" fill="white" cx="115" cy="75" r="8" />
                        <circle fill="black" cx="115" cy="75" r="4" />
                        <path fill="none" stroke="black" strokeWidth="3" d="M95 95 Q 100 105, 105 95" />
                      </svg>
                    </div>
                  </div>
                </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <QuickOverviewCard onClick={() => handleNavigation('my-pets')} icon='🐾' title='Your Pets' value={`${pets.length} Profiles`} page='my-pets' colorClass='bg-sky-100 text-sky-800' />
          {nextReminderCard}
          <QuickOverviewCard 
            onClick={() => navigate('/vet-doc#consultations-vet')} 
            icon='🩺' 
            title='Recent Vet Visit' 
            value={recentVisit ? recentVisit.vetName : 'No recent visits'} 
            page='vet-doc' 
            view='consultations-vet' 
            colorClass='bg-red-100 text-red-800' 
          />
          <QuickOverviewCard onClick={() => handleNavigation('community')} icon='💬' title='Community' value={newPostsText} page='community' colorClass='bg-green-100 text-green-800' />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Community Highlight Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Community Highlights</h2>
              <div id="home-community-highlight" className="space-y-4">
                {communityPosts.map(post => <CommunityPost key={post.id} post={post} />)}
              </div>
              <div className="mt-4 text-center">
                <button onClick={() => handleNavigation('community')} data-page="community" className="shortcut-btn bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold py-2 px-5 rounded-full transition-colors">View More Posts</button>
              </div>
            </div>

            {/* Services For You */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Services For You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ServiceCard onClick={() => navigate('/services#Grooming')} icon="✂️" title="Grooming" description="Keep your pet looking sharp." page="services" view="grooming" />
                <ServiceCard onClick={() => navigate('/services#Adoption')} icon="🏠" title="Adoption" description="Find a new furry friend." page="services" view="adoption" />
                <ServiceCard onClick={() => navigate('/services#Training')} icon="🐕" title="Training" description="Professional training for your pet." page="services" view="training" />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Daily Tip / Fun Fact */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">🐾 Daily Tip</h2>
              <div id="home-daily-tip" className="bg-white rounded-2xl shadow-lg p-6">
                              <h3 className="font-bold text-lg text-slate-800">Keep Them Hydrated</h3>
                              <p className="text-sm text-slate-600 mt-1">Ensure your pet has access to fresh, clean water at all times, especially during warmer weather. Proper hydration is key to their health!</p>
                              <button className="text-sm font-semibold text-blue-600 hover:underline mt-3">Read More</button>
                            </div>
            </div>

            {/* Pet of the Week */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">🏅 Pet of the Week</h2>
              <div id="home-pet-of-the-week" className="bg-white rounded-2xl shadow-lg p-6">
                              <img src="https://placehold.co/600x400/d1c4e9/333333?text=Bella" className="w-full h-32 object-cover rounded-xl mb-4" />
                              <h3 className="font-bold text-lg text-slate-800">Bella</h3>
                              <p className="text-sm text-slate-500">owned by Ahmad</p>
                            </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Keep your pet happy, healthy, and famous!</h2>
          <p className="text-slate-500 mb-6">It all starts with creating a profile for your best friend.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => handleNavigation('my-pets')} data-page="my-pets" data-view="add-pet-form" className="shortcut-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors">Add Your Pet Now</button>
            <button onClick={() => handleNavigation('community')} data-page="community" className="shortcut-btn bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-colors">Join the Community</button>
          </div>
        </div>
      </div>
    </div>
  );
};















export default HomePage;
