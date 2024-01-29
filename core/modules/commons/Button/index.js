/* eslint-disable no-unused-vars */
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import clsx from 'clsx';
import useStyles from '@common_button/style';
import { useTranslation } from '@i18n';

const CustomButton = ({
    variant = 'contained',
    className = {},
    buttonType = 'primary',
    disabled,
    ...other
}) => {
    const { t } = useTranslation('common');
    const classes = useStyles();
    const getClassByType = (type) => {
        if (type === 'primary-rounded') {
            return clsx(classes.primary, classes.rounded);
        } if (type === 'outlined') {
            return classes.outlined;
        } if (type === 'outlined-rounded') {
            return clsx(classes.outlined, classes.rounded);
        } if (type === 'buttonText') {
            return classes.buttonText;
        } if (type === 'link') {
            return classes.link;
        }
        return classes.primary;
    };
    const customClass = classNames(
        getClassByType(buttonType),
        className,
        disabled && classes.disabled,
    );

    return (
        <Button
            variant={variant}
            className={customClass}
            disabled={disabled}
            {...other}
        />
    );
};

export default CustomButton;
