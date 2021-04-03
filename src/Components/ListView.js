import { Divider, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BATCH_GET } from '../Constants/Urls';
import { getAPI } from '../Utils/ApiCalls';

const ListView = () => {
    const [batchData, setBatchData] = useState([]);

    useEffect(() => {
        getAPI(BATCH_GET).then(res => {
            console.log(res);
            setBatchData(res);
        });
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <NavLink to={`/thirdtab/${text}/`}>{text}</NavLink>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Environment',
            dataIndex: 'environment',
            key: 'environment'
        },
        {
            title: 'Execution Mode',
            dataIndex: 'execution_mode',
            key: 'execution_mode'
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state'
        },
        {
            title: 'Source Type',
            dataIndex: 'source_type',
            key: 'source_type'
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: 'Modified At',
            dataIndex: 'modified_at',
            key: 'modified_at'
        },
        {
            title: 'Config',
            dataIndex: 'config',
            key: 'config',
            render: text =>
                Object.keys(text).map(key =>
                    text[key].map(data => (
                        <div style={{ display: 'flex' }}>
                            <p>
                                Day : <b>{key}</b>
                            </p>
                            <p>
                                Time Slot : <b>{data['time_slot']}</b>
                            </p>
                            <p>
                                Max Requests : <b>{data['max_requests']}</b>
                            </p>
                        </div>
                    ))
                )
        }
    ];

    return (
        <div>
            <Table style={{ margin: '30px' }} columns={columns} dataSource={batchData} />
        </div>
    );
};

export default ListView;
