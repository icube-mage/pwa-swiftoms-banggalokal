/* eslint-disable no-nested-ternary */
import React from 'react';
import useStyles from '@common_tableheadertab/style';
import Button from '@common_button/index';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useRouter } from 'next/router';
import { BLACK, PRIMARY_SOFT, WHITE } from '@theme_color';
import clsx from 'clsx';

const TableHeaderTab = ({
    t,
    mobile,
    muiTab,
    muiTabOnChange,
    muiTabIndex,
    dataTabs,
    baseLinkUrl = '/seller/catalog',
    baseLinkUrlOnClick,
    mobileOnclickHeaderCallback,
}) => {
    const classes = useStyles();
    const router = useRouter();
    const getStatus = router?.query?.status ?? dataTabs[0]?.query?.status;
    const [activeMobile, setActiveMobile] = React.useState(getStatus);

    if (!dataTabs) return null;
    if (muiTab) {
        return (
            <div id="table-header-tab" className={classNames('catalog-header-tab', classes.tableHeaderTab)}>
                <Tabs
                    className="table-header-tab-mui"
                    value={muiTabIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(e, newValue) => {
                        muiTabOnChange({ e, newValue });
                    }}
                >
                    {
                        dataTabs.map((value, index) => (
                            <Tab
                                key={`tab-mui-${index}`}
                                id={`tab-mui-${index}`}
                                label={value.name}
                                disabled={value.disabled}
                            />
                        ))
                    }
                </Tabs>
            </div>
        );
    }

    if (mobile) {
        return (
            <div id="table-header-tab-mobile" className={classNames('catalog-header-tab-mobile', classes.tableHeaderTabMobile)}>
                <div className="title">{t('common:Product_Status')}</div>
                <ul>
                    {
                        dataTabs.map((value, index) => {
                            const itemStatus = value?.query?.status;
                            const isActive = itemStatus === activeMobile;
                            return (
                                <li
                                    key={`catalog-header-item-${index}`}
                                    className={clsx('catalog-header-tab-item', { active: isActive })}
                                >
                                    <div className={clsx('header-tab-item', { active: isActive, inactive: !isActive })}>
                                        <Button
                                            border="0"
                                            padding="0"
                                            className="header-badge-title"
                                            bg={isActive ? PRIMARY_SOFT : 'transparent'}
                                            color={isActive ? WHITE : BLACK}
                                            fontWeight={isActive ? 'bold' : false}
                                            classic
                                            classicButtonLabel={value.name}
                                            disabled={value?.disabled ?? false}
                                            classicButtonOnClick={() => {
                                                setActiveMobile(itemStatus);
                                                mobileOnclickHeaderCallback({
                                                    pathname: baseLinkUrl,
                                                    query: value.query,
                                                });
                                            }}
                                        />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="clear" />
            </div>
        );
    }

    return (
        <div id="table-header-tab" className={classNames('catalog-header-tab', classes.tableHeaderTab)}>
            <ul>
                {
                    dataTabs.map((value, index) => {
                        const isActive = value?.query?.status === getStatus;
                        return (
                            <li
                                key={`catalog-header-item-${index}`}
                                className="catalog-header-tab-item"
                            >
                                <div className={`header-tab-item ${isActive ? 'active' : 'inactive'}`}>
                                    <Button
                                        border="0"
                                        className="header-badge-title"
                                        nextLink={baseLinkUrl}
                                        nextLinkQuery={value.query}
                                        nextLinkOnClick={baseLinkUrlOnClick}
                                        bg="transparent"
                                        color={isActive ? PRIMARY_SOFT : BLACK}
                                        fontWeight={isActive ? 'bold' : false}
                                        classic
                                        classicButtonLabel={value.name}
                                        disabledBgTransparent={value?.disabled ?? false}
                                    />
                                </div>
                                {
                                    value?.count && (
                                        <div className={`header-badge-item ${isActive ? 'active' : 'inactive'}`}>
                                            <span>{value?.count ? (value.count > 100 ? '99+' : value.count) : 0}</span>
                                        </div>
                                    )
                                }
                            </li>
                        );
                    })
                }
            </ul>
            <div className="clear" />
        </div>
    );
};

export default TableHeaderTab;
