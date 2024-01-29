import FormControlLabel from '@material-ui/core/FormControlLabel';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '@common_checkbox/style';

const CustomButton = ({
    checked,
    setChecked = () => {},
    name = 'checkbox',
    label = '',
    disabled,
    className,
    checkedIcon,
    icon,
    ...other
}) => {
    const classes = useStyles();

    const checkedIconProp = checkedIcon ? {
        checkedIcon,
    } : {};
    const iconProp = icon ? {
        icon,
    } : {};

    return (
        <FormControlLabel
            name={name}
            control={(
                <Checkbox
                    checked={checked}
                    name={name}
                    onChange={(e) => setChecked(e)}
                    {...checkedIconProp}
                    {...iconProp}
                />
            )}
            disabled={disabled}
            label={label}
            className={classNames(className, classes.controlLabel)}
            {...other}
        />
    );
};

export default CustomButton;
