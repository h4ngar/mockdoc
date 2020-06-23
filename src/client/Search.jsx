import React, { Fragment, useState } from 'react';
import { Input } from 'antd';

export const Search = (props) => {
    return (
        <Input onChange={props.onChange} style={{width: 600}} placeholder={'Search: Id, Url, Title or Category'}/>
    );
};
