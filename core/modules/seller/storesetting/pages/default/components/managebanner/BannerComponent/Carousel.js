import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Skeleton } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import Carousel from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/CarouselComponent';
import FloatingContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingEdit';
import FloatingUpload from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingUpload';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const CarouselContent = (props) => {
    const {
        item = {}, setIndexActive, indexActive, index, mode,
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.contentItem, mode)} onClick={() => setIndexActive(index)} aria-hidden="true">
            <Carousel
                width={mode === 'mobile' ? 225 : 929}
                data={item.banner.length ? item.banner : [...Array(2)]}
                placeholder={() => <Skeleton {...props} />}
                componentImage={(src) => (
                    <div
                        className={clsx(classes.imgContainer, mode, indexActive === index && 'active')}
                        aria-hidden="true"
                        style={{ backgroundImage: `url(${src})` }}
                    />
                )}
                mode={mode}
            />
            {!!item.banner.length
                && (
                    <IconButton
                        className={clsx(classes.btnMore, mode)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
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

export default CarouselContent;
