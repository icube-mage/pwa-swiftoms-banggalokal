import Grid from '@material-ui/core/Grid';
import SectionHeader from '@sellermodules/chatcommerce/pages/default/components/SectionHeader';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const HomeContent = (props) => {
    const { t, classes } = props;

    const propsFromParent = { t };

    return (
        <div id="seller-chatcommerce" className={classes.sellerHomeContainer}>
            <SectionHeader {...propsFromParent} />
            <div className="section-cards">
                <Grid className={classes.boxContainer} container spacing={2}>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box className={classes.box}>
                            <img src="/assets/img/chatcommerce/chat-bubble.svg" alt="box-img" />
                            <Typography className="label">{t('chatcommerce:commerce_info_chat')}</Typography>
                            <span className="indicator" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box className={classes.box}>
                            <img src="/assets/img/chatcommerce/notif-bell.svg" alt="box-img" />
                            <Typography className="label">{t('chatcommerce:commerce_info_notification')}</Typography>
                            <span className="indicator" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box className={classes.box}>
                            <img src="/assets/img/chatcommerce/person-multiple.svg" alt="box-img" />
                            <Typography className="label">{t('chatcommerce:commerce_info_account')}</Typography>
                            <span className="indicator" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box className={classes.box}>
                            <img src="/assets/img/chatcommerce/stonks.svg" alt="box-img" />
                            <Typography className="label">{t('chatcommerce:commerce_info_performance')}</Typography>
                            <span className="indicator" />
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <div className="section-banner" style={{ margin: 20 }}>
                <Grid className={classes.boxBanner} container>
                    <img src="/assets/img/chatcommerce/phone.svg" alt="box-img" />
                    <Grid className="content" item xs={12}>
                        <span />
                        <Box className="content-text">
                            <Typography className="title">{t('chatcommerce:marketplace_chat')}</Typography>
                            <ul>
                                <li>{t('chatcommerce:chat_queue_system')}</li>
                                <li>{t('chatcommerce:agent_management')}</li>
                                <li>{t('chatcommerce:quick_reply_system')}</li>
                                <li>{t('chatcommerce:chat_management')}</li>
                                <li>{t('chatcommerce:display_product_status')}</li>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default HomeContent;
