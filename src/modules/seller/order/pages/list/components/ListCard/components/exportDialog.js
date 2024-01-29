/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import clsx from 'clsx';
import { breakPointsUp } from '@helper_theme';
import dayjs from 'dayjs';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
    StaticDateRangePicker,
    LocalizationProvider,
    StaticDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import gqlService from '@sellermodules/order/services/graphql';

import TextField from '@common_textfield';
import { sendDataLayer } from '@helper_gtm';
import Button from '@common_button';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';
import Link from 'next/link';
import { PRIMARY } from '@theme_color';

const ExportOrder = (props) => {
    const {
        t, open, setOpen,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const [selected, setSelected] = React.useState([null, null]);
    const [showMonth, setShowMonth] = React.useState(false);
    const [enableWeek, setEnableWeek] = React.useState(false);
    const value = '';
    const nowToday = new Date();
    const nowTodayMonth = dayjs(nowToday).get('month');
    const nowTodayYear = dayjs(nowToday).get('year');

    const handleClose = () => {
        setOpen(false);
        setSelected([null, null]);
        setShowMonth(false);
        setEnableWeek(false);
    };

    const handlePeriod = (time) => {
        const today = new Date();
        const days7 = new Date(Date.now() - 6 * (3600 * 1000 * 24));
        const days30 = new Date(Date.now() - 29 * (3600 * 1000 * 24));

        setEnableWeek(false);
        if (time === 'today') {
            setSelected([today, today]);
            setShowMonth(false);
        } else if (time === 'seven') {
            setSelected([days7, today]);
            setShowMonth(false);
        } else if (time === 'thirty') {
            setSelected([days30, today]);
            setShowMonth(false);
        } else {
            const convertMonth = dayjs(time).get('month');
            const convertYear = dayjs(time).get('year');
            const startMonth = new Date(convertYear, convertMonth, 1);
            const endMonth = new Date(convertYear, convertMonth + 1, 0);
            if (convertMonth > nowTodayMonth && convertYear === nowTodayYear) {
                setSelected([null, null]);
            } else {
                (convertMonth === nowTodayMonth && convertYear === nowTodayYear) ? setSelected([startMonth, nowToday]) : setSelected([startMonth, endMonth]);
            }
        }
    };

    const handleNewDate = (e) => {
        if (enableWeek) {
            let useDate = null;
            if (dayjs(e[0]).format() < dayjs(selected[0]).format()) {
                useDate = e[0];
            } else if (e[1]) {
                useDate = e[1];
            } else {
                useDate = e[0];
            }
            const today = new Date();
            let endDate = new Date(dayjs(useDate).day(6).format());
            if (endDate > today) {
                endDate = today;
            }
            setSelected([dayjs(useDate).day(0).format(), dayjs(endDate).format()]);
        } else {
            setSelected(e);
            if (selected.every((e) => e !== null)) {
                setSelected([e[0], null]);
            }
        }
    };

    const disabledButton = selected[0] === null || selected[1] === null;

    const [exportSelerOrder] = gqlService.exportSelerOrder();
    const downloadOrder = async () => {
        const dataLayer = {
            event: 'export_order',
            eventLabel: 'Order - Export Order',
        };
        sendDataLayer(dataLayer);

        setOpen(false);
        window.backdropLoader(true);
        await exportSelerOrder({
            variables: {
                date_from: dayjs(selected[0]).format('YYYY-MM-DD'),
                date_to: selected[1] ? dayjs(selected[1]).format('YYYY-MM-DD') : dayjs(selected[0]).format('YYYY-MM-DD'),
            },
        }).then((res) => {
            if (res?.data?.exportSelerOrder) {
                window.toastMessage({
                    open: true,
                    text: (
                        <span>
                            {`${t('export_order_success')}. ${t('check_and_download')} ${t('in')}`}
                            <Link href="/seller/report/history">
                                <a style={{ textDecoration: 'underline', color: PRIMARY }}>
                                    {t('report_seller_history')}
                                </a>
                            </Link>
                        </span>
                    ),
                    variant: 'success',
                    duration: 5000,
                });
            } else if (res?.errors[0]?.message) {
                window.toastMessage({
                    variant: 'error',
                    text: res?.errors[0]?.message || t('Failed'),
                    open: true,
                });
            }
        }).catch((e) => {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
            setOpen(false);
        });
        window.backdropLoader(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.dialogContainer }}
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('sellercatalog:Export_Order')}
                <IconButton className={classes.closeButtonDialog} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={clsx(classes.content, 'two-columns')}>
                <LocalizationProvider dateAdapter={DateFnsUtils}>
                    {!showMonth
                        && (
                            <StaticDateRangePicker
                                displayStaticWrapperAs={isDesktop ? 'desktop' : 'mobile'}
                                disableFuture
                                showToolbar={false}
                                minDate={selected[0] && (selected.every((e) => e !== null) ? null : dayjs(selected[0]).subtract(31, 'day').format())}
                                maxDate={selected[0] && (selected.every((e) => e !== null) ? null : dayjs(selected[0]).add(31, 'day').format())}
                                value={selected}
                                onChange={(e) => {
                                    handleNewDate(e);
                                }}
                                renderInput={(startProps, endProps) => (
                                    <>
                                        <TextField {...startProps} />
                                        <TextField {...endProps} />
                                    </>
                                )}
                            />
                        )}
                    {showMonth
                        && (
                            <StaticDatePicker
                                orientation="potrait"
                                displayStaticWrapperAs="desktop"
                                openTo="month"
                                value={value}
                                views={['year', 'month']}
                                minDate={new Date('2000-01-01')}
                                maxDate={nowToday}
                                onChange={(e) => handlePeriod(e)}
                                renderInput={(props) => <TextField {...props} />}
                            />
                        )}
                </LocalizationProvider>
                <div className={classes.divPeriod}>
                    <h2>{t('sellercatalog:Time_Period')}</h2>
                    <div className={classes.btnGrid}>
                        <Button className={classes.btnTime} onClick={() => handlePeriod('today')}>
                            {t('sellercatalog:Today')}
                        </Button>
                        <Button className={classes.btnTime} onClick={() => handlePeriod('seven')}>
                            {t('sellercatalog:Last_7_days')}
                        </Button>
                        <Button className={classes.btnTime} onClick={() => handlePeriod('thirty')}>
                            {t('sellercatalog:Last_30_days')}
                        </Button>
                        <hr />
                        <Button
                            className={clsx(classes.btnTime, enableWeek ? 'focus' : null)}
                            onClick={() => {
                                setSelected([null, null]);
                                setEnableWeek(true);
                                setShowMonth(false);
                            }}
                        >
                            {t('sellercatalog:Per_week')}
                        </Button>
                        <Button
                            className={clsx(classes.btnTime, showMonth ? 'focus' : null)}
                            onClick={() => {
                                setShowMonth(true);
                                setEnableWeek(false);
                            }}
                        >
                            {t('sellercatalog:Per_month')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
            <DialogContent className={classes.contentBottom}>
                <div>
                    <Button disabled={disabledButton} className={clsx(classes.btn, classes.btnExport)} onClick={downloadOrder}>
                        {t('sellercatalog:Download')}
                    </Button>
                    <div className={classes.infoDateRange}>
                        {selected[0] !== null
                            && <span>{dayjs(selected[0]).format('DD MMMM YYYY')}</span>}
                        { (selected[1] !== null)
                            && <span>{` - ${dayjs(selected[1]).format('DD MMMM YYYY')}`}</span>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExportOrder;
