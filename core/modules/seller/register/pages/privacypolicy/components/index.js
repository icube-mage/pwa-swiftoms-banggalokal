/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import useStyles from '@sellermodules/register/pages/privacypolicy/components/style';

const PrivacyPolicyContent = (props) => {
    const classes = useStyles();
    const {
        storeLogo, t,
    } = props;

    const router = useRouter();

    return (
        <div className={clsx(classes.container)}>
            <div className={classes.containLeft}>
                <div className={classes.header}>
                    <img
                        className="imgIcon"
                        alt=""
                        src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                        style={{ maxHeight: 52, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    />
                    <LanguageSelect />
                </div>
                <div className={classes.content}>
                    <div className={classes.titleContainer}>
                        <div className={classes.textTitle}>
                            {t('registerseller:Privacy_Policy')}
                        </div>
                    </div>

                </div>
            </div>
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.png')" }} />
        </div>
    );
};

export default PrivacyPolicyContent;
