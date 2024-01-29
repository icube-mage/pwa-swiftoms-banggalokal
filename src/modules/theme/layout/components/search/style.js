import { makeStyles } from '@material-ui/core/styles';
import { BORDER_COLOR } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    clear: {
        clear: 'both',
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: '#FFF',
        padding: '5px 10px 5px 10px',
        borderRadius: 3,
        border: `1px solid ${BORDER_COLOR}`,
        '& .search-input': {
            border: 0,
            outline: 0,
            width: '100%',
            '&::placeholder': {
                color: '#c5c4c6',
            },
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            marginBottom: 10,
        },
        [theme.breakpoints.up('middleView')]: {
            width: '22vw',
            marginBottom: 0,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    searchIcon: {
        width: 20,
        color: '#c5c4c6',
    },
    popperContainer: {
        zIndex: 9999,
        left: '-30px !important',
        overflow: 'auto',
        boxShadow: '0px 8px 40px 2px rgba(61, 79, 92, 0.12)',
        marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            left: '0 !important',
            width: '100%',
            transform: 'translate3d(0px, 100px, 0px) !important',
        },
    },
    popperContent: {
        overflow: 'auto',
        backgroundColor: '#FFF',
        borderRadius: 3,
        width: 400,
        maxHeight: 500,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    searchEmptyState: {
        padding: 10,
        '& h3': {
            fontSize: 16,
            fontWeight: 'bolder',
            color: '#52697A',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 15,
            marginRight: 15,
        },
        '& ul': {
            padding: 0,
            marginTop: 5,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            listStyle: 'none',
            clear: 'both',
            '& li': {
                float: 'left',
                padding: '3px 10px 3px 10px',
                backgroundColor: '#E9FAEF',
                color: '#24A851',
                borderRadius: 50,
                margin: 5,
            },
        },
    },
    searchNotFound: {
        padding: 10,
    },
    listSearch: {
        listStyle: 'none',
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        '& li': {
            padding: '5px 10px 5px 10px',
            '& a': {
                '& h3': {
                    margin: 0,
                    fontSize: 16,
                    padding: 5,
                    '& img': {
                        height: 15,
                        width: 35,
                        marginRight: 5,
                    },
                },
                '& p': {
                    margin: 0,
                },
            },
            '&:hover': {
                backgroundColor: '#EFF2F5',
            },
        },
    },
}));

export default useStyles;
