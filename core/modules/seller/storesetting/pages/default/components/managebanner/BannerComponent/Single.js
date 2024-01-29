import clsx from 'clsx';
import { Skeleton } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import FloatingContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingEdit';
import FloatingUpload from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingUpload';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const SingleContent = (props) => {
    const {
        item = {}, setIndexActive, indexActive, index, mode,
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.contentItem, mode)} onClick={() => setIndexActive(index)} aria-hidden="true">
            {item.banner[0].url || item.banner[0].binary
                ? (
                    <div
                        className={clsx(classes.imgContainer, mode, indexActive === index && 'active')}
                        aria-hidden="true"
                        style={{ backgroundImage: `url(${item.banner[0].binary || item.banner[0].url})` }}
                    />
                )
                : <Skeleton {...props} />}
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

export default SingleContent;
