import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';

const EventContainer = styled.div<{ top: number; height: number; left: number; width: number }>`
  position: absolute;
  top: ${props => props.top}px;
  height: ${props => props.height}px;
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  .side-bar{
    background-color: #1d1f33;
    width: 5px;
    height: 100%;
    border-top-left-radius: 1px;
    border-bottom-left-radius: 1px;
  }
  .content{
    width: 100%;
  }
  .title{
    display: flex;
    align-items: center;
    padding: 2px 5px 3px 4px;
  }
  .ant-btn-sm{
    font-size: 10px !important;
  }
  h5{
    margin: 0px;
    flex: 1;
  }
  p{
    margin: 0px;
    padding-left: 5px;
    font-size: 12px;
    color: #666666;
  }
`;

const StyledIcon = styled(CloseOutlined)`
  color: #666666;
  cursor: pointer;
  font-size: 12px;
`;

export interface EventProps {
  title: string;
  top: number;
  height: number;
  left: number;
  width: number;
  onDelete: (title: string) => void;
}

const Event: React.FC<EventProps> = ({ title, top, height, left, width, onDelete }) => {
  const confirm: PopconfirmProps['onConfirm'] = () => {
    onDelete(title)
    message.success('Deleted Event Sccessfully');
  };

  const cancel: PopconfirmProps['onCancel'] = () => {
  };

  return (
    <EventContainer top={top} height={height} left={left} width={width}>
      <div className='side-bar'></div>
      <div className='content'>
        <div className='title'>
          <h5>{title}</h5>
          <Popconfirm
            title="Delete the Event"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
            <StyledIcon />
          </Popconfirm>
        </div>
        <p>Some content</p>
      </div>
    </EventContainer>
  );
};

export default Event;