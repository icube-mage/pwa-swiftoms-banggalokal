import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, WHITE, GRAY_LIGHT, PRIMARY_SOFT,
    TABLE_GRAY, TEXT_COLOR, PRIMARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '626px',
        display: 'flex',
        gap: 20,
    },
    emptyText: {
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4D2F82',
    },
    userContainer: {
        width: '338px',
        height: 'max-content',
        boxShadow: '0px 3px 15px #4D2F821A',
        borderRadius: '8px',
        background: '#FFF',
        padding: '20px 15px 5px 15px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        [theme.breakpoints.up('md')]: {
            maxHeight: '70vmin',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 20,
        },
    },
    formUserSearch: {
        marginBottom: '20px',
        display: 'flex',
    },
    searchInput: {
        flex: 1,
        width: '100%',
        marginRight: '10px !important',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '5px 10px',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: '14px',
            opacity: 1,
            color: GRAY_LIGHT,
        },
    },
    searchButton: {
        padding: '13px 23px',
        background: PRIMARY,
        borderRadius: '10%',
        minWidth: '60px',
        height: 44,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '& .MuiButton-label': {
            fontSize: 13,
        },
    },
    overflowUser: {
        flex: 1,
        height: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.5em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY,
            borderRadius: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        paddingRight: 10,
    },
    userWrapper: {
        borderTop: `0.5px solid ${GRAY_LIGHT}`,
        padding: '10px 0',
    },
    userContent: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '9px 15px',
        cursor: 'pointer',
        '&.active': {
            backgroundColor: TABLE_GRAY,
        },
        '&:hover': {
            backgroundColor: TABLE_GRAY,
        },
    },
    userImage: {
        minHeight: '65px',
        minWidth: '65px',
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        borderRadius: '50%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '24px',
            color: WHITE,
        },
    },
    userText: {
        flex: 1,
    },
    userName: {
        padding: '0px !important',
        textTransform: 'capitalize',
        color: PRIMARY_DARK,
        fontSize: '15px',
        lineHeight: '18px',
        lineSpacing: '0px',
        fontWeight: 'bold',
        marginBottom: '11px',
    },
    userStatus: {
        '&.MuiSvgIcon-root': {
            fontSize: '12px',
            verticalAlign: 'text-top',
            marginLeft: 5,
        },
    },
    onlineStatus: {
        color: '#1ae01a',
    },
    offlineStatus: {
        color: '#ccc',
    },
    userLastMessage: {
        padding: '0px',
        color: PRIMARY_DARK,
        fontSize: '13px',
        lineHeight: '16px',
        width: 150,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        '&.full': {
            width: '100%',
        },
    },
    userInfo: {
        textAlign: 'right',
    },
    userDate: {
        padding: '0px',
        marginBottom: '19px',
        color: TEXT_COLOR,
        fontWeight: 'bold',
    },
    customBadge: {
        marginRight: '10px',
    },
    messageContainer: {
        flex: 1,
        boxShadow: '0px 3px 15px #4D2F821A',
        borderRadius: '8px',
        background: WHITE,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '70vmin',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
            minHeight: '100%',
        },
        overflow: 'hidden',
    },
    selectedUser: {
        cursor: 'pointer',
        display: 'flex',
        paddingBottom: '22px',
        marginBottom: '20px',
        borderBottom: '0.5px solid #9F9F9F',
    },
    selectedUserImage: {
        height: '48px',
        width: '48px',
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_LIGHT,
        borderRadius: '50%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '18px',
            color: WHITE,
        },
    },
    messageContent: {
        flex: 1,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.6em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            backgroundColor: '#EAF6F6',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_SOFT,
            borderRadius: '10px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    messageImage: {
        width: '100%',
        // maxHeight: '300px',
        height: '150px',
        objectFit: 'cover',
    },
    fileImage: {
        minWidth: '100px',
    },
    messageLeftWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    messageLeftContent: {
        minWidth: '20%',
        maxWidth: '80%',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%',
        },
    },
    messageLeftText: {
        display: 'block',
        width: '100%',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '65px',
        fontSize: '14px',
        borderRadius: '0 20px 20px 20px',
        position: 'relative',
        margin: '0px',
        backgroundColor: TABLE_GRAY,
        '& span': {
            fontSize: '13px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: 5,
            right: '20px',
        },
        wordBreak: 'break-word',
    },
    messageRightWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    messageRightText: {
        display: 'block',
        width: '100%',
        color: TEXT_COLOR,
        padding: '14px 20px',
        paddingRight: '65px',
        fontSize: '14px',
        borderRadius: '20px 0 20px 20px',
        position: 'relative',
        margin: '0px',
        border: `1px solid ${GRAY_LIGHT}`,
        '& span': {
            fontSize: '13px',
            color: TEXT_COLOR,
            position: 'absolute',
            bottom: 5,
            right: '20px',
        },
        wordBreak: 'break-word',
    },
    messageCenterDate: {
        textAlign: 'center',
        fontSize: '15px',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        margin: 0,
        marginBottom: '22px',
    },
    formContent: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 20,
    },
    uploadContainer: {
        marginRight: '8px',
        '& button': {
            borderRadius: '12px',
            minWidth: '25px',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
            },
        },
    },
    messageForm: {
        // marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },
    messageButton: {
        fontSize: '14px',
        padding: '13px 23px',
        background: PRIMARY,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        boxShadow: 'none',
        height: 44,
        '& .buttonText': {
            marginRight: 5,
        },
        [theme.breakpoints.down('md')]: {
            '&.MuiButton-root': {
                minWidth: 44,
            },
            padding: 10,
            '& .buttonText': {
                display: 'none',
            },
            '& .buttonSendIcon': {
                width: 14,
                height: 14,
            },
        },
    },
}));

export default useStyles;
