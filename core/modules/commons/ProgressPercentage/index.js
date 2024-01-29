import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import useStyles from '@common_progresspercent/style';

export default function CircularProgressWithLabel(props) {
    const { value, total } = props;
    const classes = useStyles();
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                {...props}
                variant="determinate"
                value={total ? Math.round(((value ? value - 1 : value) / total) * 100) : value}
                size={50}
            />
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
                    {`${total ? Math.round(((value ? value - 1 : value) / total) * 100) : value}%`}
                </div>
            </Box>
        </Box>
    );
}
