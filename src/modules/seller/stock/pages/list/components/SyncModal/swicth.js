/* eslint-disable */
import classNames from 'classnames';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GREEN_ACTIVE, TEXT_GRAY,
} from '@theme_color';

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 51,
        height: 22,
        padding: 0,
        margin: 0,
        position: 'relative',
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginLeft: 8,
        },
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(30px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: PRIMARY,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: PRIMARY,
            border: '6px solid #fff',
        },
        '&.green': {
            '&$checked': {
                transform: 'translateX(30px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: GREEN_ACTIVE,
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: GREEN_ACTIVE,
                border: '6px solid #fff',
            },
        },
    },
    thumb: {
        width: 19,
        height: 19,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${TEXT_GRAY}`,
        backgroundColor: TEXT_GRAY,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
    control: {
        margin: '0px -4px',
    },
    falseLabel: {
        position: 'absolute',
        right: 3,
        top: 5,
        fontSize: 10,
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
    },
    trueLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        fontSize: 10,
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
    },
}))(({ classes, ...props }) => {
    const {
        trueLabel = 'ON', falseLabel = 'OFF', value, usePrimary = true, rootClass = {}, ...other
    } = props;

    const toggle = React.useRef();

    return (<>
        <FormControlLabel
            className={classNames(classes.control, rootClass)}
            control={
                <Switch
                    {...other}
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.root,
                        switchBase: clsx(classes.switchBase, !usePrimary && 'green'),
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    name={props?.name}
                    disabled={props?.disabled}
                    checked={!!props?.value}
                    onChange={props?.onChange}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    ref={toggle}
                />
            }
            style={props?.disabled ? { cursor: 'not-allowed' } : {}}
        />
        <span onClick={() => toggle.current.click() } className={!!props?.value ? classes.trueLabel : classes.falseLabel}>
            { !!props?.value ? trueLabel : falseLabel }
        </span>
        </>
    );
});

export default IOSSwitch;
