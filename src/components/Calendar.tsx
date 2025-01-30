import React from "react";
import styled from "styled-components";
import Event from "./Event";
import { calculatePosition, processEvents, EventProps } from "./utils";
import TimeLine from "./TimeLine";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 740px;
`;

const CalendarContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  height: fit-content;
  width: 620px;
  height: calc(100% - 20px);
  background-color: #ececec;
  position: relative;
  background-color: #ececec;
  border-left: 10px solid #ececec;
  border-right: 10px solid #ececec;
`;

interface CalendarProps {
  events: EventProps[];
  setEvent: React.Dispatch<React.SetStateAction<EventProps[]>>;
}

const Calendar: React.FC<CalendarProps> = ({ events, setEvent }) => {
  const allEvents = processEvents(events);

  const onDelete = (id: string) => {
    setEvent((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <StyledContainer>
      <TimeLine />
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
              onDelete={() => onDelete(event.id!)}
            />
          )),
        )}
      </CalendarContainer>
    </StyledContainer>
  );
};

export default Calendar;
