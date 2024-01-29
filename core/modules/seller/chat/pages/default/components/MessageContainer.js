/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@common_textfield';
import Button from '@common_button';
import useStyles from '@sellermodules/chat/pages/default/components/style';
import { relativeTimeFrom, initialName } from '@sellermodules/chat/helpers/index';
import formatDate from '@root/core/helpers/date';

import DropFile from '@common_dropfile';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';

const MessageContainer = (props) => {
    const {
        chat,
        db,
        clearChat,
        messages,
        formik,
        onFocusDeleteRead,
        handleDropFile,
        t,
    } = props;
    const classes = useStyles();
    const scrollRef = useRef();

    const containerMessageStyle = (msgObject1) => (
        msgObject1.is_customer_message === 'True'
            ? classes.messageLeftWrapper
            : classes.messageRightWrapper);

    const contentMessageText = (msgObject3) => (
        msgObject3.is_customer_message === 'True'
            ? classes.messageLeftText
            : classes.messageRightText
    );

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [messages]);

    const agentEmail = chat && chat.customer_email;
    const [dataStatus, setDataStatus] = React.useState('0');
    const doc = db.collection('status').doc(agentEmail);
    doc.onSnapshot((docSnapshot) => {
        const agentStatus = docSnapshot.data();
        setDataStatus(agentStatus?.status);
    });

    return (
        <>
            <div onClick={clearChat} className={classes.selectedUser}>
                <div className={classes.selectedUserImage}>
                    {/* <img alt="image" src="/assets/img/userchat.svg" /> */}
                    <span>
                        {initialName(chat.customer_name)}
                    </span>
                </div>
                <div className={classes.userText}>
                    <div className={classes.userName}>{chat.customer_name}</div>
                    <div className={clsx(classes.userLastMessage, 'full')}>
                        {dataStatus === '1' ? 'online'
                            : t('sellerchat:last_online_time_ago', { time: relativeTimeFrom(chat.lastMessage.time, t) })}
                    </div>
                </div>
            </div>
            <div className={classes.messageContent}>
                {
                    messages && messages.length > 0 && messages.map((message, i) => {
                        if (message.type && message.type === 'day') {
                            return (
                                <p key={i} className={classes.messageCenterDate}>
                                    {formatDate(message.date, 'D MMM YYYY')}
                                </p>
                            );
                        }
                        if (chat.chatId === `${message.customer_email}-${message.agent_code}`) {
                            return (
                                <div key={i} className={containerMessageStyle(message)}>
                                    <div className={classes.messageLeftContent}>
                                        {
                                            message.filename ? (
                                                <span className={contentMessageText(message)}>
                                                    {
                                                        message.filetype === 'image' ? (
                                                            <>
                                                                <img className={classes.messageImage} src={message.filename} alt="messageImage" />
                                                                <span>
                                                                    {formatDate(message.createdAt, 'HH:mm')}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <a href={message.filename} target="_blank" rel="noopener noreferrer">
                                                                    <img
                                                                        className={classes.fileImage}
                                                                        src="/assets/img/layout/seller/order.svg"
                                                                        alt="doc"
                                                                    />
                                                                    <div>
                                                                        Click to Open
                                                                    </div>
                                                                </a>
                                                                <span>
                                                                    {formatDate(message.createdAt, 'HH:mm')}
                                                                </span>
                                                            </>
                                                        )
                                                    }
                                                </span>
                                            ) : (
                                                <span className={contentMessageText(message)}>
                                                    {message.text || ' '}
                                                    <span>
                                                        {formatDate(message.createdAt, 'HH:mm')}
                                                    </span>
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                }
                <div ref={scrollRef} />
            </div>
            <div className={classes.formContent}>
                <div className={classes.uploadContainer}>
                    <DropFile
                        showFiles={false}
                        textButton={<AttachFileSharpIcon />}
                        formatFile=".jpg, .jpeg, .png, .gif"
                        getBase64={handleDropFile}
                    />
                </div>
                <form className={classes.messageForm} onSubmit={formik.handleSubmit}>
                    <TextField
                        name="message"
                        placeholder={t('sellerchat:Write_message')}
                        className={classes.searchInput}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={!!formik.errors.message}
                        errorMessage={formik.errors.message || null}
                        onFocus={() => onFocusDeleteRead(chat)}
                        inputProps={{
                            autocomplete: 'off',
                        }}
                    />
                    <Button
                        type="submit"
                        className={classes.messageButton}
                    >
                        <span className="buttonText">{t('sellerchat:Send_message')}</span>
                        <SendIcon className="buttonSendIcon" />
                    </Button>
                </form>
            </div>
        </>
    );
};

export default MessageContainer;
