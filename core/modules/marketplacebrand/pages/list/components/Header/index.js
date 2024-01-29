/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/marketplacebrand/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Marketplace Brand</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/marketplacebrand/register')}
            >
                Register Brand
            </Button>
        </div>
    );
};

export default HeaderContent;
