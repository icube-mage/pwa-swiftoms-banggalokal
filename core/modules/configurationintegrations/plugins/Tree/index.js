/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { GRAY_LIGHT } from '@theme_color';
import useStyles from '@modules/configurationintegrations/plugins/Tree/style';

function ExpandIcon() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ChevronRightIcon />
        </div>
    );
}

function ExpandedIcon() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ExpandMoreIcon />
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

function findObj(entireObj, keyToFind, valToFind) {
    let foundObj;
    entireObj.forEach((obj) => {
        JSON.stringify(obj, (_, nestedValue) => {
            if (nestedValue && nestedValue[keyToFind] === valToFind) {
                foundObj = obj;
            }
            return nestedValue;
        });
    });
    return foundObj;
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
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomizedTreeView(props) {
    const classes = useStyles();
    const {
        dataTree, formik, name, allIdTree,
    } = props;
    const [open, setOpen] = useState([]);

    const onChange = (e, node, parent, grandParent, greatGrandParent) => {
        if (formik.values.all_resources === 'true') {
            formik.setFieldValue('all_resources', 'false');
        }

        const obj = findObj(dataTree, 'id', node.id);
        const isChecked = e.target.checked;
        let temp = [...formik.values[name]];

        if (node.children?.length) {
            let checkedVal = [node.id, ...node.children.map((child) => child.id)];
            node.children.forEach((child1) => {
                if (child1.children?.length) {
                    checkedVal = [...checkedVal, ...child1.children.map((child2) => child2.id)];
                    child1.children.forEach((child2) => {
                        if (child2.children?.length) {
                            checkedVal = [...checkedVal, ...child2.children.map((child3) => child3.id)];
                        }
                    });
                }
            });
            if (isChecked) {
                temp = [...new Set([...temp, ...checkedVal])];
            } else {
                temp = temp.filter((id) => !checkedVal.includes(id));
            }
        } else if (isChecked) {
            temp = [...temp, node.id];
        } else {
            temp = temp.filter((n) => n !== node.id);
        }

        function recursiveInsert(parentObj) {
            if (parentObj?.id) {
                temp = [...new Set([...temp, parentObj.id])];
                if (parentObj?.children) {
                    recursiveInsert(findObj(parentObj?.children, 'id', node.id));
                }
            }
        }

        if (parent?.id) {
            if (!parent.children.some(({ id }) => temp.includes(id))) {
                temp = temp.filter((id) => id !== parent.id);
            }
        }

        if (grandParent?.id) {
            if (!grandParent.children.some(({ id }) => temp.includes(id))) {
                temp = temp.filter((id) => id !== grandParent.id);
            }
        }

        if (greatGrandParent?.id) {
            if (!greatGrandParent.children.some(({ id }) => temp.includes(id))) {
                temp = temp.filter((id) => id !== greatGrandParent.id);
            }
        }

        if (obj?.id) {
            if (isChecked) {
                recursiveInsert(obj);
            }
        }

        formik.setFieldValue(name, temp);

        if (temp.length === allIdTree.length) {
            formik.setFieldValue('all_resources', 'true');
        }
    };

    const isIndeterminate = (node) => (
        (node?.children?.some((child1) => formik.values[name].includes(child1.id)
            || child1?.children?.some((child2) => formik.values[name].includes(child2.id)
                || child2?.children?.some((child3) => formik.values[name].includes(child3.id)))))
        && !(node?.children?.length && node?.children?.every((child1) => {
            if (child1?.children?.length) {
                return (formik.values[name].includes(child1.id)
                    && child1?.children?.length && child1?.children?.every((child2) => {
                        if (child2?.children?.length) {
                            return (formik.values[name].includes(child2.id)
                                && child2?.children?.length && child2?.children?.every((child3) => formik.values[name].includes(child3.id)));
                        }
                        return formik.values[name].includes(child2.id);
                    }));
            }
            return formik.values[name].includes(child1.id);
        }))
    );

    const Item = (childProps) => {
        const {
            label, node, parent, grandParent, greatGrandParent,
        } = childProps;

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {isIndeterminate(node)
                    ? (
                        <Checkbox
                            className={clsx(classes.checkbox, isIndeterminate(node) && 'primary')}
                            indeterminate={isIndeterminate(node)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => onChange(e, node, parent, grandParent, greatGrandParent)}
                        />
                    )
                    : (
                        <Checkbox
                            className={clsx(classes.checkbox)}
                            checked={formik.values[name].includes(node.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => onChange(e, node, parent, grandParent, greatGrandParent)}
                        />
                    )}
                <div className={classes.label}>
                    {label}
                </div>
            </div>
        );
    };

    function recursiveRender(lists, parent, grandParent, greatGrandParent) {
        return lists.map((node) => (
            <StyledTreeItem
                nodeId={node.id}
                key={node.id}
                aria-expanded="true"
                label={(
                    <Item
                        node={node}
                        label={node.title}
                        parent={parent}
                        grandParent={grandParent}
                        greatGrandParent={greatGrandParent}
                    />
                )}
            >
                {!!node.children?.length && recursiveRender(node.children, node, parent, grandParent)}
            </StyledTreeItem>
        ));
    }

    return (
        <Grid container spacing={2}>
            {dataTree?.map((node) => (
                <Grid item xs={12} sm={6} key={node.id}>
                    <div className={classes.apiDiv}>
                        <div
                            className={clsx(classes.apiHead, !!node.children?.length && 'cursor')}
                            onClick={() => (node.children?.length ? open.includes(node.id)
                                ? setOpen((prev) => prev.filter((o) => o !== node.id))
                                : setOpen((prev) => [...prev, node.id]) : null)}
                            aria-hidden="true"
                        >
                            <Item
                                node={node}
                                label={node.title}
                            />
                            {node.children?.length
                                ? open.includes(node.id) ? <ExpandLessIcon className={classes.arrow} /> : <ExpandMoreIcon className={classes.arrow} />
                                : null}
                        </div>
                        {!!node.children?.length
                            && (
                                <Collapse in={open.includes(node.id)} timeout={100} unmountOnExit>
                                    <div className={classes.checkboxDiv}>
                                        <div className={classes.container}>
                                            <TreeView
                                                className={classes.root}
                                                defaultCollapseIcon={<ExpandedIcon />}
                                                defaultExpandIcon={<ExpandIcon />}
                                                disableSelection
                                            >
                                                {recursiveRender(node.children, node)}
                                            </TreeView>
                                        </div>
                                    </div>
                                </Collapse>
                            )}
                    </div>
                </Grid>
            ))}
        </Grid>

    );
}
