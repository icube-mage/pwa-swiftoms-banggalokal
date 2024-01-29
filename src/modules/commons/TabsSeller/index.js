import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, PURPLE, BORDER_COLOR, BLACK,
} from '@theme_color';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

const fontFamily = '"Plus Jakarta Sans", sans-serif';
const useStyles = makeStyles((theme) => ({
    tabs: {
        boxShadow: 'none',
        marginTop: 15,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        paddingLeft: 15,
        [theme.breakpoints.down('xs')]: {
            borderBottom: 'none',
            paddingLeft: 0,
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
            fontWeight: 600,
            color: `${PURPLE} !important`,
        },
        '&.rounded': {
            borderRadius: 16,
        },
        '& .MuiTabs-indicator': {
            backgroundColor: PURPLE,
            height: 7,
            borderRadius: '6px 6px 0px 0px',
        },
        '& .MuiTabScrollButton-root': {
            width: 30,
            color: PRIMARY_DARK,
        },
        '& .MuiTab-root': {
            minWidth: 'fit-content',
        },
        '&.noBorder': {
            border: 0,
            marginTop: 0,
        },
        '&.transparent': {
            backgroundColor: 'transparent',
            border: `0 solid ${BORDER_COLOR}`,
            marginTop: 0,
        },
        '&.topTable': {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            [theme.breakpoints.up('sm')]: {
                borderBottom: 'none',
            },
        },
    },
    label: {
        fontFamily,
        letterSpacing: 0,
        color: BLACK,
        textTransform: 'none',
        fontSize: 14,
        marginTop: 20,
        marginBottom: 5,
        padding: 0,
        marginRight: 40,
        opacity: 1,
        '@media (max-width: 1023px )': {
            marginBottom: 0,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        },
        '&.transparent': {
            marginTop: 0,
        },
        '&.dense': {
            marginTop: 0,
        },
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const CustomTabs = (props) => {
    const { t } = useTranslation('common');
    const {
        data = [],
        onChange,
        value,
        allItems = true,
        tabsProps = {},
        containerProps = {},
        transparent = false,
        rounded = false,
        noBorder = false,
        dense = false,
        topTable = false,
    } = props;
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setLocalValue(newValue);
    };
    return (
        <AppBar
            position="static"
            color="inherit"
            className={clsx(
                styles.tabs,
                noBorder && 'noBorder',
                transparent && 'transparent',
                rounded && 'rounded',
                topTable && 'topTable',
            )}
            {...containerProps}
        >
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                scrollButtons="on"
                variant="scrollable"
                ScrollButtonComponent={() => <span style={{ width: 15 }} />}
                {...tabsProps}
            >
                {
                    allItems && (
                        <Tab
                            className={clsx(
                                styles.label, dense && 'dense', transparent && 'transparent',
                            )}
                            label={t('common:All')}
                            {...a11yProps(0)}
                        />
                    )
                }
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return (
                        <Tab
                            className={clsx(styles.label, dense && 'dense', transparent && 'transparent')}
                            key={index}
                            {...itemData}
                            {...a11yProps(allItems ? index + 1 : index)}
                        />
                    );
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;
