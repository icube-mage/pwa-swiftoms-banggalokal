/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/picklistitem/components/style';

const PickListItemContent = (props) => {
    const {
        pickList,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.h2}>{pickList.name}</h2>
                    <span className={classes.text}>{`${t('batchlist:SKU')} ${pickList.sku}`}</span>
                    <span className={classes.text}>{pickList.location || '-'}</span>
                    {(pickList.image) ? (
                        <img className={classes.img} src={pickList.image} alt="" />
                    ) : (
                        <img className={classes.imgPlaceholder} src="/assets/img/placeholder_image.jpg" alt="" />
                    )}
                    <span className={classes.text}>{t('batchlist:Qty_item_to_pick')}</span>
                    <h2 className={clsx(classes.h2, 'quantity')}>{pickList.qty}</h2>
                    <Button
                        className={classes.btn}
                        onClick={() => router.push(`/pickpack/batchlist/picklistitem/scan/${pickList.id}`)}
                        variant="contained"
                    >
                        {t('batchlist:SCAN')}
                    </Button>

                    <Link href={`/pickpack/batchlist/edit/picklist/${pickList.parentId}`}>
                        <a className={classes.linkBack}>{t('batchlist:Back_to_Pick_List')}</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default PickListItemContent;
