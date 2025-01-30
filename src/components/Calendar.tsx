import React from "react";
import styled from "styled-components";
import Event from "./Event";
import { calculatePosition, processEvents, EventProps } from "./utils";

const CalendarContainer = styled.div`
  width: 620px;
  height: 720px;
  padding: 0 10px;
  position: relative;
  background-color: #f5f5f5;
`;

const TimeSlot = styled.div`
  height: 60px;
  border-bottom: 1px solid #ddd;
`;

interface CalendarProps {
  events: EventProps[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const allEvents = processEvents(events);
  return (
    <CalendarContainer>
      {Array.from({ length: 12 }).map((_, index) => (
        <TimeSlot key={index} />
      ))}
      {allEvents.map((windowEvents, winIndex) =>
        windowEvents.map((event, index) => (
          <Event
            key={`${winIndex}-${index}`}
            title={event.title}
            top={calculatePosition(event.start)}
            height={calculatePosition(event.end - event.start)}
            left={event.left!}
            width={event.width!}
          />
        )),
      )}
    </CalendarContainer>
  );
};

export default Calendar;
