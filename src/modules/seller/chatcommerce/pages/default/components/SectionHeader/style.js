import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    sectionHeaderContainer: {
        background: 'url(\'/assets/img/dashboard/seller-dashboard-bg.png\')',
        height: 180,
        padding: '30px 20px 30px 20px',
    },
    sectionHeaderTitle: {
        color: WHITE,
        '& span': {
            fontWeight: 'bold',
            fontSize: 20,
        },
    },
    sectionHederContentContainer: {
        marginTop: 10,
    },
    sectionContentLeft: {
        display: 'flex',
        padding: '10px 0px !Important',
    },
    sectionContentLeftIcon: {
        backgroundColor: WHITE,
        borderRadius: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        overflow: 'hidden',
    },
    iconContainer: {
        width: '100%',
        position: 'relative',
        paddingTop: '100%',
        overflow: 'hidden',
        display: 'block',
        '& img': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            objectFit: 'cover',
        },
    },
    sectionContentLeftInformation: {
        marginLeft: 15,
        marginRight: 15,
    },
    infoTitle: {
        color: WHITE,
        fontWeight: 'bold',
    },
    infoEmail: {
        color: WHITE,
    },
    sectionContentRight: {
        display: 'flex',
        padding: '10px 0px !Important',
        alignItems: 'center',
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
}));

export default useStyles;
