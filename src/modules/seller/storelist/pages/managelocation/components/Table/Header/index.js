import Paper from '@material-ui/core/Paper';

import useStyles from '@sellermodules/storelist/pages/managelocation/components/Table/Header/style';

const CustomHeader = (props) => {
    const {
        data,
    } = props;

    const classes = useStyles();
    const dataItem = data?.getSellerChannelList?.items?.[0];

    return (
        <Paper className={classes.paperHead}>
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper">
                    <div className="top-item-left">
                        <div className={classes.channelTitle}>
                            <div className={classes.channelDiv}>
                                <div
                                    className={classes.channelContainer}
                                    style={{ backgroundImage: `url(${dataItem?.image_url || '/assets/img/placeholder_image.jpg'})` }}
                                />
                                <div className={classes.channelName}>
                                    {dataItem?.channel_name || '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default CustomHeader;
