/* eslint-disable object-curly-newline */
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

import Button from '@common_button';

import {
    ComList, Carousel, TwoColumns, Single, Video,
    Upload, UploadTwo, UploadCarousel,
} from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const ManageBannerContent = (props) => {
    const { t, handleSaveBanner, dataBannerDesktop, dataBannerMobile } = props;
    const classes = useStyles();

    const [fields, setFields] = useState(JSON.parse(JSON.stringify(dataBannerDesktop)));
    const [fieldsMobile, setFieldsMobile] = useState(JSON.parse(JSON.stringify(dataBannerMobile)));
    const [indexActive, setIndexActive] = useState();
    const [mode, setMode] = useState('desktop');

    const useFields = mode === 'mobile' ? fieldsMobile : fields;
    const useSetFields = mode === 'mobile' ? setFieldsMobile : setFields;

    const changeMode = (mod) => {
        setIndexActive();
        setMode(mod);
    };

    const arraymove = (fromIndex, toIndex) => {
        const temp = [...useFields];
        const element = temp[fromIndex];
        temp.splice(fromIndex, 1);
        temp.splice(toIndex, 0, element);
        setIndexActive(toIndex);
        useSetFields(temp);
    };

    const handleUp = (index) => {
        if (index) {
            arraymove(index, index - 1);
        }
    };

    const handleDown = (index) => {
        if (index !== useFields.length - 1) {
            arraymove(index, index + 1);
        }
    };

    const handleDelete = (index) => {
        const temp = [...useFields];
        temp.splice(index, 1);
        useSetFields(temp);
        setIndexActive();
    };

    const renderDescription = (item) => {
        if (!item || !item.type) return null;
        const { type } = item;
        let title = '';
        let desc = '';
        let subtitle = '';
        let recommendation = '1200px x 600px';
        switch (type) {
        case 'carousel':
            title = t('storesetting:Carousel');
            desc = t('storesetting:Show_the_best_deals_best_selling_products_or_product_categories_with_shop_banners');
            subtitle = t('storesetting:Upload_Image_or_Video_for_Carousel');
            break;
        case 'two_columns':
            title = t('storesetting:2_Columns');
            // eslint-disable-next-line max-len
            desc = t('storesetting:Add_some_photos_to_promote_your_product_You_can_incorporate_your_product_photos_into_Product_Detail_Pages_and_Store_Categories');
            subtitle = t('storesetting:Upload_Image_for_2_Columns');
            recommendation = '600px x 300px';
            break;
        case 'single':
            title = t('storesetting:Single_Image');
            desc = t('storesetting:Show_your_promotions_or_products_here');
            subtitle = t('storesetting:Upload_Image_for_Single_Image');
            break;
        case 'video':
            title = t('storesetting:Video');
            desc = t('storesetting:Reach_Buyers_by_showing_videos_about_your_brand_or_product');
            subtitle = t('storesetting:Upload_Video');
            break;
        default:
            break;
        }
        return (
            <div>
                <h4 className={classes.subtitle}>{title}</h4>
                <p className={classes.description}>{desc}</p>
                {type !== 'video'
                    && (
                        <p className={classes.description}>
                            {type === 'carousel' && (
                                <>
                                    <span className="bold">
                                        {t('storesetting:Image')}
                                        <br />
                                    </span>
                                </>
                            )}
                            {`${t('storesetting:Recommended_Size')}: `}
                            <span className="bold">{`${recommendation}. `}</span>
                            {t('storesetting:Maximum')}
                            <span className="bold"> 2MB</span>
                            <br />
                            Format:
                            {' '}
                            <span className="bold">JPG, JPEG, PNG, GIF</span>
                        </p>
                    )}
                {(type === 'video' || type === 'carousel')
                    && (
                        <p className={classes.description}>
                            {type === 'carousel' && (
                                <>
                                    <span className="bold">
                                        {t('storesetting:Video')}
                                        <br />
                                    </span>
                                </>
                            )}
                            {t('storesetting:See')}
                            {' '}
                            <Link href="/seller/storesetting/bannervideoguide">
                                <a target="_blank" className="link">{t('storesetting:User’s_Guide')}</a>
                            </Link>

                        </p>
                    )}
                <h4 className={classes.uploadTitle}>{subtitle}</h4>
            </div>
        );
    };

    const renderUpload = (item) => {
        const componentProps = {
            ...props,
            indexActive,
            fields: useFields,
            setFields: useSetFields,
            item,
        };
        if (!item || !item.type) return null;
        const { type } = item;
        switch (type) {
        case 'carousel':
            return (
                <UploadCarousel {...componentProps} />
            );
        case 'two_columns':
            return (
                <UploadTwo {...componentProps} />
            );
        default:
            return (
                <Upload player={item?.banner?.[0]?.type === 'video'} {...componentProps} />
            );
        }
    };

    const handleAdd = (item) => {
        const { type } = item;
        const temp = [...useFields];
        switch (type) {
        case 'carousel':
            temp.push({
                type,
                banner: [],
                is_mobile: mode === 'mobile',
            });
            break;
        case 'two_columns':
            temp.push({
                type,
                banner: [
                    { url: '', binary: '', type: 'image', hyperlink: '' },
                    { url: '', binary: '', type: 'image', hyperlink: '' },
                ],
                is_mobile: mode === 'mobile',
            });
            break;
        case 'single':
            temp.push({
                type,
                banner: [{ url: '', binary: '', type: 'image', hyperlink: '' }],
                is_mobile: mode === 'mobile',
            });
            break;
        case 'video':
            temp.push({
                type,
                banner: [{ url: '', binary: '', type: 'video', hyperlink: '' }],
                is_mobile: mode === 'mobile',
            });
            break;
        default:
            break;
        }
        useSetFields(temp);
    };

    const renderComponent = (item, index) => {
        const componentProps = {
            ...props,
            index,
            setIndexActive,
            indexActive,
            item,
            mode,
            handleUp: (e) => { e.stopPropagation(); handleUp(index); },
            handleDown: (e) => { e.stopPropagation(); handleDown(index); },
            handleDelete: (e) => { e.stopPropagation(); handleDelete(index); },
            renderDescription,
            renderUpload,
            useFields,
        };
        const { type } = item;
        switch (type) {
        case 'carousel':
            return (
                <Carousel {...componentProps} />
            );
        case 'two_columns':
            return (
                <TwoColumns {...componentProps} />
            );
        case 'single':
            return (
                <Single {...componentProps} />
            );
        case 'video':
            return (
                <Video {...componentProps} />
            );
        default:
            return <div />;
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.componentContainer}>
                {ComList(t).filter((com) => (mode === 'mobile' ? com.is_mobile : true))
                    .map((com, index) => (
                        <div
                            className={classes.item}
                            aria-hidden="true"
                            key={index}
                            onClick={() => handleAdd(com)}
                        >
                            {com.name}
                        </div>
                    ))}
            </div>
            <div className={clsx(classes.content, mode && 'mobile')}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} container alignItems="baseline">
                        <Grid item xs={12} sm="auto">
                            <h2 className={classes.title}>
                                {t('storesetting:Manage_Banner')}
                                {' : '}
                            </h2>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Hidden xsDown>
                                <div className={classes.modeContainer}>
                                    <div
                                        onClick={() => changeMode('mobile')}
                                        aria-hidden="true"
                                        className={clsx(classes.mode, 'border', mode === 'mobile' && 'active')}
                                    >
                                        <SmartphoneIcon className="icon" />
                                    </div>
                                    <div
                                        onClick={() => changeMode('desktop')}
                                        aria-hidden="true"
                                        className={clsx(classes.mode, mode === 'desktop' && 'active')}
                                    >
                                        <DesktopMacIcon className="icon" />
                                    </div>
                                </div>
                            </Hidden>
                        </Grid>
                    </Grid>

                    <Hidden smUp>
                        <Grid item xs={12} container>
                            <div className={classes.modeContainer}>
                                <div
                                    onClick={() => changeMode('mobile')}
                                    aria-hidden="true"
                                    className={clsx(classes.mode, 'border', mode === 'mobile' && 'active')}
                                >
                                    <SmartphoneIcon className="icon" />
                                </div>
                                <div
                                    onClick={() => changeMode('desktop')}
                                    aria-hidden="true"
                                    className={clsx(classes.mode, mode === 'desktop' && 'active')}
                                >
                                    <DesktopMacIcon className="icon" />
                                </div>
                            </div>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={6} className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            className={classes.btn}
                            onClick={() => handleSaveBanner(fields, fieldsMobile)}
                        >
                            {t('registerseller:Save')}
                        </Button>
                    </Grid>
                </Grid>

                <div style={{ height: 20 }} />
                <div className={clsx(classes.gridContainer, mode)}>
                    <div className={clsx(classes.gridSpace, mode)} />
                    <div className={clsx(classes.gridItem, mode)}>
                        <div
                            id="fieldContainer"
                            className={clsx(classes.contentContainer, 'fieldContainer', mode, !useFields.length && 'nonVisible')}
                        >
                            {useFields.map((value, index) => (
                                <div key={index}>
                                    {renderComponent(value, index)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBannerContent;
