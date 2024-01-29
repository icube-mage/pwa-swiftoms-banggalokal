/* eslint-disable max-len */
import useStyles from '@sellermodules/chat/pages/default/components/style';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';

const SkeletonLoader = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.userContainer}>
                <div className={classes.formUserSearch}>
                    <div className={classes.searchInput}>
                        <Skeleton animation="wave" variant="rect" height={40} width="100%" />
                    </div>
                    <Skeleton animation="wave" variant="rect" height={40} width={40} />
                </div>
                <div className={classes.overflowUser}>
                    <div className={classes.userWrapper}>
                        <div className={classes.userContent}>
                            <div className={classes.userImage}>
                                <Skeleton variant="circle" width={65} height={65} />
                            </div>
                            <div className={classes.userText}>
                                <Skeleton animation="wave" variant="rect" height={65} width="100%" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.userWrapper}>
                        <div className={classes.userContent}>
                            <div className={classes.userImage}>
                                <Skeleton variant="circle" width={65} height={65} />
                            </div>
                            <div className={classes.userText}>
                                <Skeleton animation="wave" variant="rect" height={65} width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx(classes.messageContainer, 'hidden-mobile', 'hidden-sm')}>
                <div className={classes.selectedUser}>
                    <div className={classes.selectedUserImage}>
                        <Skeleton animation="wave" variant="circle" height={45} width={45} />
                    </div>
                    <div className={classes.userText}>
                        <Skeleton animation="wave" variant="rect" height={45} width="100%" />
                    </div>
                </div>
                <div className={classes.messageContent}>
                    <Skeleton animation="wave" variant="text" height={45} width="100%" />
                    <Skeleton animation="wave" variant="text" height={45} width="100%" />
                    <Skeleton animation="wave" variant="text" height={45} width="100%" />
                    <Skeleton animation="wave" variant="text" height={45} width="100%" />
                </div>
                <div className={classes.messageForm}>
                    <div className={classes.searchInput}>
                        <Skeleton animation="wave" variant="rect" height={40} width="100%" />
                    </div>
                    <Skeleton animation="wave" variant="rect" height={40} width={40} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
