import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        paddingBottom: 20,
        boxShadow: 'none',
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
    },
    topPage: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderColor,
            border: 0,
            height: 1,
        },
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
        fontFamily: font,
        display: 'inline-block',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '16px 0 30px 0px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10,
            paddingLeft: 0,
        },
        paddingRight: 30,
        paddingTop: 10,
        textAlign: 'right',
    },
    label: {
        color: colorText,
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
            color: colorPurple,
            fontSize: 20,
        },
    },
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    fieldRootNote: {
        border: '1px solid',
        borderRadius: '20px !important',
        '&.disabled': {
            borderColor,
        },
    },
    selectControl: {
        margin: '8px 0px',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
        position: 'relative',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
        paddingRight: 10,
        '& .MuiSvgIcon-root': {
            color: colorPurple,
        },
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
    },

    //
    gridAttribute: {
        display: 'grid',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        marginBottom: 15,
    },
    accordion: {
        '&.Mui-expanded': {
            '& h5': {
                fontWeight: 800,
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
        },
    },
    accordionDetailRoot: {
        display: 'block !important',
    },
    imgGroup: {
        margin: 10,
        padding: '10px 0',
        textAlign: 'center',
    },
    imgContainer: {
        position: 'relative',
        border: '1px solid',
        borderColor,
        padding: 0,
        width: 210,
        height: 210,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        cursor: 'pointer',
    },
    img: {
        width: 200,
        height: 'fit-content',
        cursor: 'pointer',
    },
    trashIcon: {
        position: 'absolute',
        height: 25,
        width: 'auto',
        cursor: 'pointer',
        right: '5%',
        bottom: '5%',
    },
    typeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10,
        paddingRight: '10%',
        width: 200,
    },
    labelType: {
        backgroundColor: borderColor,
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 10,
        padding: '5px 10px',
        width: 'fit-content',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    asterisk: {
        color: colorPurple,
        fontSize: 20,
    },
    errorHtml: {
        backgroundColor: '#F9E5E4',
        color: '#B30100',
        padding: '15px 10px',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        '& a': {
            color: '#408AC0',
        },
    },
    fieldInputMultiple: {
        border: '1px solid',
        borderColor,
    },
    fieldInputSquare: {
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    required: {
        color: colorPurple,
    },
    optionTop: {
        alignItems: 'center',
        marginBottom: 20,
    },
    optionButton: {
        textAlign: 'right',
        marginTop: 10,
    },
    optionContainer: {
        borderBottom: '1px solid #C4C4C4',
        padding: 10,
        paddingBottom: 0,
        marginBottom: 10,
    },
    gridOption: {
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        marginBottom: 15,
    },
    gridTextOption: {
        display: 'grid',
        gridTemplateColumns: '90% 10%',
    },
    gridTableOption: {
        display: 'grid',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '0% 100%',
        },
        marginBottom: 15,
    },
    dialogConfig: {
        '& .MuiDialog-paperFullWidth': {
            height: '100%',
        },
        '& .MuiTypography-h6': {
            color: colorPurple,
            fontWeight: 'bold',
        },
    },
    dialogFull: {
        '& .MuiDialog-paperFullWidth': {
            height: '100%',
        },
        '& .MuiTypography-h6': {
            color: colorPurple,
            fontWeight: 'bold',
            fontSize: 24,
        },
        '& .MuiDialogContent-root': {
            padding: '0 24px',
        },
    },
}));

export default useStyles;
