/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT,
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
        '& .MuiTreeItem-content': {
            maxHeight: 40,
        },
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
        fontSize: 13,
    },
    activeMark: {
        height: 5,
        width: 5,
        borderRadius: '50%',
    },
    checkbox: {
        height: 20,
        width: 20,
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            height: 20,
            width: 20,
        },
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
    const {
        label, checked, node, formik, name,
    } = props;
    const classes = useStyles();
    const onChange = (e) => {
        const isChecked = e.target.checked;
        let temp = [...formik.values[name]];
        if (node.children?.length) {
            let checkedVal = [node.value, ...node.children.map((child) => child.value)];
            node.children.forEach((child) => {
                if (child.children?.length) {
                    checkedVal = [...checkedVal, ...child.children.map((grandChild) => grandChild.value)];
                }
            });
            if (isChecked) {
                temp = [...new Set([...temp, ...checkedVal])];
            } else {
                temp = temp.filter((id) => !checkedVal.includes(id));
            }
        } else if (isChecked) {
            temp = [...temp, node.value];
        } else {
            temp = temp.filter((n) => n !== node.value);
        }
        formik.setFieldValue(name, temp);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
                className={classes.checkbox}
                checked={formik.values[name].includes(node.value)}
                onClick={(e) => e.stopPropagation()}
                onChange={onChange}
            />
            <div className={clsx(classes.label, checked && 'checked')}>
                {label}
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
        marginLeft: 20,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const {
        dataTree,
    } = props;

    function recursiveRender(lists, parent) {
        return lists.map((node) => (
            <StyledTreeItem
                nodeId={node.value}
                key={node.value}
                aria-expanded="true"
                label={(
                    <Item
                        {...props}
                        parent={parent || {}}
                        node={node}
                        label={node.label}
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
                disableSelection
            >
                {recursiveRender(dataTree)}
            </TreeView>
        </div>
    );
}
