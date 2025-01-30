import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
`;

const StyledTime = styled.div<{ isBold: boolean }>`
    font-weight: ${props => (props.isBold ? "bold" : "normal")};
    font-size: 12px;
    margin: 5px 0;
`;

const TimeLine: React.FC = () => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 9);
    const slots = hours.flatMap((hour) => [
        { time: `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`, bold: true },
        { time: `${hour % 12 || 12}:30`, bold: false },
    ]);

    return (
        <StyledContainer>
            {slots.map((slot, index) => (
                <StyledTime
                    key={index}
                    isBold={slot.bold}
                >
                    {slot.time}
                </StyledTime>
            ))}
        </StyledContainer>
    );
};

export default TimeLine;
