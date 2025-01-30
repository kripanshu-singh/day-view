import React, { useState } from 'react';
import { TimePicker, Input, Button } from 'antd';
import { disabledHours, disabledMinutes, handleTimeChange } from './utils';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
    width: 300px;
    border-radius: 10px;
    background-color: #ececec;
`;

const StyledTimePicker = styled(TimePicker.RangePicker)`
    width: 100%;
`;

const { TextArea } = Input;
const AddEvent: React.FC = () => {
    const [time, setTime] = useState<string | null>(null);

    return (
        <StyledContainer>
            <StyledTimePicker
                use12Hours
                format={"h:mm a"}
                onChange={handleTimeChange}
                hideDisabledOptions
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
            />
            <Input showCount maxLength={20} onChange={() => { }} />
            <TextArea showCount maxLength={100} onChange={() => { }} placeholder="can resize" />
            <Button>Add Event</Button>
        </StyledContainer>
    );
};

export default AddEvent;