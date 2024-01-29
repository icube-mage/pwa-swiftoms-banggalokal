/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@common_textfield';
import Button from '@common_button';

import useStyles from '@sellermodules/return/pages/detail/components/Message/style';

const MessagesContent = (props) => {
    const {
        formikMessage, t, data,
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.messageContent}>
            <div className={classes.checkDiv}>
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="is_customer_notified"
                            className={classes.checkbox}
                            checked={formikMessage.values.is_customer_notified}
                            onChange={formikMessage.handleChange}
                        />
                    )}
                    label={t('sellerreturn:Notify_Customer_by_Email')}
                    className={classes.controlLabel}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            name="is_visible_on_front"
                            className={classes.checkbox}
                            checked={formikMessage.values.is_visible_on_front}
                            onChange={formikMessage.handleChange}
                        />
                    )}
                    label={t('sellerreturn:Visible_to_Customer')}
                    className={classes.controlLabel}
                />
            </div>
            <div>
                <TextField
                    name="text"
                    multiline
                    value={formikMessage.values.text}
                    onChange={formikMessage.handleChange}
                    className={classes.textInput}
                    error={!!(formikMessage.touched.text && formikMessage.errors.text)}
                    helperText={(formikMessage.touched.text && formikMessage.errors.text) || ''}
                    maxRows={5}
                    minRows={5}
                />
                <Button
                    className={clsx(classes.btnAction, 'outlined')}
                    onClick={formikMessage.handleSubmit}
                >
                    {t('sellerreturn:Submit')}
                </Button>
            </div>
            <div className={classes.messageContainer}>
                {data.message?.map((msg) => (
                    <div key={msg.id} className={clsx(classes.message, msg.owner_type === 'admin' && 'right')}>
                        <div className="bold">{`${msg.customer_name}, ${msg.created_at}`}</div>
                        <div>{msg.text || '-'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesContent;
