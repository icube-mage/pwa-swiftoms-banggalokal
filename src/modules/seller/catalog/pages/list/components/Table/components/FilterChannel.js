/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import { useState, useEffect } from 'react';
import clsx from 'clsx';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Popper from '@material-ui/core/Popper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@common_button';
import Checkbox from '@common_checkbox';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

const FilterDialog = (props) => {
    const { anchorEl, setAnchorEl, children } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    if (!isDesktop) {
        return (
            <Dialog classes={{ root: classes.dialogChannelRoot }} fullWidth open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        );
    }

    return (
        <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} className={classes.filterPopper}>
            {children}
        </Popper>
    );
};

const TableHeader = (props) => {
    const {
        t,
        dataSellerChannelList = [],
        filters,
        setFilters,
        debouncedSellerChannel,
        sellerChannel,
        handleCheckedFilter,
        catalogStatus,
    } = props;

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpenButton = (event, set) => {
        set(anchorEl ? null : event.currentTarget);
    };

    const insertFilter = (field, array = []) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        const temp = [...array];
        if (index >= 0) {
            temp.splice(index, 1, field);
        } else {
            temp.push(field);
        }
        return temp;
    };

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    useEffect(() => {
        let temp = [...filters];
        temp = insertFilter({
            field: 'channel_code',
            name: 'channel_code',
            type: 'in',
            value: sellerChannel.map(({ channel_code }) => channel_code),
        }, temp);
        setFilters([...temp]);
    }, [debouncedSellerChannel]);

    if (catalogStatus === 'list') {
        return null;
    }

    return (
        <div>
            <Button
                className={clsx(classes.btnFilter, 'gray')}
                onClick={(e) => handleClickOpenButton(e, setAnchorEl)}
                endIcon={
                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                }
            >
                {t('sellercatalog:channel_seller')}
            </Button>
            <FilterDialog anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                    {dataSellerChannelList.map((_dt) => (
                        <Checkbox
                            key={_dt.channel_code}
                            name={_dt.channel_name}
                            label={(
                                <div className={classes.flexChannel}>
                                    <div className={classes.imgChannelContainer}>
                                        <div
                                            className={classes.imgChannel}
                                            style={{
                                                backgroundImage: `url(${_dt.image_url
                                                    || '/assets/img/placeholder_image.jpg'})`,
                                            }}
                                            alt="channel-img"
                                        />
                                    </div>
                                    {_dt.channel_name}
                                </div>
                            )}
                            checked={!!sellerChannel?.find(({ channel_code }) => channel_code === _dt.channel_code)}
                            setChecked={(e) => handleCheckedFilter(e.target.checked, _dt, 'seller_channel')}
                            className={classes.checkboxOptionFilter}
                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                            icon={<span className={classes.icon} />}
                        />
                    ))}
                </div>
            </FilterDialog>
        </div>
    );
};

export default TableHeader;
