import React from 'react';
import styled from 'styled-components';

const EventContainer = styled.div<{ top: number; height: number; left: number; width: number }>`
  position: absolute;
  top: ${props => props.top}px;
  height: ${props => props.height}px;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  background-color: #4a90e2;
  color: white;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #000;
`;

export interface EventProps {
  title: string;
  top: number;
  height: number;
  left: number;
  width: number;
}

const Event: React.FC<EventProps> = ({ title, top, height, left, width }) => {
  return (
    <EventContainer top={top} height={height} left={left} width={width}>
      {title}
    </EventContainer>
  );
};

export default Event;