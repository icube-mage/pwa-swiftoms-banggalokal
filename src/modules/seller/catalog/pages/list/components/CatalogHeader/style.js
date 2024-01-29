import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK_OLD } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    sectionCatalogHeaderContainer: {
        marginBottom: '15px !important',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '10px !important',
            paddingRight: '10px !important',
        },
    },
    sectionContentLeft: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        '& .section-content-left-button': {
            '&:nth-child(1)': {
                marginRight: 10,
            },
            [theme.breakpoints.down('xs')]: {
                '&:nth-child(1)': {
                    marginRight: 0,
                },
                marginTop: 10,
                marginBottom: 10,
            },
        },
    },
    sectionContentRight: {
        display: 'flex',
        justifyContent: 'end',
        '& .text-helper': {
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        '& .section-content-right-button': {
            marginRight: 20,
            [theme.breakpoints.down('xs')]: {
                marginRight: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            display: 'grid',
            gridTemplateColumns: '33% 33% 33%',
            columnGap: 3,
            '& [class*="makeStyles-textInfoContainer"]': {
                display: 'none',
            },
            '& button, a': {
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5,
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                padding: '8px 0px',
                fontWeight: 'bold',
                fontSize: 12,
                '& img': {
                    display: 'none',
                },
            },
        },
    },
    divAlert: {
        '& .MuiAlertTitle-root': {
            [theme.breakpoints.up('sm')]: {
                display: 'inline-block',
                marginRight: 5,
            },
        },
        '& .MuiAlertTitle-root::after': {
            [theme.breakpoints.up('sm')]: {
                content: "':'",
                marginLeft: 2,
            },
        },
        '& .MuiAlert-message > div:not(:first-child)': {
            [theme.breakpoints.up('sm')]: {
                marginTop: 5,
            },
        },
    },
    divProgress: {
        color: PRIMARY_DARK_OLD,
        backgroundColor: 'rgb(255, 244, 229)',
        padding: '6px 16px',
        marginBottom: 10,
        '& img': {
            width: 22,
            height: 'auto',
            display: 'inline-block',
            verticalAlign: 'top',
            marginRight: 12,
        },
    },
}));

export default useStyles;
