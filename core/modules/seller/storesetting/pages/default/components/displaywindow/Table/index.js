/* eslint-disable no-prototype-builtins */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import { SortableContainer, SortableHandle, SortableElement, arrayMove } from 'react-sortable-hoc';
import { useTranslation } from '@i18n';
import { useRouter } from 'next/router';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getComponentOrString, useDebounce, isEmpty } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import Button from '@common_button';

import Header from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/components/Header';
import Action from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/components/Action';
import Confirmation from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/components/Confirmation';
import MainImageModal from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/components/MainImageModal';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import useStyles from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/style';

const CustomTable = (props) => {
    const { t } = useTranslation('common');
    const {
        primaryKey = 'entity_id',
        rows,
        getRows,
        loading,
        filters: initialFilters = [],
        initialPage = 1,
        initialRowsPerPage = 1000,
        getVariables,
        columns = [],
        handleFeatured,
        handleMove,
    } = props;
    // hooks
    const router = useRouter();
    const classes = useStyles();
    const [items, setItems] = React.useState(rows);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [filters, setFilters] = React.useState(initialFilters.map((filter) => ({ ...filter, value: filter.initialValue })));
    const [expandedToolbar, setExpandedToolbar] = React.useState();
    const [sorts, setSorts] = React.useState(
        columns.filter((column) => column.sortable).map(({ field, initialSort }) => ({ field, value: initialSort || undefined })),
    );

    const [windowDeleted, setWindowDeleted] = React.useState({});
    const [windowImage, setwindowImage] = React.useState({});

    // methods
    const fetchRows = () => {
        const variables = {
            pageSize: initialRowsPerPage,
            currentPage: initialPage,
            filter: filters
                .filter((e) => !isEmpty(e.value))
                .reduce((accumulator, currentValue) => {
                    accumulator[currentValue.field] = {
                        ...accumulator[currentValue.field],
                        [currentValue.type]: currentValue.value,
                    };
                    return accumulator;
                }, {}),
            sort: sorts.reduce((accumulator, currentValue) => {
                accumulator[currentValue.field] = currentValue.value || undefined;
                return accumulator;
            }, {}),
            search,
        };
        if (getVariables) {
            getVariables(variables);
        }
        getRows({ variables });
    };

    // effects
    React.useEffect(() => {
        if (getRows) {
            fetchRows();
        }
    }, [debouncedSearch, sorts]);

    React.useEffect(() => {
        setItems(rows);
    }, [rows]);

    const renderTableHeader = () => {
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
        return (
            <TableHead>
                <TableRow className={classes.tableHead}>
                    <TableCell padding="checkbox" />
                    {columns.map((column, columnIndex) => (
                        <TableCell
                            key={columnIndex}
                            className={clsx(column.hidden && 'hide')}
                        >
                            {!column.sortable && getComponentOrString(column.headerName)}
                            {column.sortable && (
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
                            )}
                        </TableCell>
                    ))}
                    <TableCell colSpan={2} />
                </TableRow>
            </TableHead>
        );
    };

    const renderAction = (row) => {
        const rowActions = [
            {
                label: t('storesetting:Manage_display_window'),
                confirmDialog: true,
                onClick: () => {
                    router.push({
                        pathname: '/seller/displaywindow/edit/[id]',
                        query: { id: row.entity_id },
                    });
                },
                link: () => `/seller/displaywindow/edit/${row.entity_id}`,
            },
            {
                label: row.is_pinned ? t('storesetting:Remove_featured_display_window')
                    : t('storesetting:Make_it_a_featured_display_window'),
                confirmDialog: true,
                onClick: () => {
                    handleFeatured(row);
                },
            },
            {
                label: t('storesetting:Select_main_image'),
                confirmDialog: true,
                onClick: () => {
                    setwindowImage(row);
                },
            },
            {
                label: t('storesetting:Delete_display_window'),
                confirmDialog: true,
                onClick: () => {
                    setWindowDeleted(row);
                },
                message: t('common:Are_you_sure_want_to_delete_selected_items'),
            },
        ];
        return (
            <>
                <Action
                    openButton={{ label: '' }}
                    menuItems={rowActions.map((action) => ({
                        label: action.label,
                        onClick: () => action.onClick(row),
                        link: action.link ? action.link(row) : null,
                    }))}
                    t={t}
                />
            </>
        );
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            if ((items[oldIndex].is_pinned && items[newIndex].is_pinned) || (!items[oldIndex].is_pinned && !items[newIndex].is_pinned)) {
                setItems(arrayMove(items, oldIndex, newIndex));
                handleMove(items[oldIndex], newIndex + 1);
            } else {
                window.toastMessage({
                    open: true,
                    text: items[oldIndex].is_pinned
                        ? t('storesetting:You_cannot_move_featured_display_window_under_unfeatured_display_window')
                        : t('storesetting:You_cannot_move_unfeatured_display_window_above_featured_display_window'),
                    variant: 'error',
                });
            }
        }
    };

    const handleSortStart = ({ node }) => {
        const tds = document.getElementsByClassName('SortableHelper')[0].childNodes;
        node.childNodes.forEach(
            (n, idx) => {
                tds[idx].style.width = `${n.offsetWidth}px`;
            },
        );
    };

    const DragHandle = SortableHandle(({ style }) => (
        <span style={{ ...style }} className={clsx(classes.dragHandle, debouncedSearch && 'invisible')}>
            <img src="/assets/img/drag_icon.svg" alt="drag_icon" />
        </span>
    ));

    const TableBodySortable = SortableContainer(({ children }) => (
        <TableBody>
            {children}
        </TableBody>
    ));

    const SortableRow = SortableElement(({ row, rowIndex }) => {
        return (
            <TableRow
                key={rowIndex}
                className={clsx(classes.tableRow, rowIndex % 2 && 'gray')}
            >
                <TableCell padding="checkbox" />
                {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>
                        {getComponentOrString(row[column.field]) || '-'}
                    </TableCell>
                ))}
                <TableCell padding="checkbox">
                    {!row.is_default
                        && (
                            <DragHandle />
                        )}
                </TableCell>
                <TableCell padding="checkbox">
                    {!row.is_default
                        && (
                            renderAction(row)
                        )}
                </TableCell>
            </TableRow>
        );
    });

    const renderTableBody = () => {
        return (
            <TableBodySortable
                onSortStart={handleSortStart}
                onSortEnd={onSortEnd}
                useDragHandle
                lockAxis="y"
                helperClass="SortableHelper"
            >
                {loading
                    ? (
                        <TableRow style={{ height: 90 }}>
                            <TableCell colSpan={4}>
                                <div className={classes.loading}>Loading . . .</div>
                            </TableCell>
                        </TableRow>
                    )
                    : items.map((row, index) => (row.is_default
                        ? (
                            <TableRow
                                key={index}
                                className={clsx(classes.tableRow, index % 2 && 'gray')}
                            >
                                <TableCell padding="checkbox" />
                                {columns.map((column, columnIndex) => (
                                    <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignTop)}>
                                        {getComponentOrString(row[column.field]) || '-'}
                                    </TableCell>
                                ))}
                                <TableCell padding="checkbox" colSpan={2} />
                            </TableRow>
                        )
                        : (
                            <SortableRow
                                index={index}
                                rowIndex={index}
                                key={row.entity_id}
                                row={row}
                            />
                        )
                    ))}
            </TableBodySortable>
        );
    };

    const contentProps = {
        ...props,
        filters,
        setFilters,
        search,
        setSearch,
        fetchRows,
        setExpandedToolbar,
        expandedToolbar,
    };

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Header {...contentProps} />
                <div className={classes.mainTable}>
                    <Table size="small">
                        {renderTableHeader()}
                        {renderTableBody()}
                    </Table>
                </div>
            </TableContainer>
            <div style={{ height: 20 }} />
            <Confirmation
                {...props}
                open={windowDeleted.hasOwnProperty(primaryKey)}
                itemSelected={windowDeleted}
                setItem={setWindowDeleted}
            />
            <MainImageModal
                {...props}
                open={windowImage.hasOwnProperty(primaryKey)}
                itemSelected={windowImage}
                setItem={setwindowImage}
            />
        </>
    );
};

export default CustomTable;
