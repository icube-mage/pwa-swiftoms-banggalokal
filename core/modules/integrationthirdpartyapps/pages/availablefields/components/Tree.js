/* eslint-disable no-nested-ternary */
import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';

import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import IndeterminateCheckBoxSharpIcon from '@material-ui/icons/IndeterminateCheckBoxSharp';

import {
    PRIMARY, GRAY_LIGHT,
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
        minHeight: 600,
        height: 'max-content',
        '& .MuiTreeItem-content': {
            maxHeight: 40,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY,
        },
    },
    root: {
        flexGrow: 1,
        width: '100%',
        overflowX: 'clip',
        height: 400,
    },
}));

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
        paddingLeft: 10,
        borderLeft: `1px solid ${GRAY_LIGHT}`,
    },
    label: {
        margin: '10px 0',
        fontSize: 14,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const {
        dataTree,
    } = props;

    function recursiveRender(lists, parentKey = '', value = '') {
        if (!lists?.length) {
            const key = `${parentKey ? `${parentKey}_` : ''}${String(value) }`;
            return (
                <StyledTreeItem
                    nodeId={key}
                    key={key}
                    aria-expanded="true"
                    label={value}
                    disabled
                />
            );
        }
        return lists.map((node) => {
            const key = `${parentKey ? `${parentKey}_` : ''}${String(node.key || value) }`;
            return (
                <StyledTreeItem
                    nodeId={key}
                    key={key}
                    aria-expanded="true"
                    label={node?.key}
                    disabled
                >
                    {node.children?.length ? recursiveRender(node.children, key) : node.is_leaf ? recursiveRender(null, key, node.value) : null}
                </StyledTreeItem>
            );
        });
    }

    return (
        <div className={classes.container}>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<IndeterminateCheckBoxSharpIcon />}
                defaultExpandIcon={<AddBoxSharpIcon />}
                disableSelection
            >
                {recursiveRender(dataTree)}
            </TreeView>
        </div>
    );
}
