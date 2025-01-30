"use client";
import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import "./index.css";
import AddEvent from "./components/AddEvent";
import styled from "styled-components";
import { events } from "./constant";
import { addId, EventProps } from "./components/utils";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  overflow: auto;
  min-height: 750px;
`;

const App: React.FC = () => {
  const [event, setEvent] = useState<EventProps[]>(addId(events));
  return (
    <div className="App">
      <Header />
      <StyledLayout id="layout">
        <Calendar events={event} setEvent={setEvent} />
        <AddEvent setEvent={setEvent} />
      </StyledLayout>
    </div>
  );
};

export default App;
