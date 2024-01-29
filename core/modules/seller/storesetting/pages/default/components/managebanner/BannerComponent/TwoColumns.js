import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import { Skeleton } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import FloatingContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingEdit';
import FloatingUpload from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingUpload';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const TwoColumnsContent = (props) => {
    const {
        item = {}, setIndexActive, indexActive, index, mode,
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.contentItem, mode)} onClick={() => setIndexActive(index)} aria-hidden="true">
            <Grid container spacing={2}>
                {item.banner.map((obj, idx) => (
                    <Grid item xs={6} key={idx}>
                        {obj.url || obj.binary ? (
                            <div
                                className={clsx(classes.imgContainer, mode, 'two', indexActive === index && 'active')}
                                aria-hidden="true"
                                style={{ backgroundImage: `url(${obj.binary || obj.url})` }}
                            />
                        ) : <Skeleton two {...props} />}
                    </Grid>
                ))}
            </Grid>
            {indexActive === index
                && (
                    <FloatingContent {...props} />
                )}
            {indexActive === index
                && (
                    <FloatingUpload {...props} />
                )}
        </div>
    );
};

export default TwoColumnsContent;
