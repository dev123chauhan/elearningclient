import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import noProfile from "../../assets/noProfile.jpg";
import {  FaBars, FaTimes } from "react-icons/fa";
import { User, LogOut, LayoutDashboard, Bell  } from 'lucide-react';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  transition: all 0.3s ease;
  background-color: ${({ $scrolled }) => ($scrolled ? 'white' : 'transparent')};
  color: ${({ $scrolled }) => ($scrolled ? 'black' : 'white')};
  box-shadow: ${({ $scrolled }) => ($scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none')};
  opacity: 1;

  @media (max-width: 992px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoSideBar = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style-type: none;

    li {
      margin: 0 15px;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  button {
    margin-left: 10px;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    ${'' /* display: none; */}
  }
`;

const LoginButton = styled.button`
  background-color: ${({ $scrolled }) => ($scrolled ? '#53bfba' : 'white')};
  color: ${({ $scrolled }) => ($scrolled ? 'white' : '#53bfba')};
`;

const SignUpButton = styled.button`
  background-color: #53bfba;
  color: white;
  border: 1px solid #53bfba !important;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 0 2px #53bfba;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.3s ease;
  z-index: 1000;
  min-width: 200px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #d4fff1;
  }

  svg {
    margin-right: 10px;
    font-size: 18px;
    color: #53bfba;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 8px 0;
`;

const UserInfo = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const UserEmail = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: inherit;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-1530px')};
  width: 100%;
  height: 100vh;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 2000;
  padding: 20px;
`;

const SidebarCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const SidebarNav = styled.nav`
  margin-top: 60px;

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 30px;
    }

    a {
      text-decoration: none;
      color: #333;
      font-size: 16px;
    }
  }
`;



function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <HamburgerButton onClick={toggleSidebar}>
          <FaBars />
        </HamburgerButton>
        <Logo>E-learning</Logo>
        <Nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/career">Careers</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/meeting">Meeting</Link></li>
          </ul>
        </Nav>
        {user ? (
          <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
          <Bell size={35}/> 
          <ProfileContainer ref={dropdownRef}>
            <ProfileImage
              onClick={toggleDropdown}
              alt={user.name}
              src={user?.profileImage ? `https://elearningserver-ochre.vercel.app/uploads/${user.profileImage}` : noProfile}
            />
            <Dropdown $isOpen={isDropdownOpen}>
              <UserInfo>
                <UserName>{user.username}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
              <DropdownItem onClick={() => navigate('/profile')}>
              <User />
                My Profile
              </DropdownItem>
              <DropdownItem onClick={() => navigate('/dashboard')}>
              <LayoutDashboard />
                Dashboard
              </DropdownItem>
              <Divider />
              <DropdownItem onClick={handleLogout}>
              <LogOut />
                Logout
              </DropdownItem>
            </Dropdown>
          </ProfileContainer>
          </div>
        ) : (
          <ButtonGroup>
            <Link to="/auth">
              <LoginButton $scrolled={scrolled}>Login</LoginButton>
            </Link>
            <Link to="/auth">
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </ButtonGroup>
        )}
      </HeaderContainer>

      <Sidebar $isOpen={isSidebarOpen}>
        <LogoSideBar>E-learning</LogoSideBar>
        <SidebarCloseButton onClick={toggleSidebar}>
          <FaTimes />
        </SidebarCloseButton>
        <SidebarNav>
          <ul>
            <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
            <li><Link to="/courses" onClick={toggleSidebar}>Courses</Link></li>
            <li><Link to="/career" onClick={toggleSidebar}>Careers</Link></li>
            <li><Link to="/blog" onClick={toggleSidebar}>Blog</Link></li>
            <li><Link to="/meeting" onClick={toggleSidebar}>Meeting</Link></li>
          </ul>
        </SidebarNav>
        
     
      </Sidebar>
    </>
  );
}

export default Header;
















