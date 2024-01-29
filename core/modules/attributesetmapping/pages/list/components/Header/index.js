/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/attributesetmapping/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Attribute Set Mapping</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/attributesetmapping/import')}
            >
                Import Attribute set Mapping
            </Button>
        </div>
    );
};

export default HeaderContent;
