/* eslint-disable eqeqeq */
import React from 'react';
import clsx from 'clsx';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TableHeaderTab from '@root/src/modules/commons/TableHeaderTab/index';
import Button from '@common_button/index';
import AppModal from '@common_appmodal/index';
import Show from '@common_show/index';
import { getComponentOrString } from '@common_tableseller/helpers/index';
import FilterCustomMobile from '@sellermodules/catalog/pages/list/components/Table/components/FilterCustomMobile';
import { useRouter } from 'next/router';

const TableHeaderColumn = (props) => {
    const {
        t,
        dataTabs,
        classes,
        primaryKey,
        rows,
        columns,
        checkedRows,
        setCheckedRows,
        isCheckedAllRows,
        setIsCheckedAllRows,
        sorts,
        setSorts,
        handleChecked,
        mobile,
        isCatalogFailed,
    } = props;
    const router = useRouter();
    const [showMobileFilter, setShowMobileFilter] = React.useState(false);
    const [pathnameFilter, setPathnameFilter] = React.useState(null);
    const [clickTabMobile, setClickTabMobile] = React.useState(0);

    const onHandleFilterOpen = React.useCallback(() => {
        setShowMobileFilter(true);
    }, []);

    const onHandleFilterClose = React.useCallback(() => {
        setShowMobileFilter(false);
    }, []);

    const handleChangeCheckboxAllRows = (checked) => {
        const newCheckedRows = rows.reduce((accumulator, currentValue) => {
            const i = accumulator.findIndex((checkedRow) => checkedRow[primaryKey] === currentValue[primaryKey]);
            if (checked && i < 0) {
                accumulator.push(currentValue);
            } else if (!checked && i >= 0) {
                return accumulator.filter((checkedRow) => checkedRow[primaryKey] != currentValue[primaryKey]);
            }
            return accumulator;
        }, checkedRows);
        setCheckedRows(newCheckedRows);
        setIsCheckedAllRows(checked);
        handleChecked(newCheckedRows);
    };
    const setSortByField = (field) => {
        setSorts(
            sorts.map((sort) => ({
                ...sort,
                ...(sort.field === field && { value: sort.value === 'ASC' ? 'DESC' : 'ASC' }),
                ...(sort.field != field && { value: undefined }),
            })),
        );
    };
    const getSortValue = (field) => {
        const sort = sorts.find((e) => e.field === field);
        return sort && sort.value;
    };

    const getArrowClass = (field) => (getSortValue(field) === 'ASC' ? classes.arrowDown : classes.arrowUp);

    const mobileOnclickHeaderCallback = (pathname) => {
        setPathnameFilter({
            ...pathnameFilter,
            status: pathname,
        });
        setClickTabMobile(clickTabMobile + 1);
    };

    React.useEffect(() => {
        if (pathnameFilter) {
            router.push(pathnameFilter?.status);
        }
    }, [clickTabMobile]);

    if (mobile) {
        return (
            <div className={classes.tableHeaderMobile}>
                <div className="header-mobile-left">
                    <Show when={!isCatalogFailed}>
                        <Checkbox
                            className={classes.checkbox}
                            checked={isCheckedAllRows}
                            onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                        />
                        <span className="checkbox-label">{t('common:choose_all')}</span>
                    </Show>
                </div>
                <div className="header-mobile-right">
                    <Button
                        padding="8px 15px"
                        classic
                        classicButtonIcon={<img src="/assets/img/icon_filter_sliders.svg" alt="icon filter" />}
                        classicButtonLabel={t('common:choose_filter')}
                        classicButtonOnClick={onHandleFilterOpen}
                        style={{ width: 'fit-content' }}
                    />
                </div>
                <AppModal
                    bottom
                    closeButton
                    positiveButtonFullWidth
                    show={showMobileFilter}
                    onHandleClose={onHandleFilterClose}
                    title={t('common:filter_product')}
                >
                    <TableHeaderTab
                        t={t}
                        mobile
                        dataTabs={dataTabs}
                        onHandleFilterClose={onHandleFilterClose}
                        mobileOnclickHeaderCallback={mobileOnclickHeaderCallback}
                    />
                    <FilterCustomMobile
                        pathnameFilter={pathnameFilter}
                        setPathnameFilter={setPathnameFilter}
                        {...props}
                    />
                </AppModal>
            </div>
        );
    }

    return (
        <TableHead>
            <TableRow className={classes.tableHead}>
                <TableCell padding="checkbox">
                    <Show when={!isCatalogFailed}>
                        <Checkbox
                            className={classes.checkbox}
                            checked={isCheckedAllRows}
                            onChange={(e) => handleChangeCheckboxAllRows(e.target.checked)}
                        />
                    </Show>
                </TableCell>
                {
                    columns.map((column, columnIndex) => {
                        const isSortable = column.sortable;
                        return (
                            <TableCell
                                key={columnIndex}
                                className={clsx(column.hidden && 'hide')}
                            >
                                { !isSortable && getComponentOrString(column.headerName) }
                                {
                                    isSortable && (
                                        <Button
                                            onClick={() => setSortByField(column.field)}
                                            className={classes.sortButon}
                                            buttonType="link"
                                            endIcon={
                                                getSortValue(column.field) ? (
                                                    <ArrowRightAltIcon className={getArrowClass(column.field)} />
                                                ) : (
                                                    <ImportExportIcon style={{ opacity: 0.3 }} />
                                                )
                                            }
                                        >
                                            {column.headerName}
                                        </Button>
                                    )
                                }
                            </TableCell>
                        );
                    })
                }
                <TableCell padding="checkbox">
                    {t('common:Actions')}
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeaderColumn;
