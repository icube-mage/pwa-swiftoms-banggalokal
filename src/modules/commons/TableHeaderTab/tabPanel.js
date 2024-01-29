import React from 'react';

export const prefixTabPanel = 'tab-mui';
const TableHeaderTabPanel = (props) => {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            hidden={value !== index}
            role="tabpanel"
            id={`${prefixTabPanel}-${index}`}
            aria-labelledby={`${prefixTabPanel}-auto-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

export default TableHeaderTabPanel;
