import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const borderColor = '#ECF0FB';
const colorText = '#435179';
const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        marginTop: 20,
        paddingBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            paddingLeft: 17,
            paddingRight: 17,
        },
    },
    title: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
    },
    buttonAdd: {
        borderRadius: 20,
        textTransform: 'capitalize',
    },
    tabs: {
        backgroundColor: 'transparent',
    },
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        border: '1px solid',
        borderColor: '#B1BCDB',
        borderRadius: 20,
        backgroundColor: 'white',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        height: 36,
        marginRight: 15,
    },
    searchIcon: {
        paddingLeft: 16,
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        color: colorPurple,
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
            width: '100%',
        },
        borderRadius: 20,
        width: '100%',
        minWidth: 400,
        [theme.breakpoints.down('md')]: {
            minWidth: 200,
        },
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            minWidth: 'unset',
        },
        '&.MuiInput-underline:before': {
            display: 'none',
        },
        '&.MuiInput-underline:after': {
            display: 'none',
        },
    },
    fieldInputRender: {
        '& .MuiAutocomplete-inputRoot': {
            padding: '4px 12px',
            width: '100%',
        },
        '& .MuiInput-underline:before': {
            display: 'none',
        },
        '& .MuiInput-underline:after': {
            display: 'none',
        },
    },
    autocompleteRoot: {
        width: 200,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            minWidth: 'unset',
        },
        marginRight: 30,
        border: '1px solid',
        borderColor: '#B1BCDB !important',
        '& .placeholder': {
            color: '#B1BCDB  !important',
        },
        backgroundColor: 'white',
        borderRadius: '20px !important',
        height: 36,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
        },
        '& .MuiAutocomplete-listbox': {
            '& :hover': {
                color: 'brown',
            },
        },
    },
    selected: {
        color: colorText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginRight: 15,
    },

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
        gridTemplateColumns: '10% 20% 60% 10%',
    },
    icon: {
        width: 60,
        height: 'auto',
        marginRight: 33,
    },
    rowDiv: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        '&.last': {
            justifyContent: 'end',
        },
    },
    gridMp: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    mpContainer: {
        border: '2px solid white',
        padding: '20px 15px 30px 20px',
        borderRadius: 20,
        backgroundColor: 'white',
        margin: '0 10px 20px 10px',
        display: 'flex',
        position: 'relative',
        '& .MuiCheckbox-root': {
            position: 'absolute',
            top: 5,
            right: 0,
        },
        '&.active': {
            border: `2px solid ${colorPurple}`,
            '& .MuiSvgIcon-root': {
                color: colorPurple,
            },
        },
        '& .MuiFormControlLabel-labelPlacementStart': {
            width: '100%',
            flexDirection: 'row',
        },
    },
    mp: {
        display: 'flex',
        textAlign: 'left',
        alignItems: 'center',
    },
    mpImageContainer: {
        width: 65,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    marketName: {
        color: colorText,
        fontSize: 14,
        fontFamily: font,
        marginRight: 40,
        paddingLeft: 30,
    },
}));

export default useStyles;
