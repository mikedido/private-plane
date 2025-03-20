import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastForwardFilled,
  FastBackwardFilled,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';



const CalendarSchedular: React.FC = () => {
  
  const [dateScheduler, setDateScheduler] = useState<dayjs.Dayjs>(dayjs());

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDateScheduler(date);
  };

  const handleNextDay = () => {
    setDateScheduler((dateScheduler) => dateScheduler.add(1, "day"));
  }

  const handleLastDay = () => {
    setDateScheduler((dateScheduler) => dateScheduler.add(-1, "day"));
  }

  const handleNextMonth = () => {
    setDateScheduler((dateScheduler) => dateScheduler.add(1, "month"));
  }

  const handleLastMonth = () => {
    setDateScheduler((dateScheduler) => dateScheduler.add(-1, "month"));
  }
  
  return (
    <Space direction="horizontal">
      <button onClick={handleLastMonth}><FastBackwardFilled /></button>
      <button onClick={handleLastDay}><StepBackwardOutlined /></button>
      <DatePicker onChange={onChange} value={dateScheduler} format={"YYYY/MM/DD"} allowClear={false}/>
      <button onClick={handleNextDay}><StepForwardOutlined /></button>
      <button onClick={handleNextMonth}><FastForwardFilled /></button>
    </Space>
  )
};

export default CalendarSchedular;