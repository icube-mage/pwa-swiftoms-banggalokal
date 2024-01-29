/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useRouter } from 'next/router';
import useStyles from '@modules/requestreturn/pages/request/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();

    const { email, order_number, channel_code, from } = router.query;

    return (
        <div className={classes.headerContainer}>
            <Button className={classes.btnBack} onClick={() => router.push('/requestreturn')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.title}>Request Return</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push(
                        `/requestreturn/return/return?email=${email}&order_number=${order_number}&channel_code=${channel_code}${
                            from ? `&from=${from}` : ''
                        }`,
                )}
            >
                Request Return
            </Button>
            <h3 className={classes.text}>RMA LIST</h3>
        </div>
    );
};

export default HeaderContent;
