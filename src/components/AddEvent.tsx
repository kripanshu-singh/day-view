import React, { useState } from 'react';
import { TimePicker, Input, Button, message } from 'antd';
import { disabledHours, disabledMinutes, handleTimeChange } from './utils';
import styled from 'styled-components';
import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;
    width: 300px;
    border-radius: 10px;
    background-color: #ececec;
    .label{
        margin-bottom: -10px;
        margin-top: -5px;
        align-self: baseline;
        font-size: 13px;
    }
    .required{
        color: red;
    }
`;

const StyledTimePicker = styled(TimePicker.RangePicker)`
    width: 100%;
`;

interface Data {
    start: number | null;
    end: number | null;
    title: string;
}

const AddEvent: React.FC = () => {
    const [data, setData] = useState<Data>({ start: null, end: null, title: '' });
    console.log("🚀 ~ data:", data)

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
        setData((prev) => ({ ...prev, title: e.target.value }));
    };

    const onTimeChange = (times: [Dayjs | null, Dayjs | null] | null) => {
        const timeObject = handleTimeChange(times);
        setData((prev) => ({ ...prev, ...timeObject }));
    };
    const onAdd = () => {
        const id = uuidv4();
        console.log('Add:', { ...data, id });
         message.success('Added Event Sccessfully');
    };

    return (
        <StyledContainer>
            <span className='label'>Select Time<span className='required'> *</span></span>
            <StyledTimePicker
                use12Hours
                format={"h:mm a"}
                onChange={onTimeChange}
                hideDisabledOptions
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
            />
            <span className='label'>Event Title<span className='required'> *</span></span>
            <Input showCount maxLength={30} onChange={onTitleChange} />
            <Button disabled={!data.start || !data.end || !data.title} onClick={onAdd}>Add Event</Button>
        </StyledContainer>
    );
};

export default AddEvent;