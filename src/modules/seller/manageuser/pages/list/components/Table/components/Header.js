/* eslint-disable */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import gqlSeller from '@sellermodules/storesetting/services/graphql';
import Button from '@common_button';
import TextField from '@common_textfield';
import Checkbox from '@common_checkbox';

import { useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import useStyles from '@sellermodules/manageuser/pages/list/components/Table/style';

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '', search, setSearch, t,
        dataLocations, filters = [], setFilters, count,
    } = props;

    const router = useRouter();
    const classes = useStyles();

    const [anchorElLoc, setAnchorElLoc] = React.useState(null);
    const [filterOptions, setFilterOptions] = React.useState({ location: [] });
    const [filterLocName, setFilterLocName] = React.useState([]);
    const debouncedFilterLoc = useDebounce(filterOptions.location, 100);
    const { data: dataSeller } = gqlSeller.getSeller();
    const userManageStatus = dataSeller?.getSeller?.subscribtion_plan?.limit_user || false;

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const handleClickOpenButton = (event, set) => {
        set(event.currentTarget);
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

    const handleChecked = (check, v, filter) => {
        const val = String(v.loc_code);
        if (check) {
            if (filter === 'location') {
                setFilterOptions({ location: [...filterOptions.location, val] });
                setFilterLocName((prev) => [...prev, v]);
            }
        } else {
            setFilterOptions({ location: [...filterOptions.location, val].filter((p) => p !== val) });
            setFilterLocName((prev) => prev.filter((p) => p.loc_code !== v.loc_code));
        }
    };

    const handleReset = () => {
        setSearch('');
        setFilterLocName([]);
        setFilters([]);
        setFilterOptions({ location: [] });
    };

    React.useEffect(() => {
        const locTemp = {
            field: 'loc_code',
            name: 'loc_code',
            type: 'in',
            value: '',
        };
        let temp = [...filters];

        filterOptions.location.forEach((z) => {
            locTemp.value = [...locTemp.value, z];
        });
        temp = insertFilter(locTemp, temp);

        setFilters([...temp]);
    }, [debouncedFilterLoc]);

    return (
        <>
            <Paper className={classes.paperHead} style={{ marginBottom: 20 }}>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad">
                        <div className="top-item-left header">
                            {header}
                        </div>
                        <div className="top-item-right">
                            <div className="top-item" style={{ cursor: userManageStatus !== false && count >= userManageStatus ? 'not-allowed' : 'pointer' }}>
                                <Button
                                    className={classes.btn}
                                    startIcon={
                                        <img src="/assets/img/avatar-white.svg" alt="ava-icon" />
                                    }
                                    onClick={() => router.push('/seller/manageuser/create')}
                                    disabled={userManageStatus !== false && count >= userManageStatus}                                    
                                >
                                    {t('sellermanageuser:Create_User')} {userManageStatus !== false ? `( ${count}/${userManageStatus || 0} )` : '' }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.paperHead} style={{ borderRadius: '8px 8px 0 0' }}>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad wrapper-filter">
                        <div className="top-item-left">
                            <div className="top-item">
                                <TextField
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={clsx(classes.textInput, 'full')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                        </div>
                        <div className="top-item-right">
                            <div className="top-item">
                                <Button
                                    className={clsx(classes.btnFilter, 'gray')}
                                    onClick={(e) => handleClickOpenButton(e, setAnchorElLoc)}
                                    endIcon={
                                        <KeyboardArrowRightIcon className={getArrowClass(anchorElLoc)} />
                                    }
                                >
                                    {t('sellermanageuser:Location')}
                                </Button>
                                <Menu
                                    elevation={1}
                                    getContentAnchorEl={null}
                                    anchorEl={anchorElLoc}
                                    open={Boolean(anchorElLoc)}
                                    onClose={() => setAnchorElLoc(null)}
                                    className={classes.menuAction}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    {dataLocations.map((tamp, i) => (
                                        <MenuItem key={i} className={classes.menuItem}>
                                            <Checkbox
                                                label={tamp.loc_name}
                                                checked={filterOptions.location.includes(String(tamp.loc_code))}
                                                setChecked={(e) => handleChecked(e.target.checked, tamp, 'location')}
                                                className={classes.checkboxOption}
                                            />
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className={classes.expandContainer}>
                        <Collapse in={!!(search || !filters.filter((filt) => filt.name !== 'status').every((field) => isEmpty(field.value)))}>
                            <div className={classes.expandGrid} style={{ marginTop: 20 }}>
                                {(!!search || !filters.every((field) => isEmpty(field.value)))
                                    && (
                                        <Button
                                            className={classes.btnFilterText}
                                            onClick={handleReset}
                                        >
                                            {t('common:Reset_Filter')}
                                        </Button>
                                    )}
                                <Grid
                                    container
                                    spacing={3}
                                    alignContent="center"
                                    alignItems="center"
                                >
                                    {!!search
                                        && (
                                            <Grid item className="filter-item">
                                                {search}
                                                <IconButton className={classes.closeButton} onClick={() => setSearch('')}>
                                                    <CloseIcon className={classes.closeIcon} />
                                                </IconButton>
                                            </Grid>
                                        )}
                                    {filterLocName.map((tamp) => (
                                        <Grid item className="filter-item" xs="auto">
                                            {tamp.loc_name}
                                            <IconButton className={classes.closeButton} onClick={() => handleChecked(false, tamp)}>
                                                <CloseIcon className={classes.closeIcon} />
                                            </IconButton>
                                        </Grid>

                                    ))}
                                </Grid>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default TabsHeader;
