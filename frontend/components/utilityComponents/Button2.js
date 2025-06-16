import React from "react";
import styled from "styled-components";

const Button2 = ({ text, width = "120px", createPrivateRoom, loading }) => {
  return (
    <StyledButton onClick={createPrivateRoom} width={width} disabled={loading}>
      {loading ? "Loading..." : text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: #2f2f38;       /* Dark charcoal base */
  color: #e0e0e0;                  /* Light gray text */
  border: 1px solid #333348;       /* Subtle border */
  border-radius: 8px;
  width: ${(props) => props.width};
  height: 40px;
  font-weight: 300;
  cursor: pointer;

  /* Only transition the properties that are inexpensive: background, border, transform */
  transition: 
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #333348;     /* Slightly lighter on hover */
    border-color: #7c3aed;         /* Purple accent border */
    color: #ffffff;                /* White text on hover */
    transform: scale(1.02);        /* Subtle pop */
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button2;
