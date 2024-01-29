import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles(() => ({
    controlLabel: {
        paddingLeft: 20,
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            fontWeight: 'bold',
            paddingLeft: 5,
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            color: PRIMARY_DARK,
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
    },
    checkbox: {
        height: 20,
        width: 20,
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            height: 20,
            width: 20,
        },
    },
    tableContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 8,
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
        marginTop: 20,
        backgroundColor: 'white',
        boxShadow: '0px 3px 15px #4D2F821A !important',
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            height: 45,
        },
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        textAlign: 'left',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        padding: '10px 10px',
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        '&.small': {
            width: 110,
        },
    },
}));

export default useStyles;
