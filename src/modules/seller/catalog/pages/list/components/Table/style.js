/* eslint-disable */
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR, WHITE, GRAY_BG, GRAY_BG_2, BORDER_COLOR, BLACK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableParentContainer: {},
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '20px 20px 20px 30px',
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            '&.nopad': {
                padding: 0,
            },
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            '& .top-item': {
                marginRight: '12px',
                [theme.breakpoints.down('xs')]: {
                    marginTop: 20,
                },
                [theme.breakpoints.down('xs')]: {
                    marginTop: 0,
                    marginRight: 0,
                    width: '100%',
                },
                '& [class*="MuiInputBase-adornedStart"]': {
                    backgroundColor: WHITE,
                    border: `1px solid ${ BORDER_COLOR}`,
                },
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            flexWrap: 'wrap',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'left',
                marginTop: 15,
                justifyContent: 'space-between',
            },
            '& .datepicker-container': {
                flex: 1,
                border: `1px solid ${BORDER_COLOR}`,
                marginLeft: 10,
                [theme.breakpoints.down('sm')]: {
                    marginLeft: 0,
                    marginTop: 15,
                    marginBottom: 15,
                },
            },
        },
        '& .top-item': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                '& .MuiPickersDateRangePickerInput-root': {
                    alignItems: 'inherit',
                },
            },
            '& .MuiButton-text': {
                border: '1px solid',
                color: FONT_COLOR,
                textTransform: 'capitalize',
            },
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    mainTable: {
        overflow: 'auto',
        background: WHITE,
        [theme.breakpoints.down('sm')]: {
            background: 'transparent',
            overflow: 'unset',
        },
        '&::-webkit-scrollbar': {
            height: '.6em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        '& .MuiList-padding': {
            padding: 0,
        },
        '& .table-cell-content-item': {
            '& .table-cell-content-item-field': {
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                '& img': {
                    width: 20,
                },
                '& span': {
                    marginTop: 5,
                    marginLeft: 10,
                },
            },
        },
        '& .table-body-list': {
            '& .table-cell-item': {
                '& .table-item-container': {
                    display: 'flex',
                    alignItems: 'center',
                },
            },
            [theme.breakpoints.down('sm')]: {
                '& tr': {
                    [theme.breakpoints.down('sm')]: {
                    },
                    '& td': {
                        border: 0,
                        padding: 10,
                        '& .table-cell-mobile-container': {
                            backgroundColor: WHITE,
                            border: `1px solid ${ BORDER_COLOR}`,
                            borderRadius: 5,
                            paddingTop: 20,
                            paddingBottom: 15,
                            '& .table-cell-mobile-header': {
                                display: 'flex',
                                justifyContent: 'end',
                                marginBottom: 5,
                                '& .MuiIconButton-root': {
                                    padding: '2px 10px',
                                },
                            },
                            '& .table-cell-mobile-content': {
                                display: 'grid',
                                gridTemplateColumns: '10% 90%',
                                '& .table-cell-mobile-left': {
                                    '& .MuiCheckbox-root': {
                                        marginLeft: 0,
                                    },
                                },
                                '& .table-cell-mobile-right': {
                                    marginLeft: 5,
                                    '& .table-cell-mobile-product': {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        '& .table-cell-mobile-right-product-info': {
                                            display: 'flex',
                                            alignItems: 'center',
                                            '& img': {
                                                border: `1px solid ${ BORDER_COLOR}`,
                                                borderRadius: 5,
                                            },
                                            '& span': {
                                                marginLeft: 8,
                                            },
                                        },
                                        '& .table-cell-mobile-right-product-channel': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            '&.show': {
                                                borderLeft: `1px solid ${ BORDER_COLOR}`,
                                                paddingLeft: 20,
                                                paddingRight: 10,
                                            },
                                            '& .channel-mobile-item': {
                                                '& img': {
                                                    backgroundColor: WHITE,
                                                    height: 30,
                                                    border: `1px solid ${ BORDER_COLOR}`,
                                                    padding: 5,
                                                    borderRadius: 50,
                                                    marginLeft: -10,
                                                },
                                            },
                                        },
                                        // end
                                    },
                                    '& .table-cell-mobile-right-product-action': {
                                        display: 'grid',
                                        gridTemplateColumns: '85% 15%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 20,
                                        '& .table-cell-product-action-button-left': {

                                        },
                                        '& .table-cell-product-action-button-right': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            '& button': {
                                                padding: '0px 5px',
                                                marginTop: '-5px',
                                                '& span': {
                                                    '& svg': {
                                                        height: 25,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    '& .table-cell-mobile-right-product-variant': {
                                        '& .button-read-more': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            borderTop: `1px solid ${ BORDER_COLOR}`,
                                            marginTop: 15,
                                            '& button': {
                                                marginTop: 5,
                                                '& img': {
                                                    marginLeft: 5,
                                                },
                                            },
                                        },
                                        '& .variant-list': {
                                            marginTop: 5,
                                            '& .variant-list-item': {
                                                marginBottom: 5,
                                                '& .variant-list-item-product': {
                                                    fontSize: 12,
                                                },
                                            },
                                        },
                                    },
                                    // end
                                },
                            },
                            // end
                        },
                        // end
                    },
                },
            },
        },
    },
    paperHead: {
        boxShadow: 'none',
        padding: '10px 25px',
        backgroundColor: GRAY_BG_2,
        borderRadius: 0,
        [theme.breakpoints.down('xs')]: {
            padding: 20,
        },
    },
    tableContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 0,
        boxShadow: '0px 3px 15px #4D2F821A',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '& .catalog-header-tab': {
            backgroundColor: 'transparent',
            paddingTop: 20,
            '& ul': {
                margin: 0,
                listStyleType: 'none',
                '& li': {
                    float: 'left',
                },
            },
            '& .clear': {
                clear: 'both',
            },
        },
        '&.footer': {
            paddingTop: 10,
            '& .MuiTable-root': {
                [theme.breakpoints.down('xs')]: {
                    border: `1px solid ${ BORDER_COLOR}`,
                    borderRadius: 5,
                    borderCollapse: 'separate !important',
                    background: WHITE,
                },
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: 80,
                padding: 10,
                boxShadow: '0px 0px 0px 0px',
            },
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    tablePagination: {
        marginTop: 10,
        borderBottom: 0,
        '& .MuiTablePagination-spacer': {
            display: 'none',
        },
        '& .MuiTablePagination-caption': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTablePagination-select': {
            color: PRIMARY_DARK,
            fontWeight: 600,
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 5,
            marginLeft: 10,
            paddingLeft: 15,
            paddingRight: 30,
        },
        '& .MuiTablePagination-toolbar': {
            display: 'grid',
            gridTemplateColumns: '0fr 0fr 1fr 0fr',
            paddingTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 15,
            [theme.breakpoints.up('xl')]: {
                gridTemplateColumns: '0fr 0fr 3fr 7fr',
            },
            [theme.breakpoints.down('md')]: {
                gridTemplateColumns: '0fr 0fr 1fr 6fr',
            },
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: '0fr 0fr 0fr 6fr',
            },
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '1fr 1fr',
            },
            '& .MuiTablePagination-selectRoot': {
                marginRight: 10,
                [theme.breakpoints.down('xs')]: {
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 20,
                },
                '& .MuiSelect-selectMenu': {
                    marginLeft: 0,
                },
            },
            '& [class*="makeStyles-paginationRoot"]': {
                [theme.breakpoints.down('xs')]: {
                    justifyContent: 'end',
                },
                '& .button-pagination-prev': {

                },
                '& [class*="makeStyles-paginationAction"]': {
                    '& ul': {
                        flexWrap: 'inherit',
                        '& li': {
                            '& [class*="Mui-selected"]': {
                                border: `1px solid ${ BORDER_COLOR}`,
                                color: BLACK,
                            },
                        },
                    },
                },
                '& .button-pagination-next': {
                    '& img': {
                        marginRight: 0,
                    },
                },
            },
        },

    },
    alignTop: {
        verticalAlign: 'top',
    },
    alignMiddle: {
        verticalAlign: 'middle',
    },
    tableHead: {
        '& .MuiButton-label': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTableCell-head': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    tableRow: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            paddingTop: 15,
            paddingBottom: 10,
            fontSize: 14,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        marginLeft: 20,
    },
    header: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '30px 0 0 30px',
        '&.nopad': {
            padding: 0,
        },
    },
    textInput: {
        width: 300,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '&.full': {
                width: '100%',
            },
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: TABLE_GRAY,
            borderRadius: 6,
            padding: '3px 10px',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    iconImg: {
        padding: '0 5px 0 10px',
    },
    btnFilter: {
        borderRadius: 4,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        padding: '12px 15px',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 15px',
            fontSize: 12,
        },
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:active': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            backgroundColor: WHITE,
            borderColor: BORDER_COLOR,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: WHITE,
                boxShadow: 'none',
                borderColor: BORDER_COLOR,
            },
        },
    },
    sortButon: {
        marginLeft: -16,
        textAlign: 'left',
        '& .MuiButton-endIcon': {
            marginLeft: 0,
        },
    },
    menuAction: {
        background: 'red',
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
            display: 'grid',
        },
        '& .MuiListItem-button:hover': {
            background: TABLE_GRAY,
        },
        '& .MuiMenu-paper': {
            marginTop: 5,
        },
    },
    menuItem: {
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${TABLE_GRAY} !important`,
        borderRadius: 6,
        margin: '6px 16px',
        padding: 0,
    },
    menuSingle: {
        '& label': {
            margin: 0,
        },
        '& .MuiCheckbox-root': {
            display: 'none',
        },
    },
    btnAdd: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        color: BLACK,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.white': {
            background: WHITE,
        },
        '&.border': {
            border: `1px solid ${ BORDER_COLOR}`,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
        '&.Mui-disabled': {
            border: 0,
        },
    },
    Filter: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: TEXT_COLOR,
        },
        '& .MuiCheckbox-root': {
            color: TEXT_COLOR,
            borderRadius: 4,
            padding: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '&.MuiFormControlLabel-root': {
            minWidth: '100%',
            marginBottom: 0,
            height: 25,
        },
    },
    massAction: {
        color: PRIMARY_DARK,
        fontSize: 14,
        fontWeight: 600,
        marginTop: 10,
        paddingLeft: 30,
        paddingBottom: 10,
        background: 'transparent',
        '& .MuiGrid-item': {
            alignItems: 'center',
            display: 'flex',
        },
        '& .MuiIconButton-root': {
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
    },
    deactiveBtn: {
        backgroundColor: 'white',
        color: PRIMARY_DARK,
        fontSize: 11,
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        boxShadow: 'none',
        padding: '4px 10px',
        marginRight: 10,
        '&:hover': {
            borderColor: GRAY_LIGHT,
            backgroundColor: 'white',
            boxShadow: 'none',
        },
    },

    expandContainer: {
        '&.expand': {
            backgroundColor: GRAY_BG_2,
        },
        padding: 20,
        paddingTop: 0,
        '& .filter-item': {
            border: `1px solid ${GRAY_LIGHT}`,
            background: 'white',
            fontSize: 13,
            padding: '5px 10px',
            minHeight: 26,
            borderRadius: 4,
            margin: 10,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 87,
            alignItems: 'center',
        },
    },
    expandGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 11fr',
        alignItems: 'baseline',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginTop: 10,
        },
    },
    btnFilterText: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
        marginRight: 30,
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: 'transparent',
        },
        '& .MuiButton-label': {
            fontSize: 13,
            color: PRIMARY,
            fontWeight: 'bold',
        },
        [theme.breakpoints.down('xs')]: {
            width: 100,
        },
    },
    closeButton: {
        height: 16,
        width: 16,
        backgroundColor: GRAY_LIGHT,
        padding: 0,
        marginLeft: 15,
        '&:hover': {
            backgroundColor: GRAY_LIGHT,
        },
    },
    closeIcon: {
        height: 12,
        width: 12,
        color: 'white',
    },
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            minWidth: 500,
            [theme.breakpoints.down('xs')]: {
                minWidth: 300,
            },
        },
        '& h2': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        padding: '16px 24px',
        top: 0,
        right: 0,
    },
    contentDialogScroll: {
        maxHeight: 200,
        overflowY: 'auto',
        marginBottom: 20,
        padding: '5px 0',
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 8,
        '&.minimal': {
            border: 0,
            textAlign: 'center',
        },
        '& .span-name': {
            display: 'block',
            padding: '2px 10px',
        },
        '& .span-name-min': {
            display: 'inline-block',
            color: PRIMARY,
            fontWeight: 700,
            padding: '0 2px',
        },
    },
    contentDialog: {
        textAlign: 'center',
        paddingBottom: 20,
    },
    contentDialogForm: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 70%',
        paddingBottom: 30,
        '& span': {
            color: PRIMARY_DARK,
        },
    },
    autocompleteRoot: {
        background: GRAY_BG,
        borderRadius: 6,
        padding: 5,
        '& input': {
            fontSize: 12,
        },
        '& fieldset': {
            border: 0,
        },
    },
    tableBodyListItemDetail: {
        '& .item-detail-container-table': {
            '& tbody': {
                '& .item-detail-row': {
                    '&:last-child': {
                        '& .MuiTableCell-root': {
                            border: 0,
                        },
                    },
                },
            },
        },
    },
    tableHeaderMobile: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        marginBottom: 10,
        '& .header-mobile-left': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& [class*="MuiCheckbox-root"]': {
                padding: 0,
                marginLeft: 11,
            },
            '& .checkbox-label': {
                marginLeft: 10,
                fontWeight: 700,
            },
        },
        '& .header-mobile-right': {
            paddingRight: 11,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'flex-end',
        },
    },
    filterPopper: {
        backgroundColor: 'white',
        padding: 5,
        border: '1px solid #D2D9DF',
        borderRadius: 6,
        maxWidth: '100%',
        '& .filter-container': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            overflow: 'scroll',
        },
    },
    dialogChannelRoot: {
        '& .MuiDialogContent-root:first-child': {
            padding: 10,
        },
    },
    flexChannel: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 13,
    },
    imgChannelContainer: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        padding: 3,
        justifyContent: 'center',
        borderRadius: '50%',
    },
    imgChannel: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 12,
        width: 12,
    },
    checkboxOptionFilter: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: 'white',
        },
        '& .MuiCheckbox-root': {
            color: 'white',
            borderRadius: 4,
            padding: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '&.MuiFormControlLabel-root': {
            minWidth: '100%',
            marginBottom: 0,
            height: 25,
        },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        border: `1px solid ${BORDER_COLOR}`,
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        border: 'none',
        backgroundColor: PRIMARY,
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
                + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
                + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: PRIMARY,
        },
    },
    expandContainer: {
        marginTop: 10,
        '& .filter-item': {
            border: `1px solid ${BORDER_COLOR}`,
            color: BLACK,
            backgroundColor: WHITE,
            fontSize: 13,
            padding: '5px 10px',
            minHeight: 26,
            borderRadius: 4,
            margin: 10,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 87,
            alignItems: 'center',
        },
    },
    expandGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 11fr',
        alignItems: 'baseline',
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
    },
    filterPopper: {
        backgroundColor: 'white',
        padding: 20,
        border: '1px solid #D2D9DF',
        borderRadius: 6,
        maxWidth: '100%',
        '& .filter-container': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            overflow: 'scroll',
        },
    },
    checkboxOption: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: 'white',
        },
        '& .MuiCheckbox-root': {
            color: 'white',
            borderRadius: 4,
            padding: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '&.MuiFormControlLabel-root': {
            minWidth: '100%',
            marginBottom: 0,
            height: 25,
        },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        border: `1px solid ${BORDER_COLOR}`,
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        border: 'none',
        backgroundColor: PRIMARY,
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
                + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
                + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: PRIMARY,
        },
    },
    showVariant: {
        position: 'relative',
        top: 0,
        padding: 4,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 10,
        fontSize: 10,
        background: '#F3F4FA',
        color: '#BE1F93',
        display: 'inline-block',
    },
}));

export default useStyles;
