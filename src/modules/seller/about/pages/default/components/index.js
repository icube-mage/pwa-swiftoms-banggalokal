import React from 'react';
import Link from 'next/link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import useStyles from '@sellermodules/about/pages/default/components/style';

const AboutContent = (props) => {
    const { t } = props;
    const classes = useStyles();

    return (
        <div>
            <Link href="/seller/about/privacypolicy">
                <div className={classes.divWrapper}>
                    <div className="icon">
                        <img className="itemIcon" alt="" src="/assets/img/layout/seller/money.svg" />
                    </div>
                    <div className="div-info">
                        <h2>{t('common:Privacy_Policy')}</h2>
                        <span>{t('common:Your_privacy_is_safe')}</span>
                    </div>
                    <div>
                        <ChevronRightIcon className={classes.arrow} />
                    </div>
                </div>
            </Link>
            <Link href="/seller/about/termsofuse">
                <div className={classes.divWrapper}>
                    <div className="icon">
                        <img className="itemIcon" alt="" src="/assets/img/layout/seller/money.svg" />
                    </div>
                    <div className="div-info">
                        <h2>{t('common:Terms_and_Condition')}</h2>
                        <span>{t('common:Learn_about_swift_store')}</span>
                    </div>
                    <div>
                        <ChevronRightIcon className={classes.arrow} />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AboutContent;
