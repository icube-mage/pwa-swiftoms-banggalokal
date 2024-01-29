/* eslint-disable no-unused-expressions */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import Confirmation from '@sellermodules/promotion/pages/bundling/detail/components/Confirmation';
import Variants from '@sellermodules/promotion/pages/bundling/detail/components/Variants';
import useStyles from '@sellermodules/promotion/pages/bundling/detail/components/style';

const BundlingDetailContent = (props) => {
    const {
        t, data, handleStopBundling, open, setOpen,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const canStop = data.bundle_status.label !== 'Expire' && data.bundle_status.label !== 'Canceled';

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/promotion/bundling')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellerpromotion:Bundling')}</h2>
            </div>
            <Paper className={classes.paper}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6} sm="auto" className={classes.center}>
                        <div className={classes.imgBack}>
                            <img className={classes.icon} src="/assets/img/sellericon/bundling.svg" alt="bundling" />
                        </div>
                    </Grid>
                    {canStop
                        && (
                            <Hidden smUp>
                                <Grid item xs={6} className={classes.end}>
                                    <Tooltip title={t('sellerpromotion:Stop_Bundling')} arrow>
                                        <IconButton className={classes.close} onClick={() => setOpen(true)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Hidden>
                        )}
                    <Hidden smUp>
                        <Grid item xs={12}>
                            <span className={clsx(classes.text, 'big')}>{data.name}</span>
                            <br />
                            <span className={clsx(classes.text, 'light')}>{`Bundling ID : ${data.entity_id}`}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.status}>{data.bundle_status.label}</div>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <span className={clsx(classes.text)}>{data.start_period}</span>
                            {' '}
                            -
                            <br />
                            <span className={clsx(classes.text)}>{data.end_period || `(${t('sellerpromotion:Active_until_stock_runs_out')})`}</span>
                        </Grid>
                    </Hidden>
                    <Hidden xsDown>
                        <Grid item xs={12} sm="auto" md={9}>
                            <span className={clsx(classes.text, 'big')}>{data.name}</span>
                            {' '}
                            <span className={classes.slash} />
                            {' '}
                            <span className={clsx(classes.text, 'light')}>{`Bundling ID : ${data.entity_id}`}</span>
                            {' '}
                            <span className={classes.slash} />
                            <span className={classes.status}>{data.bundle_status.label}</span>
                            <div style={{ height: 10 }} />
                            <span className={clsx(classes.text)}>{data.start_period}</span>
                            {' '}
                            -
                            {' '}
                            <span className={clsx(classes.text)}>{data.end_period || `(${t('sellerpromotion:Active_until_stock_runs_out')})`}</span>
                        </Grid>
                    </Hidden>
                    {canStop
                        && (
                            <Hidden xsDown>
                                <Grid item xs="auto" className={classes.end}>
                                    <Tooltip title={t('sellerpromotion:Stop_Bundling')} arrow>
                                        <IconButton className={classes.close} onClick={() => setOpen(true)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Hidden>
                        )}
                </Grid>
            </Paper>
            <Paper className={classes.paper}>
                <InputLabel htmlFor="period" className={classes.label}>
                    {t('sellerpromotion:Bundling_Product_List')}
                </InputLabel>
                <TableContainer className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow className={clsx(classes.tr, 'head')}>
                                <Hidden xsDown>
                                    <TableCell className={classes.th} />
                                </Hidden>
                                <TableCell className={clsx(classes.th, 'fix')}>{t('sellerpromotion:Product_Information')}</TableCell>
                                <TableCell className={classes.th}>{t('sellerpromotion:Price')}</TableCell>
                                <Hidden xsDown>
                                    <TableCell padding="checkbox" className={classes.th} />
                                </Hidden>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.items?.map((item, i) => (
                                <>
                                    <TableRow key={i} className={clsx(classes.rowItem, i % 2 && 'dark')}>
                                        <Hidden xsDown>
                                            <TableCell
                                                className={clsx(classes.td, !!item.variants?.length && 'noborder', 'border')}
                                                padding="checkbox"
                                            />
                                        </Hidden>
                                        <TableCell className={clsx(classes.td, !!item.variants?.length && 'noborder', 'border')}>
                                            <Grid container spacing={2} className={classes.infoDiv}>
                                                <Grid item xs={12} lg={4} className={classes.centerMd}>
                                                    <div
                                                        className={classes.img}
                                                        style={{
                                                            backgroundImage: `url(${item.image_url || '/assets/img/placeholder_image.jpg'})`,
                                                        }}
                                                        alt="prev-img"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={8} container direction="column" spacing={1}>
                                                    <Grid item xs className={classes.break}>
                                                        {item.name}
                                                    </Grid>
                                                    <Grid item xs className={classes.break}>
                                                        {`SKU : ${item.vendor_sku}`}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className={clsx(classes.td, !!item.variants?.length && 'noborder')}>
                                            {item.variants?.length ? '' : <div className={classes.divider}>{item.price_formatted}</div>}
                                        </TableCell>
                                        <Hidden xsDown>
                                            <TableCell padding="checkbox" className={clsx(classes.td, !!item.variants?.length && 'noborder')}>
                                                {' '}
                                            </TableCell>
                                        </Hidden>
                                    </TableRow>
                                    {!!item.variants?.length && (
                                        <Variants {...props} rowItem={item} rowIndex={i} />
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={3} className={classes.totalDiv}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.containerImg}>
                            <div>
                                {t('sellerpromotion:Bundling')}
                                {' '}
                                :
                                {' '}
                            </div>
                            <div className="flex">
                                {data?.items?.map((item, idx) => (
                                    <div className={classes.group} key={idx}>
                                        <div className={classes.imgGroup}>
                                            <div className={classes.imgContainer}>
                                                <img
                                                    className={classes.imgThumb}
                                                    src={item.image_url || '/assets/img/placeholder_image.jpg'}
                                                    alt="media_img"
                                                />
                                            </div>
                                        </div>
                                        {(idx !== (data?.items?.length - 1)) && '+'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <div className={classes.totalText}>
                            <span className="title">{t('sellerpromotion:Total_Package_Price')}</span>
                            <br />
                            <span className="total">
                                {data.total_price_formatted}
                            </span>
                        </div>
                    </Grid>
                    {data.quota === null || !data.quota?.length ? null
                        : (
                            <Grid item xs={12} sm={6} md={4}>
                                <div className={classes.totalText}>
                                    <span className="title">{t('sellerpromotion:Remaining_Quota')}</span>
                                    <br />
                                    {data.quota.map((loc) => (
                                        <span className="total">
                                            {loc.loc_name}
                                            {': '}
                                            {loc.quota
                                                ? t('stock_of_quota_packages', { stock: `${loc.stock || 0}`, quota: loc.quota })
                                                : t('sellerpromotion:No_Quota')}
                                            <br />
                                        </span>
                                    ))}
                                </div>
                            </Grid>
                        )}
                </Grid>
            </Paper>
            <Confirmation
                open={open}
                onConfirm={handleStopBundling}
                onCancel={() => setOpen(false)}
                data={data}
                t={t}
            />
        </div>
    );
};

export default BundlingDetailContent;
