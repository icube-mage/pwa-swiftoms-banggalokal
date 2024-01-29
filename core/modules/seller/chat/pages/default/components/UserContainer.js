import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import useStyles from '@sellermodules/chat/pages/default/components/style';
import User from './User';

const UserContainer = (props) => {
    const {
        chat,
        selectUserToChat,
        listUsers,
        db,
        changeSerchUser,
        searchText,
        handleSeachUser,
        t,
    } = props;
    const classes = useStyles();
    return (
        <>
            <form className={classes.formUserSearch} onSubmit={handleSeachUser}>
                <TextField
                    name="search"
                    placeholder={t('sellerchat:Search_user')}
                    className={classes.searchInput}
                    value={searchText}
                    onChange={changeSerchUser}
                />
                <Button
                    type="submit"
                    className={classes.searchButton}
                >
                    <img alt="" src="/assets/img/searchchat.svg" />
                </Button>
            </form>
            <div className={classes.overflowUser}>
                {
                    listUsers && listUsers.length > 0 ? listUsers.map((user, i) => (
                        <User
                            key={i}
                            chat={chat}
                            user={user}
                            db={db}
                            selectUserToChat={selectUserToChat}
                        />
                    )) : <p className={classes.emptyText}>No User Found</p>
                }
            </div>
        </>
    );
};

export default UserContainer;
