import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="dot-spinner">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`dot-spinner__dot dot-spinner__dot--${i + 1}`}
          />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .dot-spinner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    --uib-speed: 0.9s;
    height: 2.8rem;
    width: 2.8rem;
  }

  .dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;

    &::before {
      content: "";
      height: 20%;
      width: 20%;
      border-radius: 50%;
      background-color: #7c3aed; /* Purple accent */
      opacity: 0;
      animation: pulse-theme var(--uib-speed) ease-in-out infinite;
      box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);
      transform: scale(0);
    }
  }

  /* Position each dot around a circle */
  /* 8 dots at 45° increments */
  .dot-spinner__dot--1 {
    transform: rotate(0deg);
  }
  .dot-spinner__dot--2 {
    transform: rotate(45deg);
  }
  .dot-spinner__dot--3 {
    transform: rotate(90deg);
  }
  .dot-spinner__dot--4 {
    transform: rotate(135deg);
  }
  .dot-spinner__dot--5 {
    transform: rotate(180deg);
  }
  .dot-spinner__dot--6 {
    transform: rotate(225deg);
  }
  .dot-spinner__dot--7 {
    transform: rotate(270deg);
  }
  .dot-spinner__dot--8 {
    transform: rotate(315deg);
  }

  /* Staggered animation delays */
  .dot-spinner__dot--1::before {
    animation-delay: calc(var(--uib-speed) * -1);
  }
  .dot-spinner__dot--2::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
  }
  .dot-spinner__dot--3::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
  }
  .dot-spinner__dot--4::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
  }
  .dot-spinner__dot--5::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
  }
  .dot-spinner__dot--6::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
  }
  .dot-spinner__dot--7::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
  }
  .dot-spinner__dot--8::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
  }

  @keyframes pulse-theme {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.3;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default Loader;
