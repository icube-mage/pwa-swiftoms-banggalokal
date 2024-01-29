import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import StepStatus from '@sellermodules/return/pages/detail/components/StepStatus';
import StepAction from '@sellermodules/return/pages/detail/components/StepAction';
import Table from '@sellermodules/return/pages/detail/components/Table';
import Information from '@sellermodules/return/pages/detail/components/Information';
import Message from '@sellermodules/return/pages/detail/components/Message';

import useStyles from '@sellermodules/return/pages/detail/components/style';

const dataEditContent = (props) => {
    const { t, formik } = props;
    const router = useRouter();
    const classes = useStyles();

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const node = document.getElementsByName('scroll-to-items');
            node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            node[0].focus();
        }
    }, [formik]);

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/return')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className={classes.title}>{t('sellerreturn:Return_List')}</h2>
            </div>

            <Paper className={classes.paper}>
                <StepStatus {...props} />
                <StepAction {...props} />
            </Paper>

            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerreturn:Items_to_Return')}</h2>
                <Table {...props} />
                <Information {...props} />
            </Paper>
            <div name="scroll-to-items" />

            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'padding')}>{t('sellerreturn:Messages')}</h2>
                <Message {...props} />
            </Paper>
            <div name="scroll-to-message" />
        </div>
    );
};

export default dataEditContent;
