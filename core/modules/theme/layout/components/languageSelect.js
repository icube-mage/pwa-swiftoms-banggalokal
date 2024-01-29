import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from '@i18n';
import helperCookies from '@helper_cookies';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    selectedOption: {
        fontSize: 10,
        borderRadius: 4,
        marginTop: -1,
        justifyContent: 'space-between',
        width: 72,
        textTransform: 'uppercase',
        '@media (max-width: 767px )': {
            color: '#000',
        },
        '&.white': {
            color: 'white',
        },
    },
    flag: {
        width: 16,
        height: 12,
        marginTop: -1,
        transform: 'translateX(4px)',
        marginRight: 8,
    },
    optionLabel: {
        margin: '-2px 0 0 4px',
        textTransform: 'uppercase',
    },
}));
const LanguageSelect = ({ white = false, color }) => {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const options = [
        { img: '/assets/img/flag_en.png', value: 'en' },
        { img: '/assets/img/flag_id.png', value: 'id' },
    ];
    const initialLanguage = helperCookies && helperCookies.get && helperCookies.get('language');
    const initialOption = options[initialLanguage ? options.findIndex((opt) => opt.value === initialLanguage) : 0];
    const [selectedOption, setSelectedOption] = React.useState(initialOption);

    React.useEffect(() => {
        i18n.changeLanguage(selectedOption.value);
        helperCookies.set('language', JSON.stringify(selectedOption.value));
    }, [selectedOption]);

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, option) => {
        setSelectedOption(option);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                size="small"
                onClick={handleButtonClick}
                className={clsx(classes.selectedOption, white && 'white')}
                endIcon={<KeyboardArrowDownIcon />}
                style={color && { color }}
            >
                {typeof window !== 'undefined' && (
                    <img className={classes.flag} alt="" src={selectedOption.img} />
                )}
                {selectedOption ? selectedOption.value : 'Language'}
            </Button>
            <Menu
                id="language-menu"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionProps={{
                    onEntering: () => {
                        document.querySelector('body').style.padding = 0;
                        document.querySelector('body').style.overflow = 'auto';
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        selected={selectedOption && (option.value === selectedOption.value)}
                        onClick={(event) => handleMenuItemClick(event, option)}
                        style={{ fontSize: 12 }}
                    >
                        <>
                            <img className={classes.flag} alt="" src={option.img} />
                            <span className={classes.optionLabel}>{option.value}</span>
                        </>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LanguageSelect;
