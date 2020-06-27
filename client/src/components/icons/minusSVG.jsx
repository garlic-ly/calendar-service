import React from 'react';
import styled from 'styled-components';

const MinusSignSVG = styled.svg`
  display: block;
  fill: none;
  height: 12px;
  width: 12px;
  stroke: #717171;
  stroke-width: 5.33333;
  overflow: visible;
`;

const MinusSVG = () => (
  <MinusSignSVG aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="m2 16h28" />
  </MinusSignSVG>
);

export default MinusSVG;
