import React from 'react';
import Button from '@common_button';

import { useRouter } from 'next/router';
import useStyles from '@modules/offlinechannel/pages/add/components/Header/style';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/integration/offlinechannel')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('offlinechannel:Add_Offline_Channel')}</h2>
        </>
    );
};

export default HeaderContent;
