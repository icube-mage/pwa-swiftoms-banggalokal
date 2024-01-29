import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY } from '@theme_color';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

const useStyles = makeStyles(() => ({
    tabs: {
        boxShadow: 'none',
        marginTop: 10,
        '& .MuiTab-textColorInherit.Mui-selected': {
            color: `${PRIMARY} !important`,
        },
        '&.transparent': {
            backgroundColor: 'transparent',
        },
        '&.rounded': {
            borderRadius: 16,
        },
        '& .MuiButtonBase-root.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
        '& .MuiTab-root': {
            minWidth: 'auto',
            maxWidth: 'fit-content',
        },
        '& .MuiTabScrollButton-root': {
            display: 'none',
        },
    },
    label: {
        letterSpacing: 0,
        color: '#435179',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 16,
        margin: '0 1%',
        '@media (max-width: 767px )': {
            margin: '0',
            fontSize: 12,
            letterSpacing: '0.6px',
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
        containerClass,
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
            className={clsx(styles.tabs, transparent && 'transparent', rounded && 'rounded', containerClass)}
            {...containerProps}
        >
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                variant="scrollable"
                aria-label="scrollable prevent tabs example"
                TabIndicatorProps={{
                    style: {
                        backgroundColor: PRIMARY,
                    },
                }}
                {...tabsProps}
            >
                {
                    allItems && (<Tab className={styles.label} label={t('common:All')} {...a11yProps(0)} />)
                }
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return (
                        <Tab
                            className={styles.label}
                            key={index}
                            {...itemData}
                            {...a11yProps(allItems ? index + 1 : index)}
                            disabled={item.disabled}
                        />
                    );
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;
