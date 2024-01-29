import { makeStyles } from '@material-ui/core/styles';
import { TEXT_COLOR } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles(() => ({
    content: {
        padding: '26px 29px 0px 22px',
        borderBottom: '2px solid #F5F7FB',
    },
    sectionHead: {
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        color: TEXT_COLOR,
        fontFamily: font,
        margin: 0,
    },
    fieldInput: {
        height: 36,
    },
}));

export default useStyles;
