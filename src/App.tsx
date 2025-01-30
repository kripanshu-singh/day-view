import React from 'react';
import Calendar from './components/Calendar';
import Header from './components/Header';
import './index.css';
import AddEvent from './components/AddEvent';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: calc(100vh - 64px);
  overflow: auto;
  width: 100%;
  justify-content: space-around;
`;

const events = [
  { title: 'A item', start: 10, end: 90 },
  { title: 'B item', start: 20, end: 80 },
  { title: 'C item', start: 70, end: 180 },
  { title: 'D item', start: 90, end: 180 },
  { title: 'E item', start: 200, end: 270 },
  { title: 'F item', start: 230, end: 290 },
  { title: 'G item', start: 300, end: 340 },
  { title: 'Sample item', start: 350, end: 400 },
  { title: 'Sample item', start: 370, end: 580 },
  { title: 'Sample item', start: 410, end: 480 },
  { title: 'Sample item', start: 450, end: 590 },
  { title: 'Sample item', start: 500, end: 595 },
  { title: 'Sample item', start: 530, end: 590 },
  { title: 'Sample item', start: 600, end: 660 },
  { title: 'Sample item', start: 650, end: 690 },
  { title: 'Sample item', start: 670, end: 710 },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <StyledLayout>
        <Calendar events={events} />
        <AddEvent />
      </StyledLayout>
    </div>
  );
};

export default App;