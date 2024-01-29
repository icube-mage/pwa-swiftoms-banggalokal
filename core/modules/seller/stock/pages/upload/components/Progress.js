import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import useStyles from '@sellermodules/stock/pages/upload/components/style';

export default function CircularProgressWithLabel(props) {
    const { value, total } = props;
    const classes = useStyles();
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} value={Math.round((value / total) * 100)} size={50} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <div className={classes.progress}>
                    {`${Math.round((value / total) * 100)}%`}
                </div>
            </Box>
        </Box>
    );
}
