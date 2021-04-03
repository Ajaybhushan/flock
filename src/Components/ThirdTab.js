import React, { useEffect } from 'react';
import { BATCH_ID } from '../Constants/Urls';
import { getAPI } from '../Utils/ApiCalls';
import { useLocation } from 'react-router-dom';

const ThirdTab = () => {
    const location = useLocation();

    const param = location.pathname.replace('/thirdtab/', '');

    useEffect(() => {
        getAPI(BATCH_ID + '/' + param).then(res => {
            console.log(res);
        });
    }, []);

    return (
        <div>
            <h1>Third Tab</h1>
        </div>
    );
};

export default ThirdTab;
