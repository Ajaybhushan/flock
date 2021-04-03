import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Select, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ScheduleTime from './ScheduleTime';
import { getAPI } from '../Utils/ApiCalls';
import { SOURCE_TYPE } from '../Constants/Urls';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    }
};

const DAY_OBJ = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7
};

const InputScreen = () => {
    // const onFinishFailed = errorInfo => {
    //     console.log('Failed:', errorInfo);
    // };

    const [executionMode, setExecutionMode] = useState('');
    const [scheduleCount, setScheduleCount] = useState(1);
    const [sourceType, setSourceType] = useState([]);
    const [timeSlot, setTimeSlot] = useState('');
    const [schedule, setSchedule] = useState([]);

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text'
        },
        onChange(info) {
            // console.log(info);
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    useEffect(() => {
        getAPI(SOURCE_TYPE).then(type => {
            setSourceType(type);
        });
    }, []);

    const onFinish = values => {
        //removing numeric from schedule values
        for (let key in values) {
            if (!isNaN(parseInt(key.slice(-1)))) {
                const newKey = key.replace(/[0-9]/g, '');
                values[newKey] = values[key];
                delete values[key];
            }
        }

        console.log(schedule);
    };

    const deleteEntry = () => {
        for (let key in schedule[0]) {
            if (schedule[0][key].length == 1) {
                const newSchedule = schedule;
                newSchedule.shift();
                setSchedule(newSchedule);
            } else {
                const newSchedule = schedule;
                schedule[0][key].pop();
            }
        }
    };

    return (
        <div style={{ marginTop: '60px', width: '800px' }}>
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label='Batch Name'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input batch name'
                        }
                    ]}>
                    <Input placeholder='Enter Batch Name' />
                </Form.Item>
                {/* <Form.Item
                    label='Source Type'
                    name='source_type'
                    rules={[
                        {
                            required: true,
                            message: 'Please select source type'
                        }
                    ]}>
                    <Select defaultValue={'select source type'}>
                        {sourceType.map((type, i) => (
                            <Option key={i} value={type.name}>
                                {type.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item> */}

                <Form.Item
                    label='Environment'
                    name='environment'
                    rules={[
                        {
                            required: true,
                            message: 'Please select environment'
                        }
                    ]}>
                    <Select defaultValue='local'>
                        <Option value='local'>Local</Option>
                        <Option value='stage'>Stage</Option>
                        <Option value='prod'>Prod</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Upload File'
                    name='uploadfile'
                    rules={[
                        {
                            required: true
                        }
                    ]}>
                    <Upload {...props} accept='.csv'>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label='Execution Mode'
                    name='execution_mode'
                    rules={[
                        {
                            required: true,
                            message: 'Please select executionmode'
                        }
                    ]}>
                    <Select defaultValue='Fixed' onChange={e => setExecutionMode(e)}>
                        <Option value='fixed'>Fixed</Option>
                        <Option value='scheduled'>Scheduled</Option>
                    </Select>
                </Form.Item>
                {executionMode == 'fixed' ? (
                    <Form.Item
                        label='Max Request'
                        name='maxrequest'
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Max no of requests'
                            }
                        ]}>
                        <Input placeholder='Enter no of requests' />
                    </Form.Item>
                ) : executionMode == 'scheduled' ? (
                    <div>
                        {[...Array(scheduleCount)].map((_, i) => (
                            <ScheduleTime key={i} id={i} setTime={setTimeSlot} schedule={{ schedule, setSchedule }} />
                        ))}
                        <Form.Item {...tailLayout}>
                            <Button
                                type='primary'
                                shape='circle'
                                onClick={() => setScheduleCount(scheduleCount + 1)}
                                style={{ marginRight: '30px' }}>
                                +
                            </Button>
                            <Button
                                danger
                                hidden={scheduleCount > 1 ? false : true}
                                shape='circle'
                                onClick={() => {
                                    setScheduleCount(scheduleCount - 1);
                                    deleteEntry();
                                }}>
                                -
                            </Button>
                        </Form.Item>
                    </div>
                ) : null}

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit' style={{ marginBottom: '30px' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default InputScreen;
