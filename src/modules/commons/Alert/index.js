/* eslint-disable no-restricted-imports */
import React from 'react';
import useStyles from '@common_alert/style';
import classNames from 'classnames';
import { Alert, AlertTitle } from '@material-ui/lab';

const AlertContent = ({
    severity = 'info', // error || warning || info || success
    titleMultiple = [],
    title,
    info,
    close = '',
    containerClassName = '',
    contentClassName = '',
    titleClassName = '',
}) => {
    const classes = useStyles();

    return titleMultiple.length > 0 ? (
        <Alert severity={severity} className={classNames(classes.containerAlert, containerClassName)} onClose={close}>
            {titleMultiple.map((e) => (
                <div className={classNames(classes.divContent, contentClassName)}>
                    <AlertTitle className={classNames(classes.title, titleClassName)}>{e.title}</AlertTitle>
                    {e.info}
                </div>
            ))}
        </Alert>
    ) : (
        <Alert severity={severity} className={classNames(classes.containerAlert, containerClassName)} onClose={close}>
            <div className={classNames(classes.divContent, contentClassName)}>
                {title && <AlertTitle className={classNames(classes.title, titleClassName)}>{title}</AlertTitle>}
                {info}
            </div>
        </Alert>
    );
};

export default AlertContent;
