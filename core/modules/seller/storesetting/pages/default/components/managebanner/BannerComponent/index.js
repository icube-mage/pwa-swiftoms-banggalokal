import CarouselContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/Carousel';
import TwoColumnsContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/TwoColumns';
import SingleContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/Single';
import VideoContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/Video';
import UploadContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/Upload';
import UploadTwoContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/UploadTwo';
import UploadCarouselContent from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/UploadCarousel';
import { SkeletonContent } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/Skeleton';

export const ComList = (t) => [
    {
        name: t('storesetting:Carousel'),
        type: 'carousel',
        is_mobile: true,
    },
    {
        name: t('storesetting:2_Columns'),
        type: 'two_columns',
        is_mobile: false,
    },
    {
        name: t('storesetting:Single_Image'),
        type: 'single',
        is_mobile: true,
    },
    {
        name: t('storesetting:Video'),
        type: 'video',
        is_mobile: true,
    },
];

export const Carousel = CarouselContent;
export const TwoColumns = TwoColumnsContent;
export const Single = SingleContent;
export const Video = VideoContent;
export const Skeleton = SkeletonContent;

export const Upload = UploadContent;
export const UploadTwo = UploadTwoContent;
export const UploadCarousel = UploadCarouselContent;

export function youtubeParser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export function testHyperlink(text) {
    // eslint-disable-next-line no-useless-escape
    const expression = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/gi;
    const regex = new RegExp(expression);
    return text.match(regex);
}

export default {
    ComList,
    Carousel,
    TwoColumns,
    Single,
    Video,
    Skeleton,
    Upload,
    UploadTwo,
    UploadCarousel,
    youtubeParser,
    testHyperlink,
};
