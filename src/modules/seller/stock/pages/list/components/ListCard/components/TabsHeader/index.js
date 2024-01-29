import { useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import Tabs from '@common_tabsseller';
import TextField from '@common_textfield';
import Button from '@common_button';

import FilterLocations from '@sellermodules/stock/pages/list/components/ListCard/components/FilterLocations';
import FilterLocationsMobile from '@sellermodules/stock/pages/list/components/ListCard/components/FilterLocations/mobile';
import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/TabsHeader/style';

const TabsHeader = (props) => {
    const {
        t, searchPlaceholder = '', filters = [], setFilters, header,
        search, setSearch, dataTabs, tab, dataLocDefault = {}, setOpenSyncModal,
    } = props;

    const router = useRouter();
    const classes = useStyles();

    const [showMobileFilter, setShowMobileFilter] = React.useState(false);

    const [anchorElLoc, setAnchorElLoc] = React.useState(null);
    const [filterLoc, setFilterLoc] = React.useState(dataLocDefault?.id ? [dataLocDefault] : []);
    const debouncedFilterLoc = useDebounce(filterLoc, 100);

    const onChangeTab = async (e, v) => {
        if (tab !== v) {
            const routeParams = v === 'all' ? '' : `/${v}`;
            await router.replace(`/seller/stock${routeParams}`, undefined, { shallow: true });
            if (v === 'all') {
                setFilterLoc(dataLocDefault?.id ? [dataLocDefault] : []);
            }
        }
    };

    const insertFilter = (field, array = []) => {
        const index = filters.findIndex((filter) => filter.name === field.name);
        const temp = [...array];
        if (index >= 0) {
            temp.splice(index, 1, field);
        } else {
            temp.push(field);
        }
        return temp;
    };

    const handleReset = () => {
        setFilterLoc([]);
        setFilters([]);
    };

    useEffect(() => {
        const locTemp = {
            field: 'loc_id',
            name: 'loc_id',
            type: 'in',
            value: '',
        };
        let temp = [...filters];

        filterLoc.forEach((loc) => {
            locTemp.value = [...locTemp.value, String(loc.id)];
        });
        temp = insertFilter(locTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterLoc]);

    useEffect(() => {
        if (router.query?.status === 'failed') {
            setFilterLoc([]);
        }
    }, [router]);

    return (
        <Paper className={classes.paperHead}>
            <div className="hidden-mobile">
                <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} noBorder />
                <Button
                    className={classes.btnSync}
                    buttonType="outlined"
                    onClick={() => setOpenSyncModal(true)}
                >
                    {t('enable_stock_sync')}
                </Button>
            </div>
            <div className="hidden-desktop">
                <div className={classes.searchHeader}>
                    <TextField
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={classes.textInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                </InputAdornment>
                            ),
                            endAdornment: search === '' ? false : (
                                <InputAdornment position="end">
                                    <Button
                                        classic
                                        bg="transparent"
                                        padding="0"
                                        margin="0"
                                        classicButtonIcon={<img alt="" src="/assets/img/icon_close.svg" />}
                                        classicButtonOnClick={() => setSearch('')}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className={classes.contSync}>
                        <Button
                            className={classes.btnPurple}
                            buttonType="outlined"
                            onClick={() => setOpenSyncModal(true)}
                        >
                            {t('enable_stock_sync')}
                        </Button>
                    </div>

                </div>
                <div className={classes.tabsMobileContainer}>
                    <Tabs data={dataTabs} onChange={onChangeTab} value={tab} allItems={false} noBorder />
                </div>
                <div className={classes.headerMobileContainer}>
                    {header}
                    <Button
                        padding="8px 15px"
                        classic
                        classicButtonIcon={<img src="/assets/img/icon_filter_sliders.svg" alt="icon filter" />}
                        classicButtonLabel={t('common:choose_filter')}
                        classicButtonOnClick={() => setShowMobileFilter(true)}
                    />
                    <FilterLocationsMobile
                        {...props}
                        showMobileFilter={showMobileFilter}
                        setShowMobileFilter={setShowMobileFilter}
                        filterLoc={filterLoc}
                        setFilterLoc={setFilterLoc}
                        anchorEl={anchorElLoc}
                        setAnchorEl={setAnchorElLoc}
                    />
                </div>
            </div>
            <div className={clsx(classes.tableToolbar, 'hidden-mobile')}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                            <TextField
                                placeholder={searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={classes.textInput}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: search === '' ? false : (
                                        <InputAdornment position="end">
                                            <Button
                                                classic
                                                bg="transparent"
                                                padding="0"
                                                margin="0"
                                                classicButtonIcon={<img alt="" src="/assets/img/icon_close.svg" />}
                                                classicButtonOnClick={() => setSearch('')}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    {tab !== 'failed'
                        && (
                            <div className="top-item-right">
                                <FilterLocations
                                    {...props}
                                    filterLoc={filterLoc}
                                    setFilterLoc={setFilterLoc}
                                    anchorEl={anchorElLoc}
                                    setAnchorEl={setAnchorElLoc}
                                />
                            </div>
                        )}
                </div>
                {tab !== 'failed'
                    && (
                        <div className={classes.expandContainer}>
                            <Collapse in={!filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value))}>
                                <div className={classes.expandGrid}>
                                    {(!filters.every((field) => isEmpty(field.value)))
                                        && (
                                            <Button
                                                className={classes.btnFilterText}
                                                onClick={handleReset}
                                            >
                                                {t('common:Reset_Filter')}
                                                {' '}
                                                :
                                            </Button>
                                        )}
                                    <Grid
                                        spacing={2}
                                        container
                                        alignContent="center"
                                        alignItems="center"
                                    >
                                        {filterLoc.map((loc) => (
                                            <Grid item xs="auto" key={loc.id}>
                                                <div className="filter-item">
                                                    {loc.name}
                                                    <IconButton
                                                        className={classes.closeButton}
                                                        onClick={() => setFilterLoc((prev) => prev.filter((p) => p.id !== loc.id))}
                                                    >
                                                        <CloseIcon className={classes.closeIcon} />
                                                    </IconButton>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </Collapse>
                        </div>
                    )}
            </div>
        </Paper>
    );
};

export default TabsHeader;
