import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const navLinks = [
  { to: '/my-pets', text: 'My Pets' },
  { to: '/vet-doc', text: 'Vet Doc' },
  { to: '/community', text: 'Community' },
  { to: '/services', text: 'Services for You' },
  { to: '/marketplace', text: 'Marketplace' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { cart } = useContext(CartContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeLinkClass = 'bg-blue-500 text-white';
  const inactiveLinkClass = 'text-slate-600 hover:bg-slate-100';

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 9.5a2.5 2.5 0 0 1 0 5h-5a2.5 2.5 0 0 1 0-5h5Z"/>
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
                <path d="M12 16c-2.67 0-5.18-1.28-6.84-3.34a.5.5 0 0 1 .68-.72A11.02 11.02 0 0 0 12 13.5a11.02 11.02 0 0 0 6.16-1.56.5.5 0 0 1 .68.72C17.18 14.72 14.67 16 12 16Z"/>
              </svg>
              <span className="font-bold text-2xl text-slate-800">PetCare</span>
            </NavLink>
          </div>

          {/* Main Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-2 bg-slate-100 p-2 rounded-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-button font-medium rounded-full py-2 px-5 transition-colors duration-300 ${isActive ? activeLinkClass : inactiveLinkClass}`
                }
              >
                {link.text}
              </NavLink>
            ))}

          </div>


          {/* Profile Icon & Cart */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Cart Button */}
            <NavLink to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition bg-slate-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              id="profile-link-desktop"
              className={({ isActive }) =>
                `nav-button block rounded-full transition-transform transform hover:scale-105 focus:outline-none bg-slate-100 p-1 ${isActive ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`
              }
            >
              <svg className="paw-icon h-10 w-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="paw-group" fill="#718096">
                  <path className="paw-pad main-pad" d="M 50,75 C 40,95 20,85 25,65 C 30,45 70,45 75,65 C 80,85 60,95 50,75 Z" />
                  <circle className="paw-pad toe-1" cx="25" cy="45" r="10" />
                  <circle className="paw-pad toe-2" cx="42" cy="32" r="9" />
                  <circle className="paw-pad toe-3" cx="58" cy="32" r="9" />
                  <circle className="paw-pad toe-4" cx="75" cy="45" r="10" />
                </g>
              </svg>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Cart Button */}
            <NavLink to="/cart" className="relative mr-4 p-2 text-gray-700 hover:text-blue-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </NavLink>
            <button
              onClick={toggleMobileMenu}
              className="text-slate-600 hover:text-slate-800 focus:outline-none p-2 rounded-md hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden pb-4 space-y-2 ${isMobileMenuOpen ? '' : 'hidden'}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `nav-button block w-full text-left py-2 px-4 rounded-md ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              {link.text}
            </NavLink>
          ))}
          
          <NavLink
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `nav-button flex items-center space-x-3 w-full py-3 px-4 rounded-md ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profile</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
