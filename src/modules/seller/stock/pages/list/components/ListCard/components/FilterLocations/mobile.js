/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import clsx from 'clsx';

import InputAdornment from '@material-ui/core/InputAdornment';

import CancelIcon from '@material-ui/icons/Cancel';

import TextField from '@common_textfield';
import Button from '@common_button';
import Checkbox from '@common_checkbox';
import AppModal from '@common_appmodal/index';

import useStyles from '@sellermodules/stock/pages/list/components/ListCard/components/FilterLocations/style';

const TabsHeader = (props) => {
    const {
        t, filterLoc, setFilterLoc, dataLocations = [], loadingLoc, searchLoc, setSearchLoc,
        showMobileFilter, setShowMobileFilter,
    } = props;

    const [filterLocTemp, setFilterLocTemp] = React.useState([]);

    const classes = useStyles();

    const handleChecked = (check, v) => {
        if (check) {
            setFilterLocTemp((prev) => [...prev, v]);
        } else {
            setFilterLocTemp((prev) => prev.filter((p) => p.id !== v.id));
        }
    };

    useEffect(() => {
        setFilterLocTemp(filterLoc);
    }, [showMobileFilter]);

    return (
        <AppModal
            bottom
            closeButton
            positiveButtonFullWidth
            show={showMobileFilter}
            onHandleClose={() => setShowMobileFilter(false)}
            title={t('common:Filter_Location')}
            positiveLabel={t('common:Save')}
            onClickPositive={() => { setFilterLoc(filterLocTemp); setShowMobileFilter(false); }}
        >
            <div className="top-item">
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
                                    <Checkbox
                                        key={i}
                                        label={loc.name}
                                        checked={isChecked}
                                        setChecked={(e) => handleChecked(e.target.checked, loc)}
                                        className={clsx(classes.checkboxOption, isChecked && 'checked')}
                                    />
                                );
                            })
                                : (
                                    <div className="center gray">
                                        {t('common:No_location_found')}
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </AppModal>

    );
};

export default TabsHeader;
