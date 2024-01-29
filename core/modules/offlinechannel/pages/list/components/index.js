/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
import React from 'react';
import Header from '@modules/offlinechannel/pages/list/components/Header';
import useStyles from '@modules/offlinechannel/pages/list/components/style';
import clsx from 'clsx';

import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import Link from 'next/link';

import MaterialButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelListContent = (props) => {
    const {
        data,
        getChannelList,
        deleteChannel,
        firstLoad,
        setFirstLoad,
        loading,
        t,
    } = props;
    const classes = useStyles();

    const channelList = data?.getChannelList?.items || [];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [active, setActive] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [confirmDelete, setConfirmDelete] = React.useState('');

    const handleClick = (event, item) => {
        setActive(item);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        if (active && active.channel_id) {
            setConfirmDelete(false);
            window.backdropLoader(true);
            deleteChannel({ variables: { id: active.channel_id } });
        }
    };

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (!firstLoad) {
            const onChangeTimeOut = setTimeout(() => {
                getChannelList({
                    variables: {
                        search,
                    },
                });
                return null;
            }, 500);

            return () => clearTimeout(onChangeTimeOut);
        }
        if (firstLoad) {
            setFirstLoad(false);
        }
    }, [search]);

    return (
        <div className={classes.contentContainer}>
            <Header search={search} setSearch={setSearch} t={t} />
            {loading ? (
                <div className={classes.centerDiv}>
                    <CircularProgress className={classes.progress} />
                </div>
            )
                : channelList.length
                    ? channelList.map((item, idx) => (
                        <div className={classes.listContainer} key={idx}>
                            <div className={classes.centerDiv}>
                                <img
                                    src={item.image_url}
                                    alt=""
                                    className={classes.icon}
                                    onError={(event) => event.target.style.display = 'none'}
                                />
                            </div>
                            <div style={{ paddingLeft: 20 }}>
                                <span className={classes.channelName}>
                                    {item.channel_name}
                                </span>
                                <br />
                                <span className={classes.channelCode}>
                                    {`${t('offlinechannel:Channel_Code')}:`}
                                    <br />
                                    {item.channel_code}
                                </span>
                            </div>
                            <div className={classes.centerDiv}>
                                <MaterialButton
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    onClick={(e) => handleClick(e, item)}
                                >
                                    <SettingsIcon style={{ fontSize: 36 }} />
                                </MaterialButton>
                            </div>
                        </div>
                    )) : (
                        <div className={classes.centerDiv}>
                            <span className={classes.noRecords}>{t('offlinechannel:No_records_found')}</span>
                        </div>
                    )}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem
                    classes={{
                        root: clsx(classes.menuItem, 'purple'),
                    }}
                >
                    <Link href={active?.channel_id ? `/oms/channel/edit/${active.channel_id}_offlinechannel` : '/'}>
                        {t('offlinechannel:Edit')}
                    </Link>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setConfirmDelete(true);
                    }}
                    classes={{
                        root: classes.menuItem,
                    }}
                >
                    {t('offlinechannel:Delete')}
                </MenuItem>
            </Menu>
            <ConfirmDialog
                open={confirmDelete}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title={t('offlinechannel:Delete_Channel')}
                message={t('offlinechannel:Are_you_sure_want_to_delete_this_channel')}
            />
        </div>
    );
};

export default ChannelListContent;
