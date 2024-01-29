import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, GRAY_LIGHT, TEXT_COLOR, GRAY_TITLE, YELLOW_PALE, ORANGE_ICON, GREEN_PALE, GREEN_ICON, TABLE_GRAY, PURPLE_PALE,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    content: {
        borderBottom: '2px solid #F5F7FB',
        padding: '26px 29px 0px 22px',
    },
    contentWithoutBorder: {
        padding: '26px 29px 20px 22px',
    },
    topField: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    swicthDiv: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'end',
            marginBottom: 20,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '20% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldAction: {
        paddingBottom: 16,
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
    fieldRoot: {
        width: '100%',
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
    fieldInputMultiline: {
        border: '1px solid',
        borderColor: GRAY_TITLE,
        borderRadius: 12,
        '&.MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '&.MuiOutlinedInput-multiline': {
            padding: '9.5px 6px',
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
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
        '&.mb15': {
            marginBottom: 15,
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
    borderDiv: {
        border: `1px solid ${GRAY_TITLE}`,
        padding: 16,
        borderRadius: 8,
        '&.yellow': {
            border: '0',
            backgroundColor: YELLOW_PALE,
            color: TEXT_COLOR,
        },
    },
    sectionDiv: {
        display: 'flex',
        gap: 16,
    },
    sectionName: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontFamily: font,
        margin: 0,
    },
    sectionDesc: {
        fontSize: 14,
        color: GRAY_LIGHT,
        fontFamily: font,
        margin: 0,
        fontWeight: 'normal',
    },
    iconDiv: {
        borderRadius: '50%',
        height: 48,
        width: 48,
        display: 'grid',
        placeItems: 'center',
        '&.event': {
            backgroundColor: YELLOW_PALE,
            color: ORANGE_ICON,
        },
        '&.action': {
            backgroundColor: GREEN_PALE,
            color: GREEN_ICON,
        },
        '&.arrow': {
            border: `1px solid ${GRAY_TITLE}`,
            color: GRAY_LIGHT,
            height: 40,
            width: 40,
        },
        '&.file': {
            backgroundColor: PURPLE_PALE,
            color: PRIMARY,
        },
    },
    icon: {
        height: 34,
        width: 34,
    },
    arrowDiv: {
        marginTop: 50,
        display: 'grid',
        placeItems: 'center',
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
        position: 'relative',
        width: 'fit-content',
    },
    trash: {
        height: 16,
        width: 'auto',
        cursor: 'pointer',
    },
    addCondition: {
        '&.MuiIconButton-root': {
            paddingLeft: 0,
        },
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
    actionProp: {
        borderTop: '2px solid #F5F7FB',
        paddingTop: 24,
        marginTop: 24,
    },
    divFlexAction: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    helperCreate: {
        '&.MuiIconButton-root': {
            padding: 0,
        },
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
            '& .pencil': {
                color: PRIMARY,
            },
        },
        fontSize: 13,
        color: PRIMARY,
        '& .addIcon': {
            width: '0.8em',
            height: '0.8em',
        },
        '& .pencil': {
            color: GRAY_LIGHT,
        },
    },
    dialogContainer: {
        '& .MuiDialogTitle-root': {
            padding: 24,
            paddingBottom: 0,
        },
        '& .MuiDialogActions-root': {
            padding: 24,
        },
        '& .MuiDialog-paper': {
            borderRadius: 12,
        },
    },
    labelModalForm: {
        fontFamily: font,
        color: TEXT_COLOR,
        fontSize: 12,
        margin: 0,
        fontWeight: 'normal',
        position: 'relative',
        width: 'fit-content',
    },
    buttonFormContainer: {
        padding: '24px 0',
        display: 'flex',
        justifyContent: 'end',
        gap: 10,
    },
    iconBtn: {
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        color: TEXT_COLOR,
        '&:hover': {
            color: PRIMARY,
        },
        '&.MuiIconButton-root': {
            padding: 0,
        },
        transition: 'all .1s linear',
    },
    divider: {
        height: 10,
    },
}));

export default useStyles;
