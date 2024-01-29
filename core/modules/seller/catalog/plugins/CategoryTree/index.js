/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY, GRAY_BG,
    TEXT_COLOR, ERROR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    container: {
        border: `1px solid ${TABLE_GRAY}`,
        borderRadius: 6,
        '&.error': {
            borderColor: ERROR,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    treeContainer: {
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
        height: 180,
        '& .MuiTreeItem-content': {
            display: 'block',
            padding: '0 10px',
        },
        borderRight: '1px solid',
        borderRightColor: TABLE_GRAY,
        [theme.breakpoints.down('xs')]: {
            borderBottom: '1px solid',
            borderBottomColor: GRAY_LIGHT,
            height: 150,
            marginBottom: 20,
        },
    },
    root: {
        flexGrow: 1,
        width: '100%',
        overflowX: 'clip',
    },
    label: {
        color: TEXT_COLOR,
        fontSize: 12,
    },
    controlLabel: {
        '& .MuiIconButton-label': {
            height: 5,
            width: 15,
        },
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 12,
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            height: 20,
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            width: '.75em',
            heigh: '.75em',
        },
    },
    labelHead: {
        fontSize: 14,
        color: PRIMARY_DARK,
        fontWeight: 600,
        padding: '10px 15px',
        backgroundColor: GRAY_BG,
        borderRadius: '6px 6px 0 0',
    },
    divLabel: {
        color: TEXT_COLOR,
        fontSize: 14,
        padding: '10px 15px',
        borderBottom: `1px solid ${TABLE_GRAY}`,

    },
    helper: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 6,
    },
    treeGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
}));

function Item(props) {
    const {
        label, node, setSelected,
    } = props;
    const classes = useStyles();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} aria-hidden="true" onClick={() => setSelected(node)}>
            <div>
                <span className={clsx(classes.label)}>{label}</span>
            </div>
            {!!node.children?.length && node.level < 2
                && (
                    <div style={{ display: 'flex', alignItems: 'center', color: TEXT_COLOR }}>
                        <ChevronRightIcon />
                    </div>
                )}
        </div>
    );
}

function TransitionComponent(props) {
    return (
        <div>
            <Collapse {...props} />
        </div>
    );
}

const StyledTreeItem = withStyles(() => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
    },
    label: {
        margin: '3px 0',
        marginLeft: 0,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const {
        categories, t, formik, name,
    } = props;

    const [firstLoad, setFirstLoad] = React.useState(true);
    const [selected, setSelected] = React.useState({});
    const [selected1, setSelected1] = React.useState({});
    const [selected2, setSelected2] = React.useState({});

    const handleSelect = (nodeSelect) => {
        if (!nodeSelect.children?.length || nodeSelect.level === 2) {
            formik.setFieldValue(name, nodeSelect.id);
        } else {
            formik.setFieldValue(name, null);
        }
        switch (nodeSelect.level) {
        case 0:
            setSelected(nodeSelect);
            setSelected1({});
            setSelected2({});
            break;
        case 1:
            setSelected1(nodeSelect);
            setSelected2({});
            break;
        case 2:
            setSelected2(nodeSelect);
            break;
        default:
            break;
        }
    };

    const error = !!(formik.touched[name] && formik.errors[name]);
    const helperText = (formik.touched[name] && formik.errors[name]) || '';

    function renderItem(lists) {
        return lists.map((node) => (
            <StyledTreeItem
                key={node.id}
                nodeId={String(node.id)}
                label={(
                    <Item
                        {...props}
                        node={node}
                        label={node.name}
                        setSelected={handleSelect}
                    />
                )}
            />
        ));
    }

    function insertState(n) {
        if (n?.id) {
            switch (n.level) {
            case 0:
                setSelected(n);
                break;
            case 1:
                setSelected1(n);
                break;
            case 2:
                setSelected2(n);
                break;
            default:
                break;
            }
        }
    }
    const searchCategories = async (lists, p1, p2) => {
        await lists.forEach((el) => {
            if (el.id === formik.values[name]) {
                insertState(el);
                insertState(p1);
                insertState(p2);
            } else if (el.children?.length) {
                searchCategories(el.children, el, p1);
            }
        });
    };

    React.useEffect(() => {
        if (formik.values[name]) {
            searchCategories(categories);
        }
        setFirstLoad(false);
    }, []);

    return (
        <div>
            <div className={clsx(classes.container, error && 'error')}>
                <div className={classes.labelHead}>
                    {t('sellercatalog:Category_List')}
                </div>
                {!!selected.name
                    && (
                        <div className={classes.divLabel}>
                            {`${selected.name} ${selected1.name ? `> ${selected1.name}` : ''} ${selected2.name ? `> ${selected2.name}` : ''}`}
                        </div>
                    )}
                <div className={classes.treeGrid}>
                    {!firstLoad
                    && (
                        <div className={classes.treeContainer}>
                            <TreeView
                                className={classes.root}
                                selected={String(selected.id)}
                            >
                                {renderItem(categories)}
                            </TreeView>
                        </div>
                    )}
                    {!!selected.children?.length
                        && (
                            <div className={classes.treeContainer}>
                                <TreeView
                                    className={classes.root}
                                    selected={String(selected1.id)}
                                >
                                    {renderItem(selected.children)}
                                </TreeView>
                            </div>
                        )}
                    {!!selected1.children?.length
                        && (
                            <div className={classes.treeContainer}>
                                <TreeView
                                    className={classes.root}
                                    selected={String(selected2.id)}
                                >
                                    {renderItem(selected1.children)}
                                </TreeView>
                            </div>
                        )}
                </div>
            </div>

            {!!helperText && <div className={classes.helper}>{helperText}</div>}
        </div>
    );
}
