import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaFacebook, FaTwitter, FaWhatsapp, FaAngleDown, FaAngleRight } from "react-icons/fa";
import { MdOutlinePhoneIphone, MdOutlineAttachEmail } from "react-icons/md";
import { Sling as Hamburger } from "hamburger-react";
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // State to track open dropdown

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition >= 45);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = [
    { path: "/", link: "HOME" },
    { 
      link: "WHO WE ARE", 
      dropdown: [
        { path: "/about", link: "About NYA" },
        { path: "/working-committee", link: "NYA Working Committee" },
        { path: "/what-we-do", link: "What we do" },
        { path: "/who-we-serve", link: "Who We Serve" },
        { path: "/history", link: "Our History" },
        { path: "/leadership", link: "Leadership" },
      ] 
    },
    { 
      link: "MEDIA", 
      dropdown: [
        { path: "/news", link: "Press Release" },
        { path: "/gallery", link: "Galleries" },
        { path: "/videos", link: "Videos" },
      ] 
    },
    { path: "/contentions", link: "Contentions" },
    { path: "/resources", link: "Resources" },
    { path: "/contact", link: "Contact" },
    { path: "/more", link: "More..." },
  ];

  const toggleDropdown = (link) => {
    setOpenDropdown(openDropdown === link ? null : link); // Toggle dropdown state
  };

  return (
    <header className={`bg-[#FFF9EA] w-full z-50 fixed shadow-md`}>
      {/* Top header section */}
      <div className={`flex items-center border-b-[.1px] px-5 justify-end ${isScrolled ? 'opacity-0 invisible h-0' : 'opacity-100 visible h-11'} transition-opacity duration-500`}>
        <div className="mr-5 flex items-center"><MdOutlinePhoneIphone className="mr-1"/><h2>0807-370-3001</h2></div>
        <div className="mr-5 flex items-center"><MdOutlineAttachEmail className="mr-1"/><h2>info@nya.com</h2></div>
        <div className="lg:flex gap-4 items-center hidden ml-5">
          <Link to="/" className="hover:text-red-700">
            <FaFacebook />
          </Link>
          <Link to="/" className="hover:text-red-700">
            <FaTwitter />
          </Link>
          <Link to="/" className="hover:text-red-700">
            <FaWhatsapp />
          </Link>
        </div>
      </div>
      
      {/* Main navigation */}
      <nav className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="" className={`transition-all duration-500 ease-in-out ${isScrolled ? "w-10 absolute sm:left-28 top-[20px] :left-0" : "w-28 absolute top-[60px] left-12"}`} />
        </Link>

        {/* Desktop menu */}
        <ul className="md:flex gap-12 text-sm font-bold hidden" >
          {navItem.map(({ path, link, dropdown }) => (
            <li className="relative group py-2" key={link}>
              {dropdown ? (
                <span
                  className={`flex items-center cursor-pointer ${openDropdown === link ? 'text-red-700 underline-offset-4' : ''}`}
                  onClick={() => toggleDropdown(link)} // Toggle dropdown on click
                >
                  {link} {openDropdown === link ? <FaAngleDown className="ml-2" /> : <FaAngleRight className="ml-2" />}
                </span>
              ) : (
                <NavLink to={path} className={({ isActive }) => isActive ? "active" : ""}>
                  {link}
                </NavLink>
              )}
              {dropdown && openDropdown === link && (
                <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded hidden flex-col z-50 w-40">
                  {dropdown.map(({ path, link }) => (
                    <li key={path} className="hover:bg-green-400 hover:text-white">
                      <NavLink className="block px-4 py-2" to={path}>
                        {link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen}/>
        </div>
      </nav>

      {/* Mobile menu items */}
      <ul className={`md:hidden gap-12 text-sm text-center space-y-4 px-4 py-6 mt-14 bg-white fixed top-0 left-0 w-full transition-opacity duration-200 ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {navItem.map(({ path, link, dropdown }) => (
            <li className="text-black" key={link}>
              {dropdown ? (
                <>
                  <span
                    className={`cursor-pointer ${openDropdown === link ? 'text-red-700 underline' : ''}`}
                    onClick={() => toggleDropdown(link)} // Toggle dropdown on click
                  >
                    {link} {openDropdown === link ? <FaAngleDown className="ml-2" /> : <FaAngleRight className="ml-2" />}
                  </span>
                  <ul className={`${openDropdown === link ? 'block' : 'hidden'} space-y-2 mt-2`}>
                    {dropdown.map(({ path, link }) => (
                      <li key={path}>
                        <NavLink
                          className={({ isActive }) => (isActive ? "active" : "")}
                          onClick={() => setOpen(false)}
                          to={path}
                        >
                          {link}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setOpen(false)}
                  to={path}
                >
                  {link}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
    </header>
  );
};

export default Navbar;



