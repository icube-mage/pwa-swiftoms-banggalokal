/* eslint-disable no-nested-ternary */
/* eslint-disable import/order */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import clsx from 'clsx';
import Slider from 'react-slick';

import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';

import { testHyperlink } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/CarouselComponent/style';

const Banner = ({
    data = [],
    showArrow = true,
    componentImage = null,
    componentVideo = null,
    settings: otherSettings = {},
    width = '100%',
    placeholder = null,
    mode,
}) => {
    const styles = useStyles();
    const [slideIndex, setIndex] = useState(0);
    let sliderRef = React.createRef();

    const dotActive = data.length > 1
        ? classNames(styles.dotsItem, styles.dotActive)
        : styles.hide;
    const dotItem = data.length > 1 ? styles.dotsItem : styles.hide;

    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickGoTo(data.length - 1);
        } else {
            sliderRef.slickGoTo(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickGoTo(0);
        } else {
            sliderRef.slickGoTo(slideIndex + 1);
        }
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        afterChange: (i) => setIndex(i),
        ...otherSettings,
    };

    return (
        <div className={clsx(styles.caraousel, 'carousel')}>
            <Slider ref={(slider) => sliderRef = slider} {...settings}>
                {data.map((item, idx) => {
                    let itemUsed = item;
                    if (item?.type === 'video') {
                        itemUsed = item?.url;
                    } else {
                        itemUsed = item?.binary || item?.url;
                    }
                    if (!itemUsed) return <div key={idx}>{placeholder()}</div>;
                    return (
                        item.type === 'video'
                            ? componentVideo
                                ? <div key={idx}>{componentVideo(itemUsed)}</div>
                                : (
                                    <iframe
                                        key={idx}
                                        width="100%"
                                        height={mode === 'mobile' ? '150' : '300'}
                                        src={testHyperlink(itemUsed) && itemUsed}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded youtube"
                                    />
                                ) : componentImage
                                ? <div key={idx}>{componentImage(itemUsed)}</div>
                                : <img key={idx} src={itemUsed} alt="" style={{ width: '100%' }} />
                    );
                })}
            </Slider>
            {
                showArrow ? (
                    <>
                        <div className={classNames(styles.arrow, styles.leftArrow)} onClick={handleLeftArrow}>
                            <LeftArrowIcon fontSize="inherit" />
                        </div>
                        <div className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
                            <RightArrowIcon fontSize="inherit" />
                        </div>
                    </>
                ) : null
            }
            <div className={styles.dots}>
                {data.map((item, idx) => (
                    <div
                        className={slideIndex === idx ? dotActive : dotItem}
                        key={idx}
                        onClick={() => sliderRef.slickGoTo(idx)}
                    />
                ))}
            </div>
            <style jsx global>
                {`
                  .slick-list {
                    width: ${width};
                  }
                `}
            </style>
        </div>
    );
};

export default Banner;
