/* eslint-disable react/jsx-wrap-multilines */
import classNames from 'classnames';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from '@i18n';
import { PRIMARY, PRIMARY_DARK, GREEN_ACTIVE } from '@theme_color';
import InputLabel from '@material-ui/core/InputLabel';

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 37,
        height: 19,
        padding: 0,
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
            transform: 'translateX(18px)',
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
                transform: 'translateX(18px)',
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
        width: 17,
        height: 17,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#B1BCDA',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
    control: {
        margin: 0,
        width: 'fit-content',
    },
}))(({ classes, ...props }) => {
    const { t } = useTranslation('common');
    const {
        trueLabel = t('common:Yes'), falseLabel = t('common:No'), value, usePrimary = true, useLabel = true, rootClass = {}, ...other
    } = props;
    return (
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
                />
            }
            label={(trueLabel && falseLabel && useLabel) ? <InputLabel className={classes.label}>{value ? trueLabel : falseLabel}</InputLabel> : null}
        />
    );
});

export default IOSSwitch;
