/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
export const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};

export const useColumns = (initialColumns) => {
    const _initialColumns = initialColumns.map((column) => ({
        ...column,
        hidden: column.hidden ? column.hidden : false,
    }));
    const [columns, setColumns] = React.useState(_initialColumns);
    const [hiddenColumns, setHiddenColumns] = React.useState(_initialColumns);

    const setHiddenColumn = (field, hidden) => {
        setHiddenColumns(
            hiddenColumns.map((column) => ({
                ...column,
                hidden: field == column.field ? hidden : column.hidden,
            })),
        );
    };

    const applyHiddenColumns = () => {
        setColumns(
            columns.map((column, i) => ({
                ...column,
                hidden: hiddenColumns[i].hidden,
            })),
        );
    };

    const applyHiddenColumnsMobile = () => {
        const mobileHiddenColumns = columns.map((column) => ({ ...column, hidden: column.hiddenMobile || column.hidden || false }));
        setHiddenColumns(mobileHiddenColumns);
        setColumns(mobileHiddenColumns);
    };

    const applyHiddenColumnsDesktop = () => {
        const desktopiddenColumns = _initialColumns.map((column) => ({ ...column, hidden: column.hidden || false }));
        setHiddenColumns(desktopiddenColumns);
        setColumns(desktopiddenColumns);
    };

    const resetHiddenColumn = () => {
        const resetedHiddenColumns = columns.map((column) => ({ ...column, hidden: false }));
        setHiddenColumns(resetedHiddenColumns);
        setColumns(resetedHiddenColumns);
    };

    return {
        columns,
        hiddenColumns,
        setHiddenColumn,
        applyHiddenColumns,
        applyHiddenColumnsDesktop,
        applyHiddenColumnsMobile,
        resetHiddenColumn,
    };
};

export default { useColumns, getComponentOrString };
