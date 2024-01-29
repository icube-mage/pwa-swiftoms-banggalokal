import { makeStyles } from '@material-ui/core/styles';

const colorText = '#536777';
const colorPurple = '#BE1F93';
const colorTextGrey = '#536777';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        padding: '16px 24px',
        top: 0,
        right: 0,
    },
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            width: 800,
            [theme.breakpoints.down('xs')]: {
                minWidth: 300,
            },
            height: 400,
        },
        '& .MuiTypography-h6': {
            color: colorPurple,
            fontWeight: 600,
        },
    },
    btn: {
        borderRadius: 20,
    },
    titleSection: {
        padding: '10px 0',
        color: colorTextGrey,
        marginTop: 0,
        paddingTop: 0,
    },
    formFieldButton: {
        padding: '0 24px 10px 24px',
        textAlign: 'right',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '25% 75%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    divLabel: {
        display: 'block',
    },
    label: {
        color: colorText,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            bottom: -5,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    autocompleteRoot: {
        width: '40%',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
        '&.yesNo': {
            width: '20%',
        },
    },
    circular: {
        marginTop: '5%',
        '& .MuiCircularProgress-colorPrimary': {
            color: colorPurple,
        },
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
