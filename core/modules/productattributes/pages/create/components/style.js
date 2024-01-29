import { makeStyles } from '@material-ui/core/styles';
import {
    TEXT_COLOR, GRAY_LIGHT,
} from '@theme_color';

const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        marginBottom: 18,
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
        color: colorPurple,
        display: 'inline-block',
    },
    titleSmall: {
        color: GRAY_LIGHT,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldButton: {
        padding: '0 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        paddingTop: 10,
        display: 'inline-block',
    },
    label: {
        color: TEXT_COLOR,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    content: {
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: TEXT_COLOR,
        borderRadius: 20,
        height: 36,
    },
    autocompleteRoot: {
        width: '100%',
        verticalAlign: 'middle',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 200,
        },
        '& .MuiOutlinedInput-root': {
            borderColor: TEXT_COLOR,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    table: {
        '& th': {
            padding: '0 15px',
            textAlign: 'left',
        },
        '& td': {
            padding: '8px 10px',
        },
    },
}));

export default useStyles;
