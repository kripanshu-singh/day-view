import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100px;
  justify-content: space-between;
  height: 740px;
  /* height: calc(100vh - 54px); */
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
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  const slots = hours.flatMap((hour) => [
    {
      time: `${hour % 12 || 12}:00`,
      bold: true,
      type: `${hour >= 12 ? "PM" : "AM"}`,
    },
    { time: `${hour % 12 || 12}:30`, bold: false, type: "" },
  ]);
  slots.pop();

  return (
    <StyledContainer>
      {slots.map((slot, index) => (
        <StyledTime key={index} $isbold={slot.bold}>
          {slot.time}
          <span>{slot.type}</span>
        </StyledTime>
      ))}
    </StyledContainer>
  );
};

export default TimeLine;
