import React from "react";
import styled from "styled-components";
import Event from "./Event";
import { calculatePosition, processEvents, EventProps } from "./utils";
import TimeLine from "./TimeLine";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: auto;
  .holder{
    border: 1px solid #e0e0e0;
    border-radius: 6px; 
    height: fit-content;
  }
`;

const CalendarContainer = styled.div`
  width: 620px;
  height: 720px;
  position: relative;
  background-color: #ececec;
  border-left: 10px solid #ececec;
  border-right: 10px solid #ececec;
`;

interface CalendarProps {
  events: EventProps[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const allEvents = processEvents(events);

  const onDelete = (title: string) => {
    console.log('Delete:', title);
  };

  return (
    <StyledContainer>
      <TimeLine />
      <div className="holder">
        <CalendarContainer>
          {allEvents.map((windowEvents, winIndex) =>
            windowEvents.map((event, index) => (
              <Event
                key={`${winIndex}-${index}`}
                title={event.title}
                top={calculatePosition(event.start)}
                height={calculatePosition(event.end - event.start)}
                left={event.left!}
                width={event.width!}
                onDelete={onDelete}
              />
            )),
          )}
        </CalendarContainer>
      </div>
    </StyledContainer>
  );
};

export default Calendar;
