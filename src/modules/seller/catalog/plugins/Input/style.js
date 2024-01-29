import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR, WHITE, BORDER_COLOR, GRAY_LIGHT3,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    formFieldsGrid: {
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: (props) => props?.formGrid ?? '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 20,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
        '&.grid': {
            marginBottom: 30,
        },
        [theme.breakpoints.up('md')]: {
            '&.image': {
                display: 'block',
            },
        },
        [theme.breakpoints.up('xl')]: {
            '&.image': {
                display: 'grid',
            },
        },
        '& .input-autocomplete': {
            '& .MuiAutocomplete-inputRoot': {
                borderBottom: `1px solid ${BORDER_COLOR} !important`,
            },
        },
        '& .end-adornment-container': {
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 14,
        },
    },
    formFieldsGridStart: {
        alignItems: 'start',
    },
    required: {
        color: PRIMARY,
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
        },
    },
    textInput: {
        width: '100%',
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
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiAutocomplete-inputRoot': {
            minHeight: 42,
            paddingTop: 7,
            paddingBottom: 7,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '&.adorn': {
            '& .MuiInput-root': {
                padding: 0,
            },
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
        '& .ql-toolbar': {
            borderRadius: '6px 6px 0 0',
        },
        '& .ql-container': {
            borderRadius: '0 0 6px 6px',
            height: 220,
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '20px 14px',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
        '& .optional-label': {
            fontWeight: 300,
            color: GRAY_LIGHT3,
            marginLeft: 10,
        },
    },
    helper: {
        fontSize: '0.75rem',
        color: TEXT_COLOR,
    },
}));

export default useStyles;
