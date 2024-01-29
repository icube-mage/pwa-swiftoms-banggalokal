import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TEXT_COLOR, GRAY_LIGHT, GRAY_TITLE,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        minHeight: 200,
        height: 'max-content',
        '& .MuiTreeItem-content': {
            maxHeight: 40,
        },
    },
    root: {
        flexGrow: 1,
        width: '100%',
        overflowX: 'clip',
        maxHeight: 400,
    },
    label: {
        color: TEXT_COLOR,
        marginLeft: 10,
        fontSize: 13,
    },
    activeMark: {
        height: 5,
        width: 5,
        borderRadius: '50%',
    },
    checkbox: {
        height: 20,
        width: 20,
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            height: 20,
            width: 20,
        },
        '&.primary': {
            '&.MuiCheckbox-root': {
                color: PRIMARY,
            },
        },
    },
    apiDiv: {
        border: `1px solid ${GRAY_TITLE}`,
        borderRadius: 4,
        marginBottom: 12,
    },
    apiHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        '&.cursor': {
            cursor: 'pointer',
        },
    },
    checkboxParent: {
        '& .MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent',
        },
        color: TEXT_COLOR,
    },
    arrow: {
        color: TEXT_COLOR,
        maxHeight: 20,
    },
    checkboxDiv: {
        borderTop: `1px solid ${GRAY_TITLE}`,
        padding: 8,
        backgroundColor: '#EBEEF5',
        borderRadius: '0 0 4px 4px',
    },
}));

export default useStyles;
