import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TEXT_COLOR, GRAY_TITLE, TABLE_GRAY, GRAY_LIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    sectionHead: {
        padding: '13px 29px 0px 22px',
    },
    sectionTitle: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontFamily: font,
        margin: 0,
    },
    titleSmall: {
        fontFamily: font,
        color: GRAY_TITLE,
        fontSize: 12,
        margin: 0,
        marginBottom: 8,
        fontWeight: 'normal',
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
        alignItems: 'baseline',
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
        gap: 10,
        display: 'flex',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
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
        padding: '26px 29px 0px 22px',
    },
    fieldRoot: {
        width: '90%',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
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
        width: '90%',
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
    warning: {
        backgroundColor: '#FFF5EA',
        width: '100%',
        padding: 12,
        color: '#1D2939',
        fontSize: 12,
        border: '1px solid #E1B878',
        borderRadius: 5,
        marginBottom: 70,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
    },
    conditionDiv: {
        border: `1px solid ${GRAY_TITLE}`,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    topCondition: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleCondition: {
        fontFamily: font,
        color: GRAY_TITLE,
        fontSize: 12,
        margin: 0,
        fontWeight: 'normal',
    },
    trash: {
        height: 16,
        width: 'auto',
        cursor: 'pointer',
    },
    addCondition: {
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        fontSize: 14,
        color: PRIMARY,
        fontWeight: 'bold',
    },
    deleteCondition: {
        padding: 0,
    },
}));

export default useStyles;
