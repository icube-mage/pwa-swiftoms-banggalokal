import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT3, PRIMARY_SOFT, WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    boxCardIntro: {
        padding: '0px 20px 0px 20px',
        position: 'relative',
        top: -35,
        '@media (max-width: 320px)': {
            top: 0,
        },
    },
    boxCardIntroContainer: {
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0,
        },
    },
    boxCardIntroItem: {
        padding: '5px 0px',
        borderRadius: 5,
        backgroundColor: WHITE,
        '& h3': {
            fontSize: 16,
            paddingLeft: 20,
            marginBottom: 15,
        },
    },
    boxCardIntroBoxItem: {
        display: 'flex',
        paddingRight: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'inherit',
        },
    },
    sectionContentLeft: {
        display: 'flex',
        padding: '10px 0px !Important',
    },
    sectionContentLeftIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .left-tag': {
            borderRadius: '0px 2px 2px 0px;',
            width: '4px',
            height: '40px',
            marginRight: 15,
        },
        '& .left-icon-container': {
            padding: '10px 12px 9px 12px',
            borderRadius: '50px',
            '& img': {
                height: 15,
                width: 15,
            },
        },
    },
    sectionContentLeftInformation: {
        marginLeft: 15,
        marginRight: 15,
        '& .linethrough': {
            textDecoration: 'line-through',
        },
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    infoDesc: {
        fontSize: 10,
        color: GRAY_LIGHT3,
    },
    sectionContentRight: {
        display: 'flex',
        padding: '10px 0px !Important',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'flex-start',
            marginLeft: 20,
        },
        '& a': {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: WHITE,
            padding: '0px 20px',
            height: '30px',
            borderRadius: 3,
            fontWeight: 'bold',
            '& img': {
                marginRight: 5,
            },
        },
    },
    sectionContentRightButton: {
        display: 'flex',
        border: 0,
        backgroundColor: PRIMARY_SOFT,
        color: WHITE,
        padding: '6px 20px',
        alignItems: 'center',
        borderRadius: 5,
        cursor: 'pointer',
        '& img': {
            marginRight: 10,
        },
    },
    sectionContentRightLink: {
        display: 'flex',
        border: 0,
        backgroundColor: `${PRIMARY_SOFT } !important`,
        color: WHITE,
        padding: '6px 20px',
        alignItems: 'center',
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: 12,
        '& img': {
            marginRight: 10,
        },
    },
}));

export default useStyles;
