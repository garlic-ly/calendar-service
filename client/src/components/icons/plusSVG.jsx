import React from 'react';
import styled from 'styled-components';

const PlusSignSVG = styled.svg`
  display: block;
  fill: none;
  height: 12px;
  width: 12px;
  stroke: #717171;
  stroke-width: 5.33333;
  overflow: visible;
`;

const PlusSVG = () => (
  <PlusSignSVG aria-hidden="true" role="presentation" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="m2 16h28m-14-14v28" />
  </PlusSignSVG>
);

export default PlusSVG;
