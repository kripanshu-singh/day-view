import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 100px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    justify-content: space-between;
    height: 740px;
`;

const StyledTime = styled.div<{ isBold: boolean }>`
    font-weight: ${props => (props.isBold ? "bold" : "normal")};
    font-size: 12px;
    margin: 5px 0;
    span{
        color: #aaaaaa;
        margin-left: 4px;
    }
`;

const TimeLine: React.FC = () => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 9);
    const slots = hours.flatMap((hour) => [
        { time: `${hour % 12 || 12}:00`, bold: true, type: `${hour >= 12 ? "PM" : "AM"}` },
        { time: `${hour % 12 || 12}:30`, bold: false, type: "" },
    ]);
    slots.pop();

    return (
        <StyledContainer>
            {slots.map((slot, index) => (
                <StyledTime
                    key={index}
                    isBold={slot.bold}
                >
                    {slot.time}
                    <span>{slot.type}</span>
                </StyledTime>
            ))}
        </StyledContainer>
    );
};

export default TimeLine;
