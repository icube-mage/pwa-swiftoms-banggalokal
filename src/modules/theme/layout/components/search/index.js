/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import useStyles from '@modules/theme/layout/components/search/style';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import Popper from '@material-ui/core/Popper';
import sellerMenus from '@modules/theme/helpers/seller';
import { helpersMenuList } from '@modules/theme/helpers';
import { useTranslation } from '@i18n';
import { getLocalStorage } from '@helper_localstorage';
import Intro from '@sellermodules/plugins/guide';

let delayTimer;

const getAllMenuWithLink = (menus, parent = null) => {
    const results = [];
    for (const menu_index in menus) {
        const menu_item = menus[menu_index];
        const isHasChild = menu_item?.children && menu_item?.children?.length > 0;
        if (!isHasChild) {
            results.push({
                ...menu_item,
                parent,
            });
        } else {
            // recursive checking
            const childrens = getAllMenuWithLink(menu_item?.children, menu_item?.key);
            for (const child_index in childrens) {
                const child_item = childrens[child_index];
                results.push(child_item);
            }
        }
    }
    return results;
};

const SearchHeader = ({
    isSeller,
}) => {
    const { t } = useTranslation('common');
    const [show, setShow] = React.useState(false);
    const [isInputFocus, setIsInputFocus] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const refPopper = React.useRef(null);
    const classes = useStyles();
    const dataAcl = getLocalStorage('acl') ? JSON.parse(getLocalStorage('acl')) : {};

    // handle click for outside element popper
    React.useEffect(() => {
        const handleClick = (event) => {
            if (refPopper.current && !refPopper.current.contains(event.target) && !isInputFocus) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [refPopper, isInputFocus]);

    // when search focus input
    const onFocusSearch = React.useCallback((e) => {
        setAnchorEl(e.currentTarget);
        setIsInputFocus(true);
        setShow(true);
    }, []);

    // when search not focus input
    const onBlurSearch = React.useCallback(() => {
        setIsInputFocus(false);
    }, []);

    const onPostSearch = React.useCallback((text) => {
        setSearchResult([]);
        if (dataAcl) {
            const menus = isSeller ? sellerMenus(t) : helpersMenuList(t);
            const acl_code = dataAcl?.acl_code;
            const all_menu = getAllMenuWithLink(menus);
            const results = all_menu.filter((value) => {
                const acl_code_this = value?.aclCode;
                let is_allow = acl_code.includes(acl_code_this);
                if (value.key === 'dashboard') is_allow = true;
                return is_allow && value.label.toLowerCase().includes(text);
            });

            setSearchResult(results);
        }
    }, [dataAcl]);

    const onChangeSearchText = React.useCallback((e) => {
        const text = e.target.value;
        setSearchText(text);
        if (text === '') {
            setSearchResult([]);
            clearTimeout(delayTimer);
        } else {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => onPostSearch(text), 1000);
        }
    }, [dataAcl]);

    return (
        <div id="guide-search" className={classNames('search-header', classes.searchContainer)}>
            <SearchIcon className={classes.searchIcon} />
            <input
                className="search-input"
                onFocus={onFocusSearch}
                onBlur={onBlurSearch}
                onChange={onChangeSearchText}
                placeholder={`${t('common:search_all_feature_here', { app_name: 'Swift' }) }...`}
            />
            <Popper
                ref={refPopper}
                className={classes.popperContainer}
                open={show}
                placement="bottom-start"
                anchorEl={anchorEl}
            >
                <div className={classes.popperContent}>
                    {
                        searchText === '' && searchResult.length < 1 && !isSeller && (
                            <div className={classes.searchEmptyState}>
                                <span>{ t('common:search_empty_state') }</span>
                            </div>
                        )
                    }
                    {
                        searchText === '' && searchResult.length < 1 && isSeller && (
                            <div className={classes.searchEmptyState}>
                                <h3>{ t('common:search_recommendation') }</h3>
                                <ul>
                                    <li>
                                        <a href="/seller/order">
                                            {t('common:search_list_order')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/seller/catalog/new">
                                            {t('common:search_add_product')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/seller/promotion">
                                            {t('common:search_add_discount')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/seller/storesetting">
                                            {t('common:search_setting_website')}
                                        </a>
                                    </li>
                                    <div className={classes.clear} />
                                </ul>
                            </div>
                        )
                    }
                    {
                        searchText !== '' && searchResult.length < 1 && (
                            <div className={classes.searchNotFound}>{ t('common:search_not_found', { search: searchText }) }</div>
                        )
                    }
                    {
                        searchResult.length > 0 && (
                            <ul className={classes.listSearch}>
                                {
                                    searchResult.map((value, index) => {
                                        const hasParent = value?.parent !== null;
                                        const imageName = hasParent ? value?.parent : value?.key;
                                        return (
                                            <li key={`search-result-${index}`}>
                                                <a href={value.url}>
                                                    <h3>
                                                        <img alt="" src={`/assets/img/layout/seller/${imageName}.svg`} />
                                                        {value.label}
                                                    </h3>
                                                    { value?.description && <p>{value?.description}</p> }
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        )
                    }
                </div>
            </Popper>
            <Intro page="SEARCH" pageHints />
        </div>
    );
};

export default React.memo(SearchHeader, (oldProps, newProps) => {
    if (JSON.stringify(oldProps.dataAcl) !== JSON.stringify(newProps.dataAcl)) {
        return false;
    }
    return true;
});
