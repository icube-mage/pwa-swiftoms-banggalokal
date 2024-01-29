import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, WHITE, FONT_COLOR, GRAY_BG_2, BORDER_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    paperHead: {
        boxShadow: 'none',
        borderRadius: 8,
        '&.separate': {
            marginBottom: 20,
        },
        [theme.breakpoints.down('xs')]: {
            border: `1px solid ${BORDER_COLOR}`,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
    },
    tableToolbar: {
        padding: '10px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: 10,
        },
        backgroundColor: GRAY_BG_2,
        '& .top-buttons-wrapper': {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            gap: 10,
            [theme.breakpoints.down('sm')]: {
                display: 'grid',
                gridTemplateColumns: '75% 25%',
            },
            '& .top-item': {
                [theme.breakpoints.down('sm')]: {
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: 10,
                },
            },
        },
        '& .top-item': {
            display: 'inline-block',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                textAlign: 'left',
                '& .MuiPickersDateRangePickerInput-root': {
                    alignItems: 'inherit',
                },
            },
            '& .MuiButton-text': {
                border: '1px solid',
                color: FONT_COLOR,
                textTransform: 'capitalize',
            },
        },
    },
    textInput: {
        width: 275,
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: '100%',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            backgroundColor: WHITE,
            borderBottom: 'none',
            [theme.breakpoints.down('xs')]: {
                height: 36,
                fontSize: 12,
            },
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
    },
    addRoot: {
        height: 40,
        [theme.breakpoints.down('xs')]: {
            height: 34,
            fontSize: 12,
        },
    },
    channelTitle: {
        borderRadius: 4,
        backgroundColor: WHITE,
        padding: '6px 15px',
        fontSize: 14,
    },
    channelDiv: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: 'max-content',
    },
    channelContainer: {
        width: 20,
        height: 20,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    channelName: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: '75vw',
        },
    },
}));

export default useStyles;
