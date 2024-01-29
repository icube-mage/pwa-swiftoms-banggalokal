/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Checkbox from '@common_checkbox';

import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

const TableHeader = (props) => {
    const {
        t,
        dataSellerChannelList = [],
        sellerChannel,
        handleCheckedFilter,
        statusSync,
        setStatusSync,
        pathnameFilter,
        setPathnameFilter,
    } = props;

    const classes = useStyles();

    const router = useRouter();
    const tabStatus = router?.query;
    const getTabStatus = pathnameFilter?.status.query.status;

    const filterStatus = [
        {
            value: 'active',
            label: t('queue_active'),
        },
        {
            value: 'queue',
            label: t('queue_queue'),
        },
        {
            value: 'failed',
            label: t('queue_failed'),
        },
    ];
    const isMultiCheckbox = (source, value) => {
        return source.includes(value);
    };

    useEffect(() => {
        setPathnameFilter({
            status: { query: tabStatus },
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
            <span style={{ fontWeight: 'bold', marginBottom: 10 }}>
                { getTabStatus !== 'list' ? t('channel_seller') : t('Sync_Status')}
            </span>
            {getTabStatus !== 'list' ? (
                <>
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
                            checked={sellerChannel === _dt.channel_code}
                            setChecked={(e) => handleCheckedFilter(e.target.checked, _dt.channel_code, 'seller_channel')}
                            className={classes.checkboxOptionFilter}
                            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                            icon={<span className={classes.icon} />}
                        />
                    ))}
                </>
            ) : (
                <>
                    {filterStatus.map((v) => {
                        return (
                            <Checkbox
                                key={v.value}
                                name={v.value}
                                label={v.label}
                                checked={isMultiCheckbox(statusSync, v.value)}
                                setChecked={(e) => {
                                    let tmpStatusSync = statusSync || [];
                                    if (e?.target?.checked) {
                                        tmpStatusSync.push(v.value);
                                    } else {
                                        delete tmpStatusSync[tmpStatusSync.indexOf(v.value)];
                                    }
                                    setStatusSync(tmpStatusSync.filter((z) => z.length > 0));
                                }}
                                className={classes.checkboxOption}
                                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                icon={<span className={classes.icon} />}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default TableHeader;
