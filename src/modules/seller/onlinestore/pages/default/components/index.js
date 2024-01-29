import VisibilityIcon from '@material-ui/icons/Visibility';

import Button from '@common_button';

import ModalForm from '@sellermodules/onlinestore/pages/default/components/ModalForm';
import useStyles from '@sellermodules/onlinestore/pages/default/components/style';

const OnlineStoreContent = (props) => {
    const {
        t, dialogOpen, setDialogOpen, formik, handleManageStore, storeData, homeUrl,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {storeData.store_code
                ? (
                    <div>
                        <div className={classes.noteContainer}>
                            <div>
                                <b>{homeUrl}</b>
                            </div>
                            <div>
                                {t('selleronlinestore:Manage_online_store_to_sell_on_the_website')}
                            </div>
                        </div>
                        <div className={classes.buttonsWrapper}>
                            <Button
                                classes={{ root: classes.buttonRoot }}
                                onClick={handleManageStore}
                            >
                                {t('selleronlinestore:Manage_Online_Store')}
                            </Button>
                            <Button
                                classes={{ root: classes.buttonRootOutlined }}
                                onClick={() => window.open(`https://${homeUrl}`)}
                                startIcon={<VisibilityIcon />}
                            >
                                {t('selleronlinestore:View_Store')}
                            </Button>
                        </div>
                    </div>
                )
                : (
                    <div>
                        <div className={classes.noteContainer}>
                            <div>
                                {t('selleronlinestore:The_online_shop_has_not_been_created_yet')}
                            </div>
                            <div>
                                {t('selleronlinestore:Create_an_online_store_now_to_sell_on_the_website')}
                            </div>
                        </div>
                        <Button
                            classes={{ root: classes.buttonRoot }}
                            onClick={() => setDialogOpen(true)}
                        >
                            {t('selleronlinestore:Create_Online_Store')}
                        </Button>
                    </div>
                )}
            <ModalForm
                {...props}
                open={dialogOpen}
                onClose={() => { formik.resetForm(); setDialogOpen(false); }}
            />
        </div>
    );
};

export default OnlineStoreContent;
