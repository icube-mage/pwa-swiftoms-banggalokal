import React from 'react';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import helperCookies from '@helper_cookies';
import cookies from 'js-cookie';
import clsx from 'clsx';
import { GraphConfig } from '@services/graphql/index';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from '@i18n';
import { translation } from '@root/swift.config';

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
const LanguageSelect = ({ white = false, color, setLoadLang }) => {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const mount = React.useRef(null);
    const initialLanguage = (cookies.getJSON('language')) || translation.defaultLanguage;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [listLang, setListLang] = React.useState(null);
    const [getAvailableStore, { loading: loadingAvailableStores }] = GraphConfig.availableStores();
    const [selectedOption, setSelectedOption] = React.useState(null);

    const onGetAvailableStores = React.useCallback(async () => {
        try {
            const res = await getAvailableStore();
            const stores = res?.data?.availableStores;
            /* Default Language
            * The default language used for i18n and headers in graphql will be taken from graphql availableStores,
            * if graphql fails to retrieve data, it will use the defaultLanguage from config translation
            */
            if (stores?.length) {
                setListLang(stores);
                let filterOption = stores.find(({ is_default_store }) => is_default_store) || stores[0];
                if (cookies.getJSON('language_store_code')) {
                    const findStore = stores.find((value) => value.store_code.toLowerCase() === cookies.getJSON('language_store_code'));
                    if (findStore) {
                        filterOption = findStore;
                    }
                }
                const { locale } = filterOption;
                const { store_code } = filterOption;
                const locale_split = locale.split('_');
                const locale_slug = locale_split[0];
                const flag_image = `/assets/img/flag/${locale_slug}.png`;
                const optionItem = {
                    img: flag_image,
                    value: locale_slug,
                    store_code,
                };
                setSelectedOption(optionItem);
                i18n.changeLanguage(locale_slug);
            } else {
                const optionItem = {
                    img: `/assets/img/flag/${initialLanguage}.png`,
                    value: initialLanguage,
                    store_code: 'default',
                };
                setSelectedOption(optionItem);
                i18n.changeLanguage(initialLanguage);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Unable to retrieve available stores data ', err);
            const optionItem = {
                img: `/assets/img/flag/${initialLanguage}.png`,
                value: initialLanguage,
                store_code: 'default',
            };
            setSelectedOption(optionItem);
            i18n.changeLanguage(initialLanguage);
        }
    }, []);

    React.useEffect(() => {
        mount.current = true;
        if (mount.current) {
            onGetAvailableStores();
        }
        return () => {
            mount.current = false;
        };
    }, []);

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = async (event, option) => {
        if (setLoadLang) {
            setLoadLang(true);
        }
        setSelectedOption(option);
        const selectedOptionLanguage = option?.value;
        const selectedOptionStoreCode = option?.store_code;
        await i18n.changeLanguage(selectedOptionLanguage);
        helperCookies.set('language', JSON.stringify(selectedOptionLanguage));
        helperCookies.set('language_store_code', selectedOptionStoreCode);
        setAnchorEl(null);
        if (setLoadLang) {
            setTimeout(() => { setLoadLang(false); }, 500);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (listLang == null || loadingAvailableStores) return null;

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
                    <img className={classes?.flag} alt="" src={selectedOption?.img} />
                )}
                {selectedOption ? selectedOption?.value : 'Language'}
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
                {listLang.map((option, index) => {
                    const { locale } = option;
                    const { store_code } = option;
                    const locale_split = locale.split('_');
                    const locale_slug = locale_split[0];
                    const flag_image = `/assets/img/flag/${locale_slug}.png`;
                    const optionItem = {
                        img: flag_image,
                        value: locale_slug,
                        store_code,
                    };
                    return (
                        <MenuItem
                            key={index}
                            selected={selectedOption && (optionItem.value === selectedOption.value)}
                            onClick={(event) => handleMenuItemClick(event, optionItem)}
                            style={{ fontSize: 12 }}
                        >
                            <>
                                <img className={classes.flag} alt="" src={optionItem.img} />
                                <span className={classes.optionLabel}>{optionItem.value}</span>
                            </>
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default LanguageSelect;
