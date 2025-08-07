import  { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDropDownLine } from "react-icons/ri";
import PropTypes from 'prop-types';

const FilterButton = styled.div`
  position: relative;
  padding: 8px 40px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.$show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropdownButton = ({ label, options, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    if (onSelect && typeof onSelect === 'function') {
      onSelect(option);
    }
  };

  return (
    <FilterButton onClick={toggleDropdown}>
      {selectedOption} 
      <RiArrowDropDownLine />
      <DropdownMenu $show={showDropdown}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </FilterButton>
  );
};

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DropdownButton;