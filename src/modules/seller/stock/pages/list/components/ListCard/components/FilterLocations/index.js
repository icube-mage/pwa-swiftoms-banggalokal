/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import clsx from 'clsx';

import InputAdornment from '@material-ui/core/InputAdornment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';

import TextField from '@common_textfield';
import Button from '@common_button';
import Checkbox from '@common_checkbox';

import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/FilterLocations/style';

const TabsHeader = (props) => {
    const {
        t, filterLoc, setFilterLoc, dataLocations = [], loadingLoc, setAnchorEl, anchorEl, searchLoc, setSearchLoc,
    } = props;

    const [filterLocTemp, setFilterLocTemp] = React.useState([]);

    const classes = useStyles();

    const getArrowClass = (anchor) => (anchor ? classes.arrowUp : classes.arrowDown);

    const handleChecked = (check, v) => {
        if (check) {
            setFilterLocTemp((prev) => [...prev, v]);
        } else {
            setFilterLocTemp((prev) => prev.filter((p) => p.id !== v.id));
        }
    };

    useEffect(() => {
        setFilterLocTemp(filterLoc);
    }, [anchorEl]);

    return (
        <div className="top-item">
            <Button
                className={classes.btnFilter}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={
                    <KeyboardArrowRightIcon className={getArrowClass(anchorEl)} />
                }
                buttonType="outlined"
            >
                {t('sellerstock:Filter_Location')}
            </Button>
            <Menu
                elevation={1}
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
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
                <div className={classes.menuContainer}>
                    <TextField
                        placeholder={t('common:Search_location_name')}
                        value={searchLoc}
                        onChange={(e) => setSearchLoc(e.target.value)}
                        className={classes.textInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                </InputAdornment>
                            ),
                            endAdornment: searchLoc === '' ? false : (
                                <InputAdornment position="end">
                                    <Button
                                        classic
                                        bg="transparent"
                                        padding="0"
                                        margin="0"
                                        classicButtonIcon={<img alt="" src="/assets/img/icon_close.svg" />}
                                        classicButtonOnClick={() => setSearchLoc('')}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className={classes.buttonTextDiv}>
                        <Button buttonType="buttonText" className={classes.buttonText} onClick={() => setFilterLocTemp(dataLocations)}>
                            {t('common:Select_All')}
                        </Button>
                        <div className="btn-icon-div">
                            <Button
                                buttonType="buttonText"
                                className={classes.buttonText}
                                startIcon={<CancelIcon className="icon" />}
                                onClick={() => setFilterLocTemp([])}
                            >
                                {t('common:Clear')}
                            </Button>
                        </div>
                    </div>
                    <div className="bold">
                        {t('common:Choosen_Location')}
                    </div>
                    <div className={classes.menuItemContainer}>
                        {loadingLoc
                            ? (
                                <div className="center gray">
                                    Loading...
                                </div>
                            )
                            : dataLocations.length ? dataLocations?.map((loc, i) => {
                                const isChecked = !!filterLocTemp.find(({ id }) => id === loc.id);
                                return (
                                    <MenuItem key={i} className={classes.menuItem}>
                                        <Checkbox
                                            label={loc.name}
                                            checked={isChecked}
                                            setChecked={(e) => handleChecked(e.target.checked, loc)}
                                            className={clsx(classes.checkboxOption, isChecked && 'checked')}
                                        />
                                    </MenuItem>
                                );
                            })
                                : (
                                    <div className="center gray">
                                        {t('common:No_location_found')}
                                    </div>
                                )}
                    </div>
                    <Divider className="divider" />
                    <div className={classes.buttonBottomDiv}>
                        <Button onClick={() => setAnchorEl(null)} buttonType="outlined" className={classes.buttonBottom} fullWidth>
                            {t('common:Close')}
                        </Button>
                        <Button onClick={() => { setFilterLoc(filterLocTemp); setAnchorEl(null); }} className={classes.buttonBottom} fullWidth>
                            {t('common:Apply')}
                        </Button>
                    </div>
                </div>
            </Menu>
        </div>
    );
};

export default TabsHeader;
