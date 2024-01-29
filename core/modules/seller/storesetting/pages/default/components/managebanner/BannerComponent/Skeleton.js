import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, TABLE_GRAY } from '@theme_color';

const useStyles = makeStyles(() => ({
    btnUpload: {
        cursor: 'pointer',
        backgroundColor: TABLE_GRAY,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid white',
        '&:hover': {
            transition: 'all .2s',
            backgroundColor: TABLE_GRAY,
            border: `1px solid ${PRIMARY}`,
        },
        '&.active': {
            transition: 'all .2s',
            border: `1px solid ${PRIMARY}`,
        },
        '&.two': {
            height: 150,
        },
        '&.mobile': {
            height: 150,
        },
    },
    icon: {
        height: 50,
        width: 'auto',
    },
}));

export const SkeletonContent = (props) => {
    const {
        player = false, indexActive, index, two, mode,
    } = props;
    const classes = useStyles();
    return (
        <div className={clsx(classes.btnUpload, two && 'two', indexActive === index && 'active', mode)}>
            <img className={classes.icon} src={player ? '/assets/img/player-light.svg' : '/assets/img/img_palceholder-light.svg'} alt="" />
        </div>
    );
};

export default { SkeletonContent };
