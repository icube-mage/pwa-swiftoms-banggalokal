import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TEXT_COLOR, GRAY_TITLE, TABLE_GRAY, GRAY_LIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        padding: '16px 0',
        borderRadius: 16,
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
    formFieldButton: {
        padding: '5px 5px 13px 22px',
        gap: 10,
        display: 'flex',
    },
    btn: {
        borderRadius: 20,
    },
    tabs: {
        '& .MuiTab-root': {
            width: 'fit-content',
            backgroundColor: 'white',
            borderRadius: '8px 8px 0 0',
            marginRight: '1%',
            marginLeft: 0,
        },
    },
    titleSmall: {
        fontFamily: font,
        color: GRAY_TITLE,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 10,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    divLabel: {
        display: 'block',
        '&.top': {
            alignSelf: 'flex-start',
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
        borderBottom: '2px solid #F5F7FB',
        padding: '10px 29px 20px 22px',
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: GRAY_TITLE,
        borderRadius: 20,
        height: 36,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '& .MuiOutlinedInput-input': {
            padding: '17.5px 14px',
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        },
        '& .MuiInputBase-input.Mui-disabled': {
            cursor: 'not-allowed',
        },
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
    helper: {
        fontSize: '0.75rem',
        marginLeft: 10,
        marginTop: 5,
    },
}));

export default useStyles;
