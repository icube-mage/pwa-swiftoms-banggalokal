/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';

import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Action from '@modules/categories/pages/default/components/Action';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, GREEN_ACTIVE, ERROR,
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
        minHeight: 480,
        height: 'max-content',
    },
    root: {
        flexGrow: 1,
        width: '100%',
        overflowX: 'clip',
        height: 400,
    },
    label: {
        color: PRIMARY_DARK,
        '&.checked': {
            color: PRIMARY,
        },
        marginLeft: 10,
    },
    activeMark: {
        height: 5,
        width: 5,
        borderRadius: '50%',
    },
}));

function ExpandIcon() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ChevronRightIcon />
            <img alt="" src="/assets/img/folder-close.svg" className="icon" />
        </div>
    );
}

function ExpandedIcon() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ExpandMoreIcon />
            <img alt="" src="/assets/img/folder.svg" className="icon" />
        </div>
    );
}

function Item(props) {
    const { label, checked, node } = props;
    const classes = useStyles();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <span className={clsx(classes.label, checked && 'checked')}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={classes.activeMark} style={{ backgroundColor: node.is_active ? GREEN_ACTIVE : ERROR }} />
                <Action {...props} />
            </div>
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

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    label: {
        margin: '10px 0',
        marginLeft: 20,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const {
        categories, formik,
    } = props;

    function recursiveRender(lists, parent) {
        return lists.map((node) => (
            <StyledTreeItem
                onClick={() => {
                    if ((formik.values?.id && (formik.values.id !== node.id)) || !formik.values?.id) {
                        formik.setValues({
                            id: node.id,
                            name: node.name,
                            is_active: !!node.is_active,
                            description: node.description || '',
                            parent_id: parent?.id || null,
                            level: node.level,
                        });
                    }
                }}
                nodeId={node.id}
                label={(
                    <Item
                        {...props}
                        parent={parent || {}}
                        node={node}
                        label={node.name}
                    />
                )}
            >
                {!!node.children?.length && recursiveRender(node.children, node)}
            </StyledTreeItem>
        ));
    }

    return (
        <div className={classes.container}>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandedIcon />}
                defaultExpandIcon={<ExpandIcon />}
                defaultExpanded={[2]}
                multiSelect
            >
                {recursiveRender(categories)}
            </TreeView>
        </div>
    );
}
