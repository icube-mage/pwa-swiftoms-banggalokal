/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/ecommercechannel/pages/add/components/style';
import { useRouter } from 'next/router';
import helperCookies from '@helper_cookies';
import clsx from 'clsx';
import gqlService from '@modules/ecommercechannel/services/graphql';

import Header from '@modules/ecommercechannel/pages/add/components/Header';
import Button from '@common_button';
import TextField from '@common_textfield';
import Tabs from '@common_tabs';
import Autocomplete from '@common_autocomplete';
import ApiModal from '@modules/ecommercechannel/pages/add/components/apiModal';

import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelListContent = (props) => {
    const { firstLoad, setFirstLoad, data, loading, getMarketplaceList, getWebstoreListRes,
        getCountryForMarketplace, getCountryForMarketplaceRes, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const marketplaceList = data?.getMarketplaceList?.items || [];
    const webStoreList = getWebstoreListRes.data?.getWebstoreList || [];
    const countryOptions = getCountryForMarketplaceRes.data?.getCountryForMarketplace || [];

    const dataTab = [
        { label: t('ecommercechannel:Marketplace_Store'), value: 0 },
        { label: t('ecommercechannel:Webstore'), value: 1 },
    ];

    const [show, setShow] = React.useState(false);

    const [tab, setTab] = React.useState(0);
    const [load, setLoad] = React.useState(false);

    const [search, setSearch] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [selected, setSelected] = React.useState([]);

    const listToMap = () => {
        if (tab) {
            return webStoreList.map((item) => ({
                framework: item.framework,
                code: item.webstore_code,
                name: item.webstore_name,
                image: item.image_url,
                is_multiseller: item.is_multiseller,
            }));
        }
        return marketplaceList.map((item) => ({
            code: item.marketplace_code,
            name: item.marketplace_name,
            image: item.image_url,
        }));
    };

    const onChangeTab = async (e, v) => {
        setSearch('');
        setCountry('');
        setSelected([]);
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const onChecked = (code) => {
        const temp = selected;
        if (temp.includes(code)) {
            setSelected((prev) => [...prev].filter((item) => item !== code));
        } else {
            setSelected((prev) => [...prev, code]);
        }
    };

    const startIntegrate = () => {
        if (tab) {
            helperCookies.set('webstore', selected.map((s) => listToMap().find((list) => list.code === s)));
            helperCookies.set('webstore_step', 0);
            router.push('/integration/ecommercechannel/add/integrate/webstore');
        } else {
            helperCookies.set('marketplace', selected);
            helperCookies.set('marketplace_step', 0);
            router.push('/integration/ecommercechannel/add/integrate/marketplace');
        }
    };

    const [getStoreConfigMp] = gqlService.getStoreConfigMp({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (tab) {
                startIntegrate();
            } else if (res && res.getStoreConfig) {
                startIntegrate();
            } else {
                setShow(true);
                window.toastMessage({
                    open: true,
                    text: t("ecommercechannel:Sorry_can't_continue_integration_right_now_please_register_the_Client_Key"),
                    variant: 'error',
                });
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });
    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (!firstLoad && !tab) {
            const onChangeTimeOut = setTimeout(() => {
                getMarketplaceList({
                    variables: {
                        search,
                        filter: {
                            country_id: {
                                like: country,
                            },
                            is_active: { eq: '1' },
                        },
                    },
                });
                return null;
            }, 500);

            return () => clearTimeout(onChangeTimeOut);
        }
        if (firstLoad) {
            setFirstLoad(false);
        }
    }, [search, country]);

    return (
        <div className={classes.contentContainer}>
            <Header search={search} setSearch={setSearch} t={t} />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} transparent />
            <div className={classes.headerContainer}>
                {!tab
                    ? (
                        <div className={classes.rowDiv}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <TextField
                                    multiple
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                    placeholder={t('ecommercechannel:Search')}
                                />
                            </div>
                            <Autocomplete
                                mode="lazy"
                                getOptions={getCountryForMarketplace}
                                value={countryOptions.find((e) => e.country_id === country)}
                                onChange={(newValue) => setCountry(newValue && newValue.country_id)}
                                options={countryOptions}
                                primaryKey="country_id"
                                labelKey="country_name"
                                className={classes.autocompleteRoot}
                                loading={getCountryForMarketplaceRes.loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className={classes.fieldInputRender}
                                        placeholder={t('ecommercechannel:Select_Country')}
                                    />
                                )}
                            />
                        </div>
                    )
                    : <div className={classes.rowDiv} />}
                <div className={clsx(classes.rowDiv, 'last')}>
                    {selected && selected.length
                        ? (
                            <div className={classes.selected}>
                                {`${selected.length} ${t('ecommercechannel:Selected')}`}
                            </div>
                        ) : null}
                    <Button
                        buttonType="primary-rounded"
                        onClick={() => {
                            window.backdropLoader(true);
                            getStoreConfigMp();
                        }}
                        disabled={!selected.length}
                    >
                        {t('ecommercechannel:Start_Integration')}
                    </Button>
                </div>
            </div>

            {(!tab && loading) || (tab && getWebstoreListRes.loading) || load ? (
                <div className={classes.centerDiv}>
                    <CircularProgress className={classes.progress} />
                </div>
            )
                : listToMap().length
                    ? (
                        <div className={classes.gridMp}>
                            {listToMap().map((item, idx) => (
                                <div className={clsx(classes.mpContainer, selected.includes(item.code) && 'active')}>
                                    <FormControlLabel
                                        onChange={() => onChecked(item.code)}
                                        value={item.code}
                                        checked={selected.includes(item.code)}
                                        control={<Checkbox />}
                                        label={(
                                            <div className={classes.mp} key={idx}>
                                                <div className={classes.mpImageContainer}>
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        className={classes.icon}
                                                        onError={(event) => event.target.style.display = 'none'}
                                                    />
                                                </div>
                                                <div>
                                                    <span className={classes.marketName}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        labelPlacement="start"
                                    />
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className={classes.centerDiv}>
                            <span className={classes.noRecords}>{t('ecommercechannel:Data_not_found')}</span>
                        </div>
                    )}
            <ApiModal
                open={show}
                handleClose={() => setShow(false)}
                handleOpen={() => setShow(true)}
                t={t}
                start={startIntegrate}
            />
        </div>
    );
};

export default ChannelListContent;
