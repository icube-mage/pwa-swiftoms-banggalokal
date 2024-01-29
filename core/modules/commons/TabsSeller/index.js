import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY_DARK, TEXT_COLOR } from '@theme_color';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

const useStyles = makeStyles(() => ({
    tabs: {
        boxShadow: 'none',
        marginTop: 10,
        borderBottom: '1px solid rgba(177, 188, 218, .5)',
        '& .MuiTab-textColorInherit.Mui-selected': {
            color: `${PRIMARY_DARK} !important`,
        },
        '&.transparent': {
            backgroundColor: 'transparent',
        },
        '&.rounded': {
            borderRadius: 16,
        },
        '& .MuiTabs-indicator': {
            backgroundColor: PRIMARY_DARK,
            height: 7,
            borderRadius: '6px 6px 0px 0px',
        },
        '& .MuiTabScrollButton-root': {
            width: 20,
            color: PRIMARY_DARK,
        },
        '& .MuiTab-root': {
            minWidth: 'fit-content',
        },
    },
    label: {
        letterSpacing: 0,
        color: TEXT_COLOR,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: 16,
        marginBottom: 5,
        padding: 0,
        marginRight: '5%',
        '@media (max-width: 1023px )': {
            marginBottom: 6,
            fontSize: 13,
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
            className={clsx(styles.tabs, transparent && 'transparent', rounded && 'rounded')}
            {...containerProps}
        >
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                scrollButtons="on"
                variant="scrollable"
                {...tabsProps}
            >
                {
                    allItems && (<Tab className={styles.label} label={t('common:All')} {...a11yProps(0)} />)
                }
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return <Tab className={styles.label} key={index} {...itemData} {...a11yProps(allItems ? index + 1 : index)} />;
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;
