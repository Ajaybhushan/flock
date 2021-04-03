import React, { memo, useEffect, useState } from 'react';
import { Divider, Form, Input, Select, TimePicker } from 'antd';

const { Option } = Select;

const ListView = ({ schedule, id }) => {
    const [maxReq, setMaxReq] = useState('');
    const [day, setDay] = useState('Monday');
    const [time, setTime] = useState([]);
    let add = time[1] + day + maxReq;

    useEffect(() => {
        if (maxReq != '' && day != '' && time != '') {
            let sameKey = false;
            if (schedule.schedule.length) {
                const slot = {
                    ['time_slot']: time[0] + '-' + time[1],
                    ['max_request_in_parallel']: maxReq
                };
                const stateArr = [...schedule.schedule];
                stateArr.forEach(obj => {
                    for (let key in obj) {
                        if (key == day) {
                            obj[key].push(slot);
                            schedule.setSchedule(stateArr);
                            sameKey = true;
                        }
                    }
                });
                if (!sameKey) {
                    const obj = {
                        [day]: [
                            {
                                ['time_slot']: time[0] + '-' + time[1],
                                ['max_request_in_parallel']: maxReq
                            }
                        ]
                    };
                    const arr = [];
                    arr.push(obj);
                    schedule.setSchedule(prevState => [...arr, ...prevState]);
                }
            } else {
                const obj = {
                    [day]: [
                        {
                            ['time_slot']: time[0] + '-' + time[1],
                            ['max_request_in_parallel']: maxReq
                        }
                    ]
                };
                const arr = [];
                arr.push(obj);
                schedule.setSchedule(prevState => [...arr, ...prevState]);
            }
        }
    }, [add]);

    console.log(schedule.schedule);

    return (
        <div style={{ marginLeft: '200px' }}>
            <Form.Item
                label='Max Request'
                name={'max_request_in_parallel' + id}
                rules={[
                    {
                        required: true
                    }
                ]}>
                <Input type='text' placeholder='Enter max request' onBlur={e => setMaxReq(e.target.value)} />
            </Form.Item>
            <Form.Item
                label='Schedule day'
                name={'scheduleday' + id}
                rules={[
                    {
                        required: true
                    }
                ]}>
                <Select defaultValue='Monday' onChange={e => setDay(e)}>
                    <Option value='Monday'>Monday</Option>
                    <Option value='Tuesday'>Tuesday</Option>
                    <Option value='Wednesday'>Wednesday</Option>
                    <Option value='Thursday'>Thursday</Option>
                    <Option value='Friday'>Friday</Option>
                    <Option value='Saturday'>Saturday</Option>
                    <Option value='Sunday'>Sunday</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='Schedule Time'
                name={'time_slot' + id}
                rules={[
                    {
                        required: true
                    }
                ]}>
                <TimePicker.RangePicker onChange={(e, t) => setTime(t)} format={'HH:mm'} />
            </Form.Item>
            <Divider />
        </div>
    );
};

export default memo(ListView);
