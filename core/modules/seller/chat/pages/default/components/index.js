import React from 'react';
import useStyles from '@sellermodules/chat/pages/default/components/style';
import UserContainer from '@sellermodules/chat/pages/default/components/UserContainer';
import MessageContainer from '@sellermodules/chat/pages/default/components/MessageContainer';
import SkeletonLoader from '@sellermodules/chat/pages/default/components/SkeletonLoader';
import clsx from 'clsx';

const ChatContent = (props) => {
    const {
        chat,
        loading,
        selectUserToChat,
        clearChat,
        listUsers,
        db,
        messages,
        formik,
        changeSerchUser,
        searchText,
        handleSeachUser,
        onFocusDeleteRead,
        handleDropFile,
        t,
    } = props;
    const classes = useStyles();

    const desktopView = (
        <>
            <div className={clsx(classes.userContainer, 'hidden-mobile', 'hidden-sm')}>
                <UserContainer
                    chat={chat}
                    selectUserToChat={selectUserToChat}
                    listUsers={listUsers}
                    db={db}
                    changeSerchUser={changeSerchUser}
                    searchText={searchText}
                    handleSeachUser={handleSeachUser}
                    t={t}
                />
            </div>
            <div className={clsx(classes.messageContainer, 'hidden-mobile', 'hidden-sm')}>
                {
                    chat ? (
                        <MessageContainer
                            chat={chat}
                            db={db}
                            clearChat={clearChat}
                            messages={messages}
                            formik={formik}
                            onFocusDeleteRead={onFocusDeleteRead}
                            handleDropFile={handleDropFile}
                            t={t}
                        />
                    ) : <p className={classes.emptyText}>Select User to Chat</p>
                }
            </div>
        </>
    );

    const mobileView = (
        <>
            {
                !chat ? (
                    <div className={clsx(classes.userContainer, 'hidden-md', 'hidden-lg', 'hidden-xl')}>
                        <UserContainer
                            chat={chat}
                            selectUserToChat={selectUserToChat}
                            listUsers={listUsers}
                            db={db}
                            changeSerchUser={changeSerchUser}
                            searchText={searchText}
                            handleSeachUser={handleSeachUser}
                            t={t}
                        />
                    </div>
                ) : (
                    <div className={clsx(classes.messageContainer, 'hidden-md', 'hidden-lg', 'hidden-xl')}>
                        <MessageContainer
                            chat={chat}
                            db={db}
                            clearChat={clearChat}
                            messages={messages}
                            formik={formik}
                            onFocusDeleteRead={onFocusDeleteRead}
                            handleDropFile={handleDropFile}
                            t={t}
                        />
                    </div>
                )
            }
        </>
    );

    if (loading) {
        return (
            <SkeletonLoader />
        );
    }

    return (
        <div className={classes.container}>
            {desktopView}
            {mobileView}
        </div>
    );
};

export default ChatContent;
