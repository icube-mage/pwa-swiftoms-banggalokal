/* eslint-disable */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React from 'react';
import clsx from 'clsx';
import Switch from '@common_switch';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBodyAction from '@sellermodules/catalog/pages/list/components/Table/components/TableBodyAction';
import Show from '@common_show/index';
import Button from '@common_button/index';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { breakPointsUp } from '@helper_theme';
import { getComponentOrString } from '@sellermodules/order/pages/list/components/ListCard/helpers';
import { PRIMARY } from '@theme_color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const TableCellContent = ({ 
    row,column, onClickFieldName, setCheckedRows, setIsCheckedAllRows,
    publishConfirm, publishData, isCatalogFailed, showSingleRow = {}, t,
    isVariants, classes
}) => {
    const dataRow = row[column.field];
    const isFieldName = column.field === 'name';
    const isFieldStatus = column.field === 'status';
    const isFieldArray = Array.isArray(dataRow);
    let imageUrl = null;
    if (row?.images?.length > 0) {
        imageUrl = row?.images[0]?.url;
    }

    if (column.field === 'price') {
        if (dataRow?.length < 1) return '-';
        return (
            <div className="table-cell-content-item">
                {!isVariants ? (<>
                    {row['channel_price'] ?
                        row['channel_price']?.map((value, index) => {
                            let [channel] = row['channels'].filter((e) => e.code === value.channel_code) || [];
                            return channel?.logo && (
                                <div key={`table-cell-content-item-field-${index}`} className="table-cell-content-item-field">
                                    <img src={channel?.logo} alt="table cell content field" />
                                    <span>{value?.price_formatted}</span>
                                </div>
                            );
                        }) : row['price']
                    }
                </>) : row['price']}
            </div>
        );
    }

    if (isFieldStatus) {
        return (
            <Switch
                value={row.status === '1'}
                trueLabel=""
                falseLabel=""
                onChange={() => {
                    if (row.status !== '1') {
                        publishConfirm(true);
                        publishData.entity_id = [{ entity_id: row.entity_id, status: String(row.status === '1' ? '2' : '1') }];
                        publishData.action = () => {
                            setCheckedRows([]);
                            setIsCheckedAllRows(false);
                        };
                    }
                }}
                disabled={row.status === '1'}
            />
        );
    }

    if (isFieldArray) {
        if (dataRow?.length < 1) return '-';
        return (
            <div className="table-cell-content-item">
                {row[column.field] &&
                    row[column?.field]?.map((value, index) => {
                        const image = value?.logo ?? value?.image ?? null;
                        if (!image) return null;
                        return (
                            <div key={`table-cell-content-item-field-${index}`} className="table-cell-content-item-field">
                                <img src={image} alt="table cell content field" />
                                <span>{value.name}</span>
                            </div>
                        );
                    })}
            </div>
        );
    }

    if (isFieldName) {
        let isClick = onClickFieldName || false;
        return (
            <div className="table-item-container" style={isClick !== false ? {cursor: "pointer"} : {}} onClick={isClick !== false ? onClickFieldName : () => false }>
                {!isCatalogFailed && (imageUrl && imageUrl !== null ? (
                    <img
                        onError={(event) => (event.target.src = '/assets/img/swift-min.png')}
                        className="table-item-image"
                        src={imageUrl}
                        alt="icon product"
                        style={{ width: 60, height: 60 }}
                    />
                ) : (
                        <img src="/assets/img/swift-min.png" alt="icon product" style={{ width: 60, height: 60 }} />
                ))}
                <div style={{ display: "inline-block" }}>
                    <p style={{marginLeft: 10}}>
                        <span>{getComponentOrString(dataRow) || '-'} { onClickFieldName && (
                            <span className={classes.showVariant}>
                                { showSingleRow[row.entity_id] ?
                                    <>{t('hide_variant')} <FontAwesomeIcon style={{marginLeft: 5}} className="rct-icon rct-icon-expand-open" icon={faChevronUp}/></> :
                                    <>{t('show_variant')} <FontAwesomeIcon style={{marginLeft: 5}} className="rct-icon rct-icon-expand-open" icon={faChevronDown}/></>
                                }
                            </span>
                        )}</span>
                    </p>
                    <p style={{marginLeft: 10, fontSize: 11, marginTop: -8}}><strong>SKU:</strong> {row.vendor_sku || '-'}</p>
                </div>
            </div>
        );
    }

    return getComponentOrString(dataRow) || '-';
};

const TableBodyList = ({
    t,
    primaryKey,
    columns,
    classes,
    loading,
    rows,
    rowsPerPage,
    checkedRows,
    setCheckedRows,
    setIsCheckedAllRows,
    handleChecked,
    setDialogOpen,
    setProductSelected,
    handleUpdateStatus,
    isCatalogFailed,
    publishConfirm,
    publishData,
}) => {
    const [showSingleRow, setShowSingleRow] = React.useState({});
    const desktop = breakPointsUp('sm');
    const router = useRouter();

    const onClickFieldName = React.useCallback(
        (entity_id) => {
            setShowSingleRow({
                ...showSingleRow,
                [entity_id]: !showSingleRow[entity_id],
            });
        },
        [showSingleRow]
    );

    if (loading) {
        return (
            <TableBody>
                <TableRow style={{ height: 40 * rowsPerPage + 10 }}>
                    <TableCell colSpan={columns.length + 2} style={{ borderBottom: 0 }}>
                        <div className={classes.loading}>{t('storesetting:Loading')}</div>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (!rows?.length) {
        return (
            <TableBody>
                <TableRow style={{ height: 40 * rowsPerPage + 10 }}>
                    <TableCell colSpan={columns.length + 2} style={{ borderBottom: 0 }}>
                        <div className={classes.loading}>{t('common:No_records_to_display')}</div>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    const handleChangeCheckboxRow = (checked, row) => {
        const i = checkedRows.findIndex((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
        if (checked && i < 0) {
            if (checkedRows.length === rows.length - 1) {
                setIsCheckedAllRows(true);
            }
            setCheckedRows([...checkedRows, row]);
            handleChecked([...checkedRows, row]);
        } else {
            if (checkedRows.length !== rows.length - 1) {
                setIsCheckedAllRows(false);
            }
            setCheckedRows(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
            handleChecked(checkedRows.filter((checkedRow) => checkedRow[primaryKey] != row[primaryKey]));
        }
    };

    return (
        <TableBody className="table-body-list">
            {rows.map((row, rowIndex) => {
                const entity_id = row?.entity_id ?? null;
                const variants = row?.variants ?? [];
                const isVariants = variants?.length > 0;
                const isChecked = !!checkedRows.find((checkedRow) => checkedRow[primaryKey] === row[primaryKey]);
                let imageUrl = null;
                if (row?.images?.length > 0) {
                    imageUrl = row?.images[0]?.url;
                }
                const channels = row?.channels ?? [];
                return (
                    <>
                        {desktop && (
                            <TableRow key={rowIndex} className={classes.tableRow}>
                                <TableCell padding="checkbox" className={classes.alignMiddle}>
                                    <Show when={!isCatalogFailed}>
                                        <Checkbox
                                            className={classes.checkbox}
                                            checked={isChecked}
                                            disabled={!isChecked && row.disableCheck}
                                            onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                        />
                                    </Show>
                                </TableCell>
                                {columns.map((column, columnIndex) => (
                                    <TableCell key={columnIndex} className={clsx(column.hidden && 'hide', classes.alignMiddle, 'table-cell-item')}>
                                        <TableCellContent
                                            row={row}
                                            column={column}
                                            handleUpdateStatus={handleUpdateStatus}
                                            onClickFieldName={!isVariants ? false : () => onClickFieldName(entity_id)}
                                            setCheckedRows={setCheckedRows}
                                            setIsCheckedAllRows={setIsCheckedAllRows}
                                            publishConfirm={publishConfirm}
                                            publishData={publishData}
                                            isCatalogFailed={isCatalogFailed}
                                            showSingleRow={showSingleRow}
                                            isVariants={isVariants}
                                            classes={classes}
                                            t={t}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell className={clsx(classes.alignTop)} padding="checkbox">
                                    <TableBodyAction
                                        isCatalogFailed={isCatalogFailed}
                                        t={t}
                                        row={row}
                                        setDialogOpen={setDialogOpen}
                                        setProductSelected={setProductSelected}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        {/* DETAIL VARIANTS */}
                        {desktop && isVariants && showSingleRow[entity_id] && (
                            <TableRow className={classNames('table-body-list-item-detail', classes.tableBodyListItemDetail)} style={{background: "#fbfbff"}}>
                                <TableCell />
                                <TableCell className="item-detail-container" colSpan={5}>
                                    <Table className="item-detail-container-table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={2}>
                                                    <strong>{t('common:variant_name')}</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>{t('sellercatalog:Price')}</strong>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>{t('common:store')}</strong>
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {variants?.length > 0 &&
                                                variants?.map((value, index) => {
                                                    const channelsVariant = value?.channels;
                                                    const hasChannel = channelsVariant?.length > 0;
                                                    return (
                                                        <TableRow key={`item-detail-row-${index}`} className="item-detail-row">
                                                            <TableCell style={{width: 70}}>
                                                                <img
                                                                    src={value?.images?.[0]?.url}
                                                                    style={{width: 60, height: 60}}
                                                                    onError={(event) => (event.target.src = '/assets/img/swift-min.png')}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <p>{value.name}</p>
                                                                <p style={{fontSize: 11, marginTop: -5}}>SKU: <strong>{value.vendor_sku || '-'}</strong></p>
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    value?.channel_price?.map((_value, _index) => {
                                                                        let [channel] = value.channels.filter((e) => e.code === _value.channel_code) || [];
                                                                        return channel?.logo && (
                                                                            <div key={`item-detail-channel-${_index}`}>
                                                                                <img src={channel?.logo} style={{width: 20, height: 20}}/>                                                                                
                                                                                <span style={{position: 'relative', top: -2, marginLeft: 10}}>{_value.price_formatted ?? '-'}</span>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {!hasChannel && '-'}
                                                                {hasChannel &&
                                                                    channelsVariant?.map((channelValue, channelIndex) => (
                                                                        <div key={`item-detail-channel-${channelIndex}`}>
                                                                            <img src={channelValue?.logo} style={{width: 20, height: 20}}/>
                                                                            <span style={{position: 'relative', top: -2, marginLeft: 10}}>{channelValue?.name ?? '-'}</span>
                                                                        </div>
                                                                    ))}
                                                            </TableCell>
                                                            <TableCell />
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        )}
                        {/* DETAIL VARIANTS */}

                        {/* MOBILE VIEW */}
                        {!desktop && (
                            <TableRow>
                                <TableCell>
                                    <div className="table-cell-mobile-container" style={{ position: 'relative' }}>
                                        <div className="table-cell-mobile-header" />
                                        <div className="table-cell-mobile-content">
                                            <div className="table-cell-mobile-left">
                                                <Show when={!isCatalogFailed}>
                                                    <Checkbox
                                                        className={classes.checkbox}
                                                        checked={isChecked}
                                                        disabled={!isChecked && row.disableCheck}
                                                        onChange={(e) => handleChangeCheckboxRow(e.target.checked, row)}
                                                    />
                                                </Show>
                                            </div>
                                            <div className="table-cell-mobile-right">
                                                <div className="table-cell-mobile-product">
                                                    <div className="table-cell-mobile-right-product-info">
                                                        <Show when={!isCatalogFailed}>
                                                            {imageUrl && imageUrl !== null ? (
                                                                <img
                                                                    onError={(event) => (event.target.src = '/assets/img/swift-min.png')}
                                                                    src={imageUrl}
                                                                    alt="icon product"
                                                                    style={{ width: 60, height: 60 }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="/assets/img/swift-min.png"
                                                                    alt="icon product"
                                                                    style={{ width: 60, height: 60 }}
                                                                />
                                                            )}
                                                        </Show>
                                                        {!isCatalogFailed && <span>{row?.name}</span>}
                                                        {isCatalogFailed && (
                                                            <p style={{ marginLeft: -10 }}>
                                                                <strong>{row?.name}</strong>
                                                                <br />
                                                                <span style={{ marginLeft: 0, color: '#979797', position: 'relative', top: 3 }}>
                                                                    {row?.sku}
                                                                </span>
                                                                <br />
                                                                <p style={{ marginTop: 10, marginLeft: -10 }}>{row.status_sync()}</p>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className={clsx('table-cell-mobile-right-product-channel', { show: channels?.length > 0 })}>
                                                        {channels?.length > 0 &&
                                                            channels.map((channelItem, channelIndex) => (
                                                                <div className="channel-mobile-item" key={`channel-mobile-item-${channelIndex}`}>
                                                                    <img src={channelItem?.logo} alt="icon logo channel mobile" />
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                                <div className="table-cell-mobile-right-product-action">
                                                    <div className="table-cell-product-action-button-left">
                                                        <Show when={!isCatalogFailed}>
                                                            <Button
                                                                width="100%"
                                                                verticalCenter
                                                                classic
                                                                classicButtonLabel={t('sellercatalog:Edit_Product')}
                                                                classicButtonOnClick={() => {
                                                                    router.push({
                                                                        pathname: '/seller/catalog/product/edit/[id]',
                                                                        query: { id: row.entity_id },
                                                                    });
                                                                }}
                                                            />
                                                        </Show>
                                                    </div>
                                                    <div
                                                        className="table-cell-product-action-button-right"
                                                        style={isCatalogFailed ? { position: 'absolute', top: 40, right: 10 } : {}}
                                                    >
                                                        <TableBodyAction
                                                            isCatalogFailed={isCatalogFailed}
                                                            t={t}
                                                            row={row}
                                                            setDialogOpen={setDialogOpen}
                                                            setProductSelected={setProductSelected}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="table-cell-mobile-right-product-variant">
                                                    {variants?.length > 0 && (
                                                        <div className="button-read-more">
                                                            <Button
                                                                bg="transparent"
                                                                color={PRIMARY}
                                                                verticalCenter
                                                                horizontalCenter
                                                                classic
                                                                classicButtonIconRight={
                                                                    <img src="/assets/img/icon_chevron_down_purple.svg" alt="icon chevron down" />
                                                                }
                                                                classicButtonLabel={!showSingleRow[row.entity_id] ? t('show_variant') : t('hide_variant')}
                                                                classicButtonOnClick={!isVariants ? false : () => onClickFieldName(entity_id)}
                                                            />
                                                        </div>
                                                    )}
                                                    {!desktop && isVariants && showSingleRow[entity_id] && (
                                                        <div className="variant-list">
                                                            {variants.map((variantItem, variantIndex) => (
                                                                <div className="variant-list-item" key={`variant-list-item-${variantIndex}`}>
                                                                    <div className="variant-list-item-product">
                                                                        <strong>{variantItem?.name}</strong>
                                                                        {`(${variantItem.sku})`}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </>
                );
            })}
        </TableBody>
    );
};

export default TableBodyList;
