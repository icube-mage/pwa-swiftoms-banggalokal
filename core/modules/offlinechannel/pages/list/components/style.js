import { makeStyles } from '@material-ui/core/styles';

const borderColor = '#ECF0FB';
const colorText = '#435179';
const colorPurple = '#BE1F93';
const grayColor = '#C3CEEC';
const greenText = '#51C519';
const greenBack = '#EBFFE2';
const redText = '#DA1414';
const redBack = '#FFDFDF';

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        paddingBottom: 30,
    },
    listContainer: {
        border: `1px solid ${borderColor}`,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: 30,
        marginBottom: 8,
        display: 'grid',
        gridTemplateColumns: '10% 80% 10%',
    },
    icon: {
        width: 72,
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: 60,
        },
        [theme.breakpoints.down('xs')]: {
            width: 40,
        },
    },
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            color: grayColor,
        },
    },
    baselineDiv: {
        display: 'flex',
        alignItems: 'end',
        paddingLeft: 20,
    },
    centerText: {
        display: 'flex',
        alignItems: 'center',
    },
    channelName: {
        color: colorText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 12,
        border: '1px solid',
        borderRadius: 20,
        padding: '5px 10px',
        margin: '10px 0',
        borderColor: redText,
        backgroundColor: redBack,
        color: redText,
        '&.green': {
            borderColor: greenText,
            backgroundColor: greenBack,
            color: greenText,
        },
    },
    channelCode: {
        fontSize: 12,
        color: colorText,
        padding: 0,
        margin: 0,
    },
    progress: {
        color: `${colorPurple} !important`,
    },
    noRecords: {
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
        color: colorText,
    },
    menuItem: {
        '&.purple': {
            color: colorPurple,
        },
    },
}));

export default useStyles;
