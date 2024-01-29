import makeStyles from '@material-ui/core/styles/makeStyles';

const gray = '#B1BCDB';
const blue = '#4A87FE';
const green = '#41C328';
const orange = '#FE7C2A';
const purple = '#BE1F93';
const black = '#435179';
const tokopedia = '#3F8B3D';
const shopee = '#EC4D2C';
const lazada = '#F20474';
const blibli = '#2689CA';
const red = '#E2004D';
const colorTextGray = '#B1BCDB';
const borderGray = '#E5E9F1';
const colorText = '#435179';

const useStyles = makeStyles((theme) => ({
    salesChannelTableWrapper: {
        margin: '15px 16px',
        '& h2': {
            color: black,
            marginBottom: 0,
        },
    },
    container: {
        '& table': {
            width: '100%',
            borderSpacing: '0 15px',
            [theme.breakpoints.down('xs')]: {
                width: '230%',
            },
        },
        '& thead td': {
            color: gray,
            fontWeight: 700,
        },
        '& tbody tr': {
            height: 71,
        },
        '& tbody td': {
            background: '#FFFFFF',
            padding: '11px 5px',
            color: black,
        },
        '& .channelIcon': {
            textAlign: 'center',
            borderRadius: '30% 0 0 10px',
            position: 'relative',
        },
        '& tbody tr .channelIcon::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '100%',
            borderLeft: '7px double purple',
        },
        '& tbody tr .tokopedia.channelIcon::before': {
            borderColor: tokopedia,
        },
        '& tbody tr .shopee.channelIcon::before': {
            borderColor: shopee,
        },
        '& tbody tr .lazada.channelIcon::before': {
            borderColor: lazada,
        },
        '& tbody tr .blibli.channelIcon::before': {
            borderColor: blibli,
        },
        '& tbody tr .red.channelIcon::before': {
            borderColor: red,
        },
        '& tbody tr .blue.channelIcon::before': {
            borderColor: blue,
        },
        '& tbody tr .black.channelIcon::before': {
            borderColor: black,
        },
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            width: '100%',
            overflowX: 'scroll',
        },
    },
    titleComponent: {
        fontSize: 24,
        color: '#BE1F93',
    },
    columnLeft: {
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 15px)',
            float: 'left',
        },
    },
    columnRight: {
        [theme.breakpoints.up('sm')]: {
            width: 'calc(50% - 15px)',
            float: 'right',
        },
    },
    info: {
        margin: '15px -8px',
        [theme.breakpoints.down('md')]: {
            margin: '5px -8px',
        },
    },
    gridBoxInfo: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    boxInfo: {
        borderRadius: 16,
        padding: 13,
        margin: '0 8px',
        background: '#FFF',
        color: '#8C98A2',
        height: '260px',
        verticalAlign: 'top',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '15px 16px',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '16px',
            '& span': {
                fontSize: '0.65rem',
            },
            '& h2 + span': {
                color: gray,
            },
        },
        '& .imgIcon': {
            position: 'absolute',
            top: '-30px',
            right: 0,
        },
        '& span': {
            color: black,
            display: 'block',
        },
        '& h3': {
            fontSize: 22,
        },
        '& h2': {
            fontSize: 30,
            lineHeight: 1,
        },
        '& h2 + span': {
            color: gray,
        },
        '& .colorBlue': {
            color: blue,
        },
        '& .colorGreen': {
            color: green,
        },
        '& .colorOrange': {
            color: orange,
        },
        '& .link': {
            color: purple,
            textDecoration: 'underline',
            textAlign: 'center',
        },
    },
    bgGradient: {
        color: '#FFF',
        background: 'linear-gradient(180deg, rgba(190,31,147,1) 0%, rgba(87,25,160,1) 72%)',
    },
    imgIcon: {
        textAlign: 'right',
    },
    total: {
        fontSize: 30,
        fontWeight: 700,
        color: '#5719A0',
    },
    colorInGradient: {
        color: '#FFF',
    },
    titleInfo: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'block',
        textOverflow: 'ellipsis',
    },
    textName: {
        fontSize: 18,
    },
    textBold: {
        fontWeight: 700,
        letterSpacing: '1.2px',
    },
    welcomeUser: {
        backgroundImage: 'linear-gradient(214deg, #BE1F93 28%, #5719A0 100%)',
        color: '#FFFFFF',
        borderRadius: 10,
        padding: 37,
        marginTop: 5,
        '& .title': {
            fontSize: 30,
            lineHeight: '33px',
            marginBottom: 24,
        },
        [theme.breakpoints.down('xs')]: {
            margin: '15px 8px',
        },
    },
    userWrapper: {
        display: 'grid',
        gridTemplateColumns: '30% 30% 30% 10%',
        gridColumnGap: '10px',
        [theme.breakpoints.down('md')]: {
            margin: '15px 8px',
            display: 'inline-grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gridRowGap: '20px',
        },
    },
    user: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',

        },
        verticalAlign: 'top',
        '&:nth-last-child(1)': {
            width: '10%',
            textAlign: 'center',
            paddingTop: 20,
        },
        '& span': {
            wordWrap: 'break-word',
        },
        '& a': {
            background: '#FFFFFF',
            color: '#BE1F93',
            padding: '10px 26px',
            borderRadius: 20,
        },
    },
    containerUser: {
        display: 'flex',
    },
    infoDetail: {
        position: 'relative',
        height: 40,
        '& span': {
            maxWidth: '82%',
        },
    },
    infoStatusWrapperShipment: {
        display: 'grid',
        gridTemplateColumns: '33% 33% 33%',
        gridColumnGap: '4px',
        marginTop: '10px',
    },
    infoStatusWrapperOrder: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridColumnGap: '4px',
        marginTop: '10px',
    },
    infoStatusWrapperReturn: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridColumnGap: '4px',
        marginTop: '10px',
    },
    infoStatus: {
        marginBottom: 18,
        '&.statusCenter': {
            verticalAlign: 'top',
            textAlign: 'center',
        },
    },
    noMargin: {
        marginBottom: 0,
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
    },
    imageIcon: {
        marginLeft: 10,
        marginRight: 10,
        width: 36,
        alignSelf: 'center',
    },
    dialogTextContainer: {
        width: '500px',
    },
    mobileContainer: {
        marginTop: 10,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
        '& .channelIcon': {
            borderRadius: '0 16px 16px 0',
            position: 'relative',
        },
        '& .channelIcon::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 5,
            height: '100%',
            borderLeft: '7px double purple',
        },
        '& .tokopedia.channelIcon::before': {
            borderColor: tokopedia,
        },
        '& .shopee.channelIcon::before': {
            borderColor: shopee,
        },
        '& .lazada.channelIcon::before': {
            borderColor: lazada,
        },
        '& .blibli.channelIcon::before': {
            borderColor: blibli,
        },
        '& .red.channelIcon::before': {
            borderColor: red,
        },
        '& .blue.channelIcon::before': {
            borderColor: blue,
        },
        '& .black.channelIcon::before': {
            borderColor: black,
        },
    },
    gridList: {
        display: 'grid',
    },
    content: {
        padding: '12px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
    },
    titleList: {
        color: colorTextGray,
        fontSize: 10,
        margin: 0,
    },
    bodyList: {
        color: colorText,
        fontSize: 12,
        margin: 0,
        fontWeight: 400,
    },
}));

export default useStyles;
