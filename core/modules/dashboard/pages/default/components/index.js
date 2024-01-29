/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint max-len: ["error", { "code": 250 }] */
/* eslint-disable no-shadow */
import clsx from 'clsx';
import useStyles from '@modules/dashboard/pages/default/components/style';
import loginGqlService from '@modules/login/services/graphql';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { breakPointsUp } from '@helper_theme';
import MobileContent from '@modules/dashboard/pages/default/components/mobilegrid';

const DashboardContent = (props) => {
    const {
        summaryData,
        channelListData,
        t,
        orderAcces,
        shipmentAcces,
        returnAcces,
    } = props;
    const styles = useStyles();
    // User Info
    const desktop = breakPointsUp('sm');
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes && getCustomerRes.data && getCustomerRes.data.customer;
    const [username, setUsername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [customer_loc_code, setCustomerLocCode] = React.useState('');
    const [channel_code, setChannelCode] = React.useState('');
    const [group, setGroup] = React.useState('');
    const handleSetUserInfo = (customer) => {
        const firstnameTemp = customer && customer.firstname;
        const lastnameTemp = customer && customer.lastname;
        const emailTemp = customer && customer.email;
        const customerLocCodeTemp = customer && customer.customer_loc_code;
        const channelCodeTemp = customer && customer.channel_code;
        const groupTemp = customer && customer.group && customer.group.code;
        setUsername(`${firstnameTemp} ${lastnameTemp}`);
        setFirstname(`${firstnameTemp}`);
        setEmail(`${emailTemp}`);
        setCustomerLocCode(`${customerLocCodeTemp}`);
        setChannelCode(`${channelCodeTemp}`);
        setGroup(`${groupTemp}`);
    };
    const limitString = (string, limit) => {
        if (string.length > limit) {
            return `${string.substring(0, limit)}...`;
        }
        return string.substring(0, limit);
    };
    const router = useRouter();

    React.useEffect(() => {
        getCustomer();
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            handleSetUserInfo(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    // See more Dialog (virtual stock & location)
    const [openSeemoreDialog, setOpenSeemoreDialog] = React.useState(false);
    const [seemore, setSeemore] = React.useState({});

    const handleSeemoreOpen = (title, name, data) => {
        setOpenSeemoreDialog(true);
        setSeemore({
            title,
            name,
            data: data.join(', '),
        });
    };

    const handleSeemoreClose = () => {
        setOpenSeemoreDialog(false);
        setSeemore({});
    };

    const borderColorFilter = (framework, channel_code) => {
        if (framework === 'M1' || framework === 'M2') {
            return 'purple';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('bklp')) {
            return 'red';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('blib')) {
            return 'blibli';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('jdid')) {
            return 'red';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('lzda')) {
            return 'lazada';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('shpe')) {
            return 'shopee';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('srcl')) {
            return 'blue';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('tkpd')) {
            return 'tokopedia';
        }
        if (framework === 'Marketplace' && channel_code.toLowerCase().includes('zlra')) {
            return 'black';
        }
        return 'black';
    };

    return (
        <div className={clsx(styles.contentGrid)}>
            <div className={clsx(styles.info, styles.welcomeUser)}>
                <div className="title">
                    <span>
                        {t('dashboard:Hello')}
                        {' '}
                        {firstname}
                        ,
                        <br />
                        {t('dashboard:welcome_to_your_dashboard')}
                    </span>
                </div>
                <div className={styles.userWrapper}>
                    <div className={styles.user}>
                        <div className={styles.containerUser}>
                            <img className={styles.imgIcon} alt="" src="/assets/img/dashboard/people.svg" />
                            <div className="user-text">
                                <span className={styles.textName}>{username}</span>
                                <br />
                                <span>{group}</span>
                                <br />
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.textBold}>{t('dashboard:Location_Code')}</span>
                        <br />
                        <span>{limitString(customer_loc_code, 64)}</span>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.textBold}>{t('dashboard:Channel_Code')}</span>
                        <br />
                        <span>{limitString(channel_code, 64)}</span>
                    </div>
                    <div className={styles.user}>
                        <a href="#" onClick={() => router.push('/useredit')}>
                            {t('dashboard:Edit')}
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.gridBoxInfo}>
                    {orderAcces
                        && (
                            <div className={styles.boxInfo}>
                                <h3 className={clsx('colorBlue', styles.noMargin)}>{t('dashboard:Order')}</h3>
                                <div className={styles.infoDetail}>
                                    <span>
                                        {t('dashboard:You_have')}
                                        <br />
                                        <b>
                                            {summaryData.order_new}
                                            {' '}
                                            {t('dashboard:new_order')}
                                        </b>
                                        {' '}
                                        {t('dashboard:to_process')}
                                    </span>
                                    <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_order.svg" />
                                </div>
                                <div className={styles.infoStatusWrapperOrder}>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorBlue', styles.noMargin)}>{summaryData.order_no_allocation}</h2>
                                        <span>{t('dashboard:No_Allocation_Order')}</span>
                                    </div>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorBlue', styles.noMargin)}>{summaryData.order_failed}</h2>
                                        <span>{t('dashboard:Failed_Order')}</span>
                                    </div>
                                </div>
                                <a className="link" href="/order/allorder">
                                    {t('dashboard:Manage_Order')}
                                </a>
                            </div>
                        )}
                    {shipmentAcces
                        && (
                            <div className={styles.boxInfo}>
                                <h3 className={clsx('colorGreen', styles.noMargin)}>{t('dashboard:Shipment')}</h3>
                                <div className={styles.infoDetail}>
                                    <span>
                                        {t('dashboard:You_have')}
                                        <br />
                                        <b>
                                            {' '}
                                            {summaryData.shipment_unconfirmed_total}
                                            {' '}
                                            {t('dashboard:orders_to_confirm')}
                                        </b>
                                        {' '}
                                        {t('dashboard:and')}
                                        <br />
                                        <b>
                                            {' '}
                                            {summaryData.shipment_cannot_fulfill}
                                            {' '}
                                            {t('dashboard:orders_cannot_fulfill')}
                                        </b>
                                    </span>
                                    <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_shipment.svg" />
                                </div>
                                <div className={styles.infoStatusWrapperShipment}>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_store_pickup}</h2>
                                        <span>{t('dashboard:Store_Pickup')}</span>
                                    </div>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_home_delivery}</h2>
                                        <span>{t('dashboard:Home_Delivery')}</span>
                                    </div>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorGreen', styles.noMargin)}>{summaryData.shipment_unconfirmed_marketplace}</h2>
                                        <span>{t('dashboard:Marketplace')}</span>
                                    </div>
                                </div>
                                <a className="link" href="/sales/shipment">
                                    {t('dashboard:Manage_Shipment')}
                                </a>
                            </div>
                        )}
                    {returnAcces
                        && (
                            <div className={styles.boxInfo}>
                                <h3 className={clsx('colorOrange', styles.noMargin)}>{t('dashboard:Return')}</h3>
                                <div className={styles.infoDetail}>
                                    <img className="imgIcon" alt="" src="/assets/img/dashboard/icon_return.svg" />
                                </div>
                                <div className={styles.infoStatusWrapperReturn}>
                                    <div className={clsx(styles.infoStatus, 'statusCenter')}>
                                        <h2 className={clsx('colorOrange', styles.noMargin)}>{summaryData.return_new}</h2>
                                        <span>{t('dashboard:Request_to_Proceed')}</span>
                                    </div>
                                </div>
                                <a className="link" href="/return/managerma">
                                    {t('dashboard:Manage_Return')}
                                </a>
                            </div>
                        )}
                </div>
                <div className={styles.salesChannelTableWrapper}>
                    <h2>{t('dashboard:Sales_Channel')}</h2>
                    {desktop
                        ? (
                            <div className={styles.container}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td />
                                            <td style={{ textTransform: 'uppercase' }}>{t('dashboard:Channel')}</td>
                                            <td style={{ textTransform: 'uppercase' }}>{t('dashboard:Code')}</td>
                                            <td style={{ textTransform: 'uppercase' }}>{t('dashboard:Virtual_Stock')}</td>
                                            <td style={{ textTransform: 'uppercase' }}>{t('dashboard:Location')}</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {channelListData.map((e, idx) => (
                                            <tr key={idx}>
                                                <td className={clsx(borderColorFilter(e.framework, e.channel_code), 'channelIcon')}>
                                                    <img
                                                        className={styles.imageIcon}
                                                        alt=""
                                                        src={e.image_url}
                                                        onError={(event) => event.target.style.display = 'hidden'}
                                                    />
                                                </td>
                                                <td>{e.channel_name}</td>
                                                <td>{e.channel_code}</td>
                                                {e.virtual_stock_list ? (
                                                    <>
                                                        {e.virtual_stock_list.length > 3 && (
                                                            <td>
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
                                                            </td>
                                                        )}
                                                        {e.virtual_stock_list.length <= 3 && (
                                                            <td>
                                                                {e.virtual_stock_list[0]}
                                                                {e.virtual_stock_list[1] ? `, ${e.virtual_stock_list[1]}` : ''}
                                                                {e.virtual_stock_list[2] ? `, ${e.virtual_stock_list[2]}` : ''}
                                                            </td>
                                                        )}
                                                    </>
                                                ) : (
                                                    <td style={{ paddingLeft: 20 }}>-</td>
                                                )}
                                                {e.location_list ? (
                                                    <>
                                                        {e.location_list?.length > 3 && (
                                                            <td>
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
                                                            </td>
                                                        )}
                                                        {e.location_list?.length <= 3 && (
                                                            <td>
                                                                {e.location_list[0]}
                                                                {e.location_list[1] ? `, ${e.location_list[1]}` : ''}
                                                                {e.location_list[2] ? `, ${e.location_list[2]}` : ''}
                                                            </td>
                                                        )}
                                                    </>
                                                ) : (
                                                    <td style={{ paddingLeft: 20 }}>-</td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                        : (
                            <MobileContent
                                borderColorFilter={borderColorFilter}
                                handleSeemoreOpen={handleSeemoreOpen}
                                {...props}
                            />
                        )}
                </div>
            </div>
            <Dialog
                open={openSeemoreDialog}
                onClose={handleSeemoreClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <b>{seemore.name}</b>
                    &#39;s
                    {' '}
                    {seemore.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span className={clsx(styles.dialogTextContainer)}>{seemore.data}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSeemoreClose} color="primary" autoFocus>
                        {t('dashboard:OK')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DashboardContent;
