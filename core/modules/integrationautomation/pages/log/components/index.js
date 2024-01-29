import React from 'react';

const TemplateViewContent = (props) => {
    const { data, dataKey } = props;

    function renderJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return str;
        }
        if (dataKey === 'action') {
            const parsed = JSON.parse(data[dataKey]);
            if (typeof parsed.connection_detail?.headers === 'string') {
                parsed.connection_detail.headers = JSON.parse(parsed.connection_detail?.headers);
            }
            return <pre>{JSON.stringify(parsed, undefined, 4)}</pre>;
        }
        return JSON.stringify(JSON.parse(str), undefined, 4);
    }

    return (
        <pre>{renderJSON(data[dataKey])}</pre>
    );
};

export default TemplateViewContent;
