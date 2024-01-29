import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Skeleton, testHyperlink } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import FloatingContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingEdit';
import FloatingUpload from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/FloatingUpload';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const VideoContent = (props) => {
    const {
        item = {}, setIndexActive, indexActive, index, mode,
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.contentItem, mode)} onClick={() => setIndexActive(index)} aria-hidden="true">
            {item.banner[0].url
                ? (
                    <div
                        className={clsx(classes.imgContainer, mode, indexActive === index && 'active', 'center')}
                        aria-hidden="true"
                    >
                        <iframe
                            width={mode === 'mobile' ? '300' : '600'}
                            height={mode === 'mobile' ? '150' : '300'}
                            src={testHyperlink(item.banner[0].url) && item.banner[0].url}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            aria-hidden="true"
                        />
                    </div>
                )
                : <Skeleton player {...props} />}
            {item.banner[0].url
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

export default VideoContent;
