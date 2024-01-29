/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import useStyles from '@sellermodules/storesetting/pages/bannervideoguide/components/style';

const BannerVideoGuideContent = (props) => {
    const {
        t,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    return (
        <>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/storesetting/banner')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('storesetting:Manage_Banner')}</h2>
                </div>
            </div>
            <Paper>
                <div className={classes.contentWithoutBorder}>
                    <p>
                        <b>{t('storesetting:How_to_Embed_Video_from_Google_Drive')}</b>
                    </p>
                    <ol>
                        <li>
                            <p>
                                {t('storesetting:Navigate_to_the_video_on_Google_Drive_and_open_it')}
                            </p>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:On_the_top_right_click_the')}
                                {' '}
                                <b>
                                    {t('storesetting:More_icon')}
                                </b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial01.png" alt="01" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:Click')}
                                {' '}
                                <b>{t('storesetting:Open_in_a_new_window')}</b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial02.png" alt="02" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:On_the_new_window_on_the_top_right_click_the')}
                                {' '}
                                <b>
                                    {t('storesetting:More_icon')}
                                </b>
                                {' '}
                                {t('storesetting:and_then_click')}
                                {' '}
                                <b>
                                    {t('storesetting:Embed_item')}
                                </b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial03.png" alt="03" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:Copy_the_url_from_embed_code')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial04.png" alt="04" />
                            </div>
                        </li>
                    </ol>
                    <p>
                        <b>{t('storesetting:How_to_Embed_Video_from_Youtube')}</b>
                    </p>
                    <ol>
                        <li>
                            <p>
                                {t('storesetting:Navigate_to_the_Youtube_video_page_and_then_click')}
                                {' '}
                                <b>
                                    {t('storesetting:Share_Button')}
                                </b>
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial06.png" alt="06" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:Click_the')}
                                {' '}
                                <b>
                                    {t('storesetting:Embed_Icon')}
                                </b>
                                {' '}
                                {t('storesetting:from_Share_popup')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial07.png" alt="07" />
                            </div>
                        </li>
                        <li>
                            <p>
                                {t('storesetting:Copy_the_url_from_embed_code')}
                            </p>
                            <div className={classes.imgDiv}>
                                <img className={classes.imgImage} src="/assets/img/tutorial_content/banner_video/tutorial08.png" alt="08" />
                            </div>
                        </li>
                    </ol>
                </div>
            </Paper>
        </>
    );
};

export default BannerVideoGuideContent;
