import { makeStyles } from '@material-ui/core/styles';
import {
    BORDER_COLOR, GRAY_BG_2, PRIMARY, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    boxCardSimpleTabContainer: {
        marginTop: 15,
        '& .clear': {
            clear: 'both',
        },
        '& ul': {
            display: 'flex',
            listStyleType: 'none',
            paddingLeft: 0,
            marginTop: 0,
            marginBottom: 0,
            top: -10,
            [theme.breakpoints.down('sm')]: {
                overflow: 'auto',
            },
            '& li': {
                display: 'flex',
                alignItems: 'center',
                float: 'left',
                background: GRAY_BG_2,
                borderTop: `1px solid ${ BORDER_COLOR}`,
                borderBottom: `1px solid ${ BORDER_COLOR}`,
                borderLeft: `1px solid ${ BORDER_COLOR}`,
                borderRight: `1px solid ${ BORDER_COLOR}`,
                borderRadius: '5px 5px 0px 0px',
                marginRight: 5,
                '& a': {
                    marginRight: 5,
                    '&.card-simple-item-link-anchor': {
                        display: 'inline-block',
                        padding: '8px 0px 8px 20px',
                        [theme.breakpoints.down('sm')]: {
                            padding: '0px 0px 0px 10px',
                            whiteSpace: 'nowrap',
                            fontSize: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    },
                    '& img': {
                        height: 14,
                        marginRight: 10,
                    },
                    '&.card-simple-item-link-add-anchor': {
                        marginRight: 0,
                        padding: '5px 5px',
                        '& svg': {
                            marginRight: 0,
                            width: 5,
                            color: WHITE,
                        },
                    },
                },
                '&.active': {
                    background: WHITE,
                    borderBottom: `1px solid ${ WHITE}`,
                },
                '& button': {
                    outline: 0,
                    border: 0,
                    background: 'transparent',
                    marginRight: 10,
                    display: 'inline-flex',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                    [theme.breakpoints.down('sm')]: {
                        marginRight: 5,
                        padding: 0,
                    },
                },
                '&.card-simple-item-add': {
                    height: 38,
                    marginLeft: 5,
                    [theme.breakpoints.down('sm')]: {
                        height: 35,
                    },
                    '&.empty': {
                        marginLeft: 0,
                    },
                    '& a': {
                        height: '100%',
                        display: 'block',
                        marginRight: 5,
                        '&.card-simple-item-link-add-anchor': {
                            marginRight: 0,
                            padding: '7px 10px',
                            '& span': {
                                background: PRIMARY,
                                padding: '0px 5px',
                                borderRadius: 10,
                                verticalAlign: 'middle',
                                '& svg': {
                                    marginRight: 0,
                                    width: 8,
                                    color: WHITE,
                                },
                            },
                        },
                    },
                    '& .active': {
                        background: WHITE,
                        borderTop: `1px solid ${ BORDER_COLOR}`,
                        borderBottom: `1px solid ${ WHITE}`,
                        borderRadius: '5px 5px 0px 0px',
                        height: 38,
                        [theme.breakpoints.down('sm')]: {
                            marginTop: 2,
                        },
                    },
                },
                // end
            },
        },
    },
}));

export default useStyles;
