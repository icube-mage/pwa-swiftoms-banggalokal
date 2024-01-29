/* eslint-disable */

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

const TableHeader = (props) => {
    const {
        sellerChannel,
        dataSellerChannelList = [],
        handleCheckedFilter = () => { },
    } = props;

    const classes = useStyles();

    return (sellerChannel.map((_channel) => (
        <Grid item className="filter-item" xs="auto">
            {_channel.channel_name}
            <IconButton
                className={classes.closeButton}
                onClick={() => handleCheckedFilter(null, _channel, 'seller_channel')}
            >
                <CloseIcon className={classes.closeIcon} />
            </IconButton>
        </Grid>
    )));
};

export default TableHeader;
