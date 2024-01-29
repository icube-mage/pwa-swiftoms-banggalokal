/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import Table from '@sellermodules/promotion/pages/coupon/list/components/Table';
import useStyles from '@sellermodules/promotion/pages/coupon/list/components/style';
import { statuses } from '@sellermodules/promotion/helpers';

const PromotionContent = (props) => {
    const classes = useStyles();
    const { data, loading, getSellerPromotions, t } = props;
    const promotionList = (data && data.getSellerPromotions && data.getSellerPromotions.items) || [];
    const promotionTotal = (data && data.getSellerPromotions && data.getSellerPromotions.total_count) || 0;

    const columns = [
        { field: 'name', headerName: t('sellerpromotion:Name'), sortable: true, initialSort: 'ASC' },
        { field: 'coupon_code', headerName: t('sellerpromotion:Coupon_Code'), sortable: true },
        { field: 'from_date', headerName: t('sellerpromotion:From_Date'), sortable: true },
        { field: 'to_date', headerName: t('sellerpromotion:To_Date'), sortable: true },
        { field: 'is_active', headerName: t('sellerpromotion:Status') },
        { field: 'action', headerName: t('sellerpromotion:Action') },
    ];

    const rows = promotionList.map((promo) => ({
        ...promo,
        id: promo.rule_id,
        is_active: () => (
            (promo.is_active === true
                ? (
                    <span>
                        {t('sellerpromotion:Active')}
                    </span>
                )
                : (
                    <span>
                        {t('sellerpromotion:In_Active')}
                    </span>
                ))
        ),
        action: () => (
            <span className={classes.link} aria-hidden="true">
                <Link href={`/seller/promotion/coupon/edit/${promo.rule_id}`}>
                    {t('sellerpromotion:Details')}
                </Link>
            </span>
        ),
    }));

    return (
        <>
            <Table
                header={t('sellerpromotion:Coupon')}
                loading={loading}
                columns={columns}
                getRows={getSellerPromotions}
                rows={rows}
                statuses={statuses}
                count={promotionTotal}
                searchPlaceholder={t('sellerpromotion:Search_for_Name_or_Coupon_Code')}
            />
        </>
    );
};

export default PromotionContent;
