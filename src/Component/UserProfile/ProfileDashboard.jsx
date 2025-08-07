import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProfileSidebar from "./ProfileSidebar";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import UploadProfilePicture from "./UploadProfilePicture";


const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const SidebarColumn = styled.div`
  width: 16.666%; 
  
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ContentColumn = styled.div`
  width: 83.333%; 
  
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SidebarPaper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const BackLink = styled(Link)`
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #49BBBD;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: #3a9a9c;
  }
`;

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "update":
        return <UpdateProfile />;
      case "password":
        return <ChangePassword />;
      case "picture":
        return <UploadProfilePicture />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <Container>
      <SidebarColumn>
        <SidebarPaper>
          <ProfileSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </SidebarPaper>
      </SidebarColumn>
      
      <ContentColumn>
        <BackLink to="/">
          <IoIosArrowRoundBack />
          Back to home
        </BackLink>
        {renderContent()}
      </ContentColumn>
    </Container>
  );
};

export default ProfileDashboard;



