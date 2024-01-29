import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, GRAY_BG, TEXT_COLOR, GRAY_TITLE, GRAY_LIGHT, TABLE_GRAY,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: PRIMARY,
        fontFamily: font,
        display: 'inline-block',
    },
    titleSmall: {
        fontFamily: font,
        color: TEXT_COLOR,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 65%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldButton: {
        padding: '0px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
        padding: '5px 30px',
    },
    buttonDivTable: {
        marginTop: 20,
    },
    btnTable: {
        borderRadius: 20,
        padding: '3px 30px',
    },
    divLabel: {
        display: 'block',
        width: '95%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    label: {
        color: TEXT_COLOR,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: PRIMARY,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '25px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
    },
    fieldRoot: {
        width: '100%',
        minWidth: 165,
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: GRAY_TITLE,
        borderRadius: 36,
        height: 36,
        '&.MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        },
        backgroundColor: 'white',
    },
    autocompleteRoot: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderColor: GRAY_TITLE,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        '& .MuiChip-root': {
            backgroundColor: TABLE_GRAY,
            border: `1px solid ${GRAY_LIGHT}`,
            height: 22,
        },
        '& .MuiChip-deleteIcon': {
            fill: '#6B779C',
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        },
    },
    imgBack: {
        width: 142,
        height: 142,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: 10,
        backgroundColor: GRAY_BG,
        '&.white': {
            backgroundColor: 'white',
        },
    },
    helperLogo: {
        color: TEXT_COLOR,
        margin: 0,
        fontSize: 13,
        '& .primary': {
            color: PRIMARY,
        },
    },
    divider: {
        height: 10,
    },
    tableContainer: {
        borderRadius: 6,
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
        '& .MuiSvgIcon-root': {
            color: PRIMARY,
        },
        overflowY: 'hidden',
    },
    table: {
        '& .first': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 40,
            },
        },
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            backgroundColor: TABLE_GRAY,
            height: 45,
        },
        padding: '0 20px',
        borderColor: GRAY_LIGHT,
    },
    th: {
        color: TEXT_COLOR,
        padding: '10px 10px',
        borderColor: GRAY_LIGHT,
        position: 'relative',
    },
    required: {
        '&::after': {
            content: "'*'",
            position: 'absolute',
            color: PRIMARY,
            fontSize: 20,
        },
    },
    rowItem: {
        backgroundColor: TABLE_GRAY,
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        fontFamily: font,
        fontSize: 13,
        '&.noborder': {
            borderBottom: '0px',
        },
    },
    deleteDisabled: {
        '& .MuiSvgIcon-root': {
            color: TEXT_COLOR,
        },
        '&.MuiButtonBase-root.Mui-disabled': {
            pointerEvents: 'unset',
            cursor: 'not-allowed',
        },
    },
}));

export default useStyles;
