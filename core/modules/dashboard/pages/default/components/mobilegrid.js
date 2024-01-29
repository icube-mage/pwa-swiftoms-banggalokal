/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/default/components/style';

const DashboardMobileContent = (props) => {
    const {
        t, channelListData, borderColorFilter, handleSeemoreOpen,
    } = props;
    const styles = useStyles();

    return (
        <div className={styles.mobileContainer}>
            {
                channelListData.map((e, i) => (
                    <div
                        key={i}
                        className={clsx(styles.gridList, styles.content, borderColorFilter(e.framework, e.channel_code), 'channelIcon')}
                        style={{ gridTemplateColumns: '1fr repeat(2, 4fr)' }}
                    >
                        <img
                            className={styles.imageIcon}
                            alt=""
                            src={e.image_url}
                            onError={(event) => event.target.style.display = 'hidden'}
                        />
                        <div>
                            <div
                                style={{
                                    paddingLeft: 10,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    marginBottom: 10,
                                }}
                            >
                                <h5 className={styles.titleList}>{t('dashboard:Channel')}</h5>
                                <h5 className={styles.bodyList}>{e.channel_name}</h5>
                            </div>
                            <div
                                style={{
                                    paddingLeft: 10,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    marginBottom: 10,
                                }}
                            >
                                <h5 className={styles.titleList}>{t('dashboard:Code')}</h5>
                                <h5 className={styles.bodyList}>{e.channel_code}</h5>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    paddingLeft: 10,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    marginBottom: 10,
                                }}
                            >
                                <h5 className={styles.titleList}>{t('dashboard:Virtual_Stock')}</h5>
                                <h5 className={styles.bodyList}>
                                    {e.virtual_stock_list ? (
                                        <>
                                            {e.virtual_stock_list.length > 3 && (
                                                <span>
                                                    {e.virtual_stock_list[0]}
                                                    ,
                                                    {e.virtual_stock_list[1]}
                                                    ,
                                                    {e.virtual_stock_list[2]}
                                                    ,
                                                    {' '}
                                                    <a
                                                        className="link"
                                                        href="#"
                                                        onClick={() => handleSeemoreOpen('Virtual Stock List', e.channel_name, e.virtual_stock_list)}
                                                    >
                                                        <u>{t('dashboard:see_more')}</u>
                                                    </a>
                                                </span>
                                            )}
                                            {e.virtual_stock_list.length <= 3 && (
                                                <span>
                                                    {e.virtual_stock_list[0]}
                                                    {e.virtual_stock_list[1] ? `, ${e.virtual_stock_list[1]}` : ''}
                                                    {e.virtual_stock_list[2] ? `, ${e.virtual_stock_list[2]}` : ''}
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span style={{ paddingLeft: 20 }}>-</span>
                                    )}
                                </h5>
                            </div>

                            <div
                                style={{
                                    paddingLeft: 10,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    overflowWrap: 'break-word',
                                    marginBottom: 10,
                                }}
                            >
                                <h5 className={styles.titleList}>{t('dashboard:Location')}</h5>
                                <h5 className={styles.bodyList}>
                                    {e.location_list ? (
                                        <>
                                            {e.location_list?.length > 3 && (
                                                <span>
                                                    {e.location_list[0]}
                                                    ,
                                                    {e.location_list[1]}
                                                    ,
                                                    {e.location_list[2]}
                                                    ,
                                                    {' '}
                                                    <a
                                                        className="link"
                                                        href="#"
                                                        onClick={() => handleSeemoreOpen(t('dashboard:Location_List'), e.channel_name, e.location_list)}
                                                    >
                                                        <u>{t('dashboard:see_more')}</u>
                                                    </a>
                                                </span>
                                            )}
                                            {e.location_list?.length <= 3 && (
                                                <span>
                                                    {e.location_list[0]}
                                                    {e.location_list[1] ? `, ${e.location_list[1]}` : ''}
                                                    {e.location_list[2] ? `, ${e.location_list[2]}` : ''}
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span style={{ paddingLeft: 20 }}>-</span>
                                    )}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default DashboardMobileContent;
