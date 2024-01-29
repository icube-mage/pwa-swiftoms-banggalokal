/* eslint-disable react/no-danger */
import React from 'react';

const TemplatePreviewContent = (props) => {
    const { template } = props;

    return (
        <div dangerouslySetInnerHTML={{ __html: template }} />

    );
};

export default TemplatePreviewContent;
