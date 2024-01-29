import { makeStyles } from '@material-ui/core/styles';
import { GRAY_TITLE, PRIMARY, TEXT_COLOR } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '20px 29px 20px 22px',
        '&.border': {
            borderBottom: '2px solid #F5F7FB',
            padding: '20px 29px 10px 22px',
        },
    },
    borderContainer: {
        border: `1px solid ${GRAY_TITLE}`,
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        position: 'relative',
    },
    accordion: {
        border: `1px solid ${GRAY_TITLE}`,
        borderRadius: 8,
        position: 'relative',
        marginBottom: 5,
        '& pre': {
            whiteSpace: 'break-spaces',
            color: TEXT_COLOR,
            fontFamily: font,
        },
        '& section': {
            width: '99% !important',
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '12px 0',
        },
        '& .MuiAccordionSummary-root.Mui-expanded': {
            height: 40,
            minHeight: 40,
            borderBottom: `1px solid ${GRAY_TITLE}`,
            fontWeight: 600,
        },
        '& .MuiAccordionSummary-root': {
            height: 40,
            minHeight: 40,
        },
        '& .expand-icon': {
            color: TEXT_COLOR,
        },
    },
    button: {
        borderRadius: 20,
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        '& .btn': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            '& button': {
                [theme.breakpoints.down('sm')]: {
                    marginTop: 10,
                },
            },
        },
        '& .field': {
            '& .text': {
                textAlign: 'end',
                color: TEXT_COLOR,
                fontFamily: font,
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'start',
                },
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: 20,
            },
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            gap: 10,
            display: 'flex',
            alignItems: 'center',
        },
        '& .textfield': {
            gap: 10,
            display: 'flex',
            alignItems: 'center',
        },
    },
    fieldRoot: {
        width: '40%',
        minWidth: 180,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
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
    },
    divider: {
        height: 20,
    },
    copyIcon: {
        color: PRIMARY,
        position: 'absolute',
        right: 10,
        padding: 0,
        '& copy-icon': {
            width: 20,
            height: 20,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        [theme.breakpoints.down('xs')]: {
            gap: 20,
            justifyContent: 'space-between',
        },
    },
    label: {
        color: TEXT_COLOR,
        fontFamily: font,
        position: 'relative',
    },
    sectionTitle: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontFamily: font,
        margin: 0,
        marginBottom: 20,
    },
    tooltip: {
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        '&.MuiIconButton-root': {
            padding: 0,
            color: TEXT_COLOR,
        },
    },
}));

export default useStyles;
