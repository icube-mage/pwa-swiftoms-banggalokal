import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';

const BatchListPickListContent = (props) => {
    const {
        itemProps,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <div className={classes.section}>
                    <h5 className={classes.name}>
                        {itemProps.name}
                    </h5>
                    <p className={classes.text}>
                        {`${t('picklist:SKU')} ${itemProps.sku}`}
                    </p>
                    <p className={classes.text}>
                        {`${t('picklist:Loc')} ${itemProps.location}`}
                    </p>
                </div>
                <div className={classes.divider} />
                <div className={classes.imgContainer}>
                    {itemProps.image
                        ? <img src={itemProps.image} className={classes.img} alt="item-preview" />
                        : <img src="/assets/img/placeholder_image.jpg" className={classes.img} alt="item-preview" />}
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <p className={classes.text}>
                        {t('picklist:Qty_item_to_pick')}
                    </p>
                    <p className={classes.qty}>
                        {itemProps.qty}
                    </p>
                    <p className={classes.text}>
                        {t('picklist:put_picked_items_in')}
                    </p>
                    <p className={classes.qty}>
                        {`${t('picklist:Slot')} ${itemProps.slot}`}
                    </p>
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <Button
                        className={classes.btn}
                        onClick={() => router.push(`/pickpack/wavelist/picklist/item/scan/${itemProps.id}`)}
                        buttonType="primary-rounded"
                    >
                        {t('picklist:SCAN')}
                    </Button>
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <Link href={`/pickpack/wavelist/picklist/${itemProps.parentId}`}>
                        <a className={classes.back}>
                            {t('picklist:Back_to_Pick_List')}
                        </a>
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default BatchListPickListContent;
