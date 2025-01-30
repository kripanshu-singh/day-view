import React from "react";
import styled from "styled-components";
import { getSlots } from "./utils";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100px;
  justify-content: space-between;
  height: 100%;
  margin-right: 10px;
`;

const StyledTime = styled.div<{ $isbold: boolean }>`
  font-weight: ${(props) => (props.$isbold ? "bold" : "normal")};
  font-size: ${(props) => (props.$isbold ? "12px" : "11px")};
  margin: 5px 0;
  span {
    color: #aaaaaa;
    margin-left: 4px;
  }
`;

const TimeLine: React.FC = () => {


  return (
    <StyledContainer>
      {getSlots().map((slot, index) => (
        <StyledTime key={index} $isbold={slot.bold}>
          {slot.time}
          <span>{slot.type}</span>
        </StyledTime>
      ))}
    </StyledContainer>
  );
};

export default TimeLine;
