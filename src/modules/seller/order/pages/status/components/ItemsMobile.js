/* eslint-disable react/no-danger */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TableContainer from '@material-ui/core/TableContainer';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const ItemsMobile = (props) => {
    const {
        orderItem, t,
    } = props;

    const classes = useStyles();

    return (
        <TableContainer>
            <div className={classes.tableMobile}>
                {orderItem?.filter((item) => !item.isChild).map((item) => (
                    <>
                        <div className="row-grid">
                            <div className="child fullwidth">
                                <h4>{t('order:Product_Name')}</h4>
                                <div className="item">
                                    {item.name || '-'}
                                    {item?.variants?.map((variant) => (
                                        <Fragment key={variant.value}>
                                            <br />
                                            {`${variant.label}: ${variant.value}`}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="child fullwidth">
                                <h4>{t('order:SKU')}</h4>
                                <div className="item">
                                    {item.vendor_sku || item.sku || '-'}
                                </div>
                            </div>
                            <div className="child">
                                <h4>{t('order:Price')}</h4>
                                <div className="item">
                                    {item.sell_price}
                                </div>
                            </div>
                            <div className="child" style={{ textAlign: 'center' }}>
                                <h4>{t('order:Qty')}</h4>
                                <div className="item">
                                    {item.qty}
                                </div>
                            </div>
                            <div className="child" style={{ textAlign: 'right' }}>
                                <h4>{t('order:Subtotal')}</h4>
                                <div className="item">
                                    {item.isChild ? '' : item.subtotal}
                                </div>
                            </div>
                            {item.failed[0] && (
                                <Accordion className="child fullwidth">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <span>{t('order:Failed_Reasons')}</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="child action">
                                            <h4>{t('order:Failed_Reasons')}</h4>
                                            <div className="item">
                                                {item.failed[0]?.reason.reason_label || ''}
                                            </div>
                                        </div>
                                        <div className="child action">
                                            <h4>{t('order:Recommendation')}</h4>
                                            <div className="item">
                                                <div className={classes.reasonAction} dangerouslySetInnerHTML={{ __html: item.failed[0]?.reason?.actions?.action_value }} />
                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </div>
                        {!!item.bundle_children?.length && item.bundle_children?.map((child) => (
                            <div className="row-grid">
                                <div className="child fullwidth">
                                    <h4>{t('order:Product_Name')}</h4>
                                    <div className="item">
                                        {`- ${child.name}`}
                                    </div>
                                </div>
                                <div className="child fullwidth">
                                    <h4>{t('order:SKU')}</h4>
                                    <div className="item">
                                        {child.vendor_sku || child.sku}
                                    </div>
                                </div>
                                <div className="child">
                                    <h4>{t('order:Price')}</h4>
                                    <div className="item">
                                        {item.sell_price}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!!item.remark && (
                            <div className="row-grid">
                                <div className="child fullwidth">
                                    <img src="/assets/img/note.svg" alt="note" style={{ marginRight: 10 }} />
                                    <div className="item">
                                        {item.remark}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ))}
            </div>
        </TableContainer>
    );
};

export default ItemsMobile;
