import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, WHITE, TEXT_GRAY, ERROR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    btnSelectedLabel: {
        border: '1px solid #D2D9DF',
        padding: '12px 10px',
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    spanErr: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 3,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '0 !important',
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: '0 !important',
    },
    titleLabel: {
        padding: '16px 0px',
    },
    loadingWrapper: {
        padding: '10px 0px',
    },
    treeListContainer: {
        maxWidth: '100%',
        overflowX: 'scroll',
        backgroundColor: '#F6F6F6',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'row',
        width: 'fit-content',
    },
    listContainer: {
        border: '1px solid #D2D9DF',
        maxHeight: 300,
        overflowY: 'auto',
        width: 250,
        backgroundColor: WHITE,
    },
    listItem: {
        borderBottom: '1px solid #D2D9DF',
        cursor: 'pointer',
    },
    listItemSelected: {
        borderBottom: '1px solid #D2D9DF',
        cursor: 'pointer',
        color: PRIMARY,
    },
    listItemText: {
        fontSize: '13px !important',
    },
    noDataContainer: {
        display: 'block',
        backgroundColor: '#F6F6F6',
    },
    noDataWrapper: {
        padding: '40px 25px',
        fontSize: 16,
        textAlign: 'center',
    },
    footerModalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'normal',
        justifyContent: 'normal',
    },
    breadcrumbWrapper: {
        padding: '10px 12px',
        marginBottom: 10,
        width: '100%',
    },
    breadcrumbLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TEXT_GRAY,
    },
    breadcrumbValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    btnBottomWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 12,
        gap: '10px',
        '& .btn-cancel': {},
        '& .btn-next': {},
    },
}));

export default useStyles;
