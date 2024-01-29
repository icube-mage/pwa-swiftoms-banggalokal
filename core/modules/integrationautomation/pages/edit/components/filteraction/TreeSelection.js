/* eslint-disable no-nested-ternary */
import React from 'react';
import clsx from 'clsx';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Skeleton from '@material-ui/lab/Skeleton';

import TextField from '@common_textfield';
import useStyles from '@modules/integrationautomation/pages/edit/components/filteraction/style';

export default function CustomizedTreeView(props) {
    const {
        formik, getEventConditions, getEventConditionsRes,
    } = props;
    const classes = useStyles();

    const [editKey, setEditKey] = React.useState('');
    const [addKey, setAddKey] = React.useState('');
    const [operatorKey, setOperatorKey] = React.useState('');
    const [aggregatorKey, setAggregatorKey] = React.useState('');
    const [valueKey, setValueKey] = React.useState('');

    const dataConditions = getEventConditionsRes.data?.getEventConditions;
    const conditionChoice = dataConditions?.conditions || [];
    const operatorChoice = dataConditions?.operator_option || [];
    const aggregatorChoice = dataConditions?.aggregator_option || [];
    const valueChoice = dataConditions?.value_option || [];

    function resetKey() {
        setAddKey('');
        setEditKey('');
        setOperatorKey('');
        setValueKey(' ');
        setAggregatorKey(' ');
    }

    function handleClick(mode = 'add', key) {
        resetKey();
        // if (!(addKey || editKey || operatorKey || valueKey || aggregatorKey)) {
        if (key === '0') {
            getEventConditions({
                variables: {
                    event_id: Number(formik.values.events?.event_id),
                    value: formik.values.conditions[0].type,
                    attribute_code: formik.values.conditions[0].value || '',
                },
            });
        } else {
            const keySplit = String(key).split('_');
            let conditionsTemp = formik.values.conditions[0];
            // eslint-disable-next-line no-return-assign
            keySplit.forEach((split) => {
                conditionsTemp = conditionsTemp.conditions[split - 1];
            });
            getEventConditions({
                variables: {
                    event_id: Number(formik.values.events?.event_id),
                    value: conditionsTemp?.value || '',
                    attribute_code: conditionsTemp?.attribute_code || '',
                },
            });
        }
        if (mode === 'add') {
            setAddKey(key);
        } else if (mode === 'edit') {
            setEditKey(key);
        } else if (mode === 'value_choice') {
            setValueKey(key);
        } else if (mode === 'aggregator') {
            setAggregatorKey(key);
        } else {
            setOperatorKey(key);
        }
        // }
    }

    function handleDelete(key) {
        const keySplit = key.split('_');
        const temp = [...formik.values.conditions];
        if (keySplit.length > 1) {
            let obj = { ...temp[0] };
            keySplit.forEach((split, i) => {
                if (i === keySplit.length - 1) {
                    obj.conditions.splice(Number(split) - 1, 1);
                } else {
                    obj = obj.conditions?.[Number(split) - 1];
                }
            });
        } else {
            temp[0].conditions.splice(Number(key) - 1, 1);
        }
        formik.setFieldValue('conditions', temp);
    }

    function findNestedObj(entireObj, keyToFind, valToFind) {
        let foundObj;
        JSON.stringify(entireObj, (_, nestedValue) => {
            if (nestedValue && nestedValue[keyToFind] === valToFind) {
                foundObj = nestedValue;
            }
            return nestedValue;
        });
        return foundObj;
    }

    async function onChangeChoice(e, key) {
        const value = findNestedObj(conditionChoice, 'label', e.target.value);
        const newOpt = await getEventConditions({
            variables: {
                event_id: Number(formik.values.events?.event_id),
                value: value?.value || '',
                attribute_code: value?.attribute_code || '',
            },
        });

        if (key !== '0' && key !== 0) {
            const keySplit = String(key).split('_');
            let name = '';
            let conditionsTemp = formik.values.conditions[0];
            // eslint-disable-next-line no-return-assign
            keySplit.forEach((split) => {
                name = `${name}.conditions[${Number(split - 1)}]`;
                conditionsTemp = conditionsTemp.conditions[split - 1];
            });
            const res = {
                ...value,
                conditions: [],
                value_input: '',
                aggregator: newOpt.data?.getEventConditions?.aggregator_option?.[0] || '',
                operator: newOpt.data?.getEventConditions?.operator_option?.[0] || '',
                value_element_type: newOpt.data?.getEventConditions?.value_element_type,
            };
            if (value.has_child) {
                res.value_choice = newOpt.data?.getEventConditions?.value_option?.[0] || '';
            } else if (newOpt.data?.getEventConditions?.value_element_type === 'multiselect') {
                res.value_input = [newOpt.data?.getEventConditions?.value_option?.[0]] || [];
            } else {
                res.value_input = newOpt.data?.getEventConditions?.value_option?.[0] || '';
            }
            formik.setFieldValue(`conditions[0]${name}.conditions`, [...conditionsTemp.conditions, res]);
        } else {
            const temp = [...formik.values.conditions];
            const res = {
                ...value,
                conditions: [],
                value_input: '',
                aggregator: newOpt.data?.getEventConditions?.aggregator_option?.[0] || '',
                operator: newOpt.data?.getEventConditions?.operator_option?.[0] || '',
                value_element_type: newOpt.data?.getEventConditions?.value_element_type,
            };
            if (value.has_child) {
                res.value_choice = newOpt.data?.getEventConditions?.value_option?.[0] || '';
            } else if (newOpt.data?.getEventConditions?.value_element_type === 'multiselect') {
                res.value_input = [newOpt.data?.getEventConditions?.value_option?.[0]] || [];
            } else {
                res.value_input = newOpt.data?.getEventConditions?.value_option?.[0] || '';
            }
            temp[0].conditions.push(res);
        }

        resetKey();
    }

    function onChangeInput(e, key, insertKey, type) {
        let value = findNestedObj(conditionChoice, 'label', e.target.value);
        if (insertKey === 'operator') {
            value = findNestedObj(operatorChoice, 'value', e.target.value);
        }
        if (insertKey === 'value_choice' || insertKey === 'value_input') {
            if (type === 'multiselect') {
                const { options } = e.target;
                const valMultiple = [];
                for (let i = 0, l = options.length; i < l; i += 1) {
                    if (options[i].selected) {
                        valMultiple.push(findNestedObj(valueChoice, 'value', options[i].value));
                    }
                }
                value = valMultiple;
            } else {
                value = findNestedObj(valueChoice, 'value', e.target.value);
            }
        }
        if (insertKey === 'aggregator') {
            value = findNestedObj(aggregatorChoice, 'value', e.target.value);
        }
        if (key !== '0' && key !== 0) {
            const keySplit = String(key).split('_');
            let nameForm = '';
            let conditionsTemp = formik.values.conditions[0];
            // eslint-disable-next-line no-return-assign
            keySplit.forEach((split) => {
                nameForm = `${nameForm}.conditions[${Number(split - 1)}]`;
                conditionsTemp = conditionsTemp.conditions[split - 1];
            });
            formik.setFieldValue(`conditions[0]${nameForm}.${insertKey}`, value);
        } else {
            formik.setFieldValue(`conditions[0].${insertKey}`, value);
        }
        resetKey();
    }

    const renderAddChoice = (key) => {
        if (addKey !== key) {
            return (
                <div className={classes.field}>
                    <AddCircleIcon className="add" onClick={() => handleClick('add', key)} />
                </div>
            );
        }

        return (getEventConditionsRes.loading ? <Skeleton width={100} />
            : (
                <FormControl variant="outlined">
                    <Select
                        native
                        className={classes.select}
                        classes={{ root: classes.root }}
                        onBlur={() => setAddKey('')}
                        onChange={(e) => onChangeChoice(e, key)}
                    >
                        {conditionChoice?.map((choice) => (
                            choice.children !== null
                                ? (
                                    <optgroup key={choice.label} label={choice.label}>
                                        {choice.children?.map((child) => (
                                            <option key={child.label} value={child.label}>{child.label}</option>
                                        ))}
                                    </optgroup>
                                )
                                : <option key={choice.label} value={choice.label}>{choice.label}</option>
                        ))}
                    </Select>
                </FormControl>
            )
        );
    };

    const renderInput = (name = '', key, cond) => {
        const elementType = dataConditions?.value_element_type;
        if (elementType === 'text' && !valueChoice?.length) {
            return (
                <TextField
                    variant="outlined"
                    name={name}
                    value={cond.value_input}
                    onChange={formik.handleChange}
                    className={classes.fieldRootTree}
                    InputProps={{
                        className: classes.fieldInputTree,
                    }}
                    onBlur={() => setEditKey('')}
                    autoFocus
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            setEditKey('');
                        }
                    }}
                />
            );
        }
        if (elementType === 'date' && !valueChoice?.length) {
            return (
                <TextField
                    type="date"
                    variant="outlined"
                    name={name}
                    value={cond.value_input}
                    onChange={formik.handleChange}
                    className={classes.fieldRootTree}
                    InputProps={{
                        className: classes.fieldInputTree,
                    }}
                    onBlur={() => setEditKey('')}
                    autoFocus
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            setEditKey('');
                        }
                    }}
                />
            );
        }
        if (elementType === 'multiselect' && Array.isArray(cond?.value_input)) {
            return (
                <FormControl variant="outlined">
                    <Select
                        native
                        multiple
                        className={classes.selectMultiple}
                        classes={{ root: classes.root }}
                        value={cond?.value_input?.map((input) => input?.value) || []}
                        onBlur={() => setEditKey('')}
                        onChange={(e) => onChangeInput(e, key, 'value_input', elementType)}
                        onKeyDown={(ev) => {
                            if (ev.key === 'Enter') {
                                setEditKey('');
                            }
                        }}
                        autoFocus
                    >
                        {valueChoice?.map((choice) => (
                            choice.children?.length
                                ? (
                                    <optgroup key={choice.value} label={choice.label}>
                                        {choice.children?.map((child) => (
                                            <option key={child.value} value={child.value}>{child.label}</option>
                                        ))}
                                    </optgroup>
                                )
                                : (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                )
                        ))}
                    </Select>
                </FormControl>
            );
        }

        return (
            <FormControl variant="outlined">
                <Select
                    native
                    className={classes.select}
                    classes={{ root: classes.root }}
                    value={cond.value_input?.value}
                    onBlur={() => setEditKey('')}
                    onChange={(e) => onChangeInput(e, key, 'value_input', elementType)}
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            setEditKey('');
                        }
                    }}
                    autoFocus
                >
                    {valueChoice?.map((choice) => (
                        choice.children?.length
                            ? (
                                <optgroup key={choice.value} label={choice.label}>
                                    {choice.children?.map((child) => (
                                        <option key={child.value} value={child.value}>{child.label}</option>
                                    ))}
                                </optgroup>
                            )
                            : (
                                <option key={choice.value} value={choice.value}>
                                    {choice.label}
                                </option>
                            )
                    ))}
                </Select>
            </FormControl>
        );
    };

    const renderOperatorAggregator = (cond, key, input = 'operator') => {
        let compareKey = operatorKey;
        let onBlur = () => setOperatorKey('');
        let options = operatorChoice;

        if (input === 'aggregator') {
            options = aggregatorChoice;
            compareKey = aggregatorKey;
            onBlur = () => setAggregatorKey('');
        }
        if (input === 'value_choice') {
            options = valueChoice;
            compareKey = valueKey;
            onBlur = () => setValueKey('');
        }
        return (
            compareKey !== key ? (
                <div
                    className="bold"
                    aria-hidden="true"
                    onClick={() => handleClick(input, key)}
                >
                    {(cond[input]?.label) || '...'}
                </div>
            )
                : getEventConditionsRes.loading ? <Skeleton width={100} />
                    : (
                        <FormControl variant="outlined">
                            <Select
                                native
                                className={classes.select}
                                classes={{ root: classes.root }}
                                value={cond[input]?.value}
                                onBlur={onBlur}
                                onChange={(e) => onChangeInput(e, key, input)}
                            >
                                {options?.map((choice) => (
                                    choice.children?.length
                                        ? (
                                            <optgroup key={choice.value} label={choice.label}>
                                                {choice.children?.map((child) => (
                                                    <option key={child.value} value={child.value}>{child.label}</option>
                                                ))}
                                            </optgroup>
                                        )
                                        : (
                                            <option key={choice.value} value={choice.value}>
                                                {choice.label}
                                            </option>
                                        )
                                ))}
                            </Select>
                        </FormControl>
                    )
        );
    };

    const renderParent = (cond, key) => {
        if (cond?.value?.includes('Found')) {
            return (
                <div className={classes.field}>
                    If an item is
                    {' '}
                    {renderOperatorAggregator(cond, key, 'value_choice')}
                    {' '}
                    with
                    {' '}
                    {renderOperatorAggregator(cond, key, 'aggregator')}
                    {' '}
                    of these conditions are true
                    <CancelIcon onClick={() => handleDelete(`${key}`)} className="delete" />
                </div>
            );
        } if (cond?.value?.includes('Subselect')) {
            const keySplit = String(key).split('_');
            let name = '';
            // eslint-disable-next-line no-return-assign
            keySplit.forEach((split) => (
                name = `${name}.conditions[${Number(split) - 1}]`
            ));
            return (
                <div className={classes.field}>
                    If
                    {' '}
                    {' '}
                    {renderOperatorAggregator(cond, key, 'operator')}
                    {' '}
                    {editKey !== key ? (
                        <div
                            className="bold-2"
                            aria-hidden="true"
                            onClick={() => handleClick('edit', key)}
                        >
                            {cond.value_input?.label || cond.value_input || '...'}
                        </div>
                    )
                        : getEventConditionsRes.loading ? <Skeleton width={100} />
                            : (
                                <TextField
                                    variant="outlined"
                                    name={`conditions[0]${name}.value_input`}
                                    value={cond.value_input}
                                    onChange={formik.handleChange}
                                    className={classes.fieldRootTree}
                                    InputProps={{
                                        className: classes.fieldInputTree,
                                    }}
                                    onBlur={() => setEditKey('')}
                                    autoFocus
                                />
                            )}
                    {' '}
                    {' '}
                    for a subselection of items matching
                    {' '}
                    {renderOperatorAggregator(cond, key, 'aggregator')}
                    {' '}
                    of these conditions
                    <CancelIcon onClick={() => handleDelete(`${key}`)} className="delete" />
                </div>
            );
        } if (cond?.value?.includes('Combine')) {
            return (
                <div className={classes.field}>
                    If
                    {' '}
                    {renderOperatorAggregator(cond, key, 'aggregator')}
                    {' '}
                    of these conditions are
                    {' '}
                    {renderOperatorAggregator(cond, key, 'value_choice')}
                    {key !== '0' && key !== 0
                        && <CancelIcon onClick={() => handleDelete(`${key}`)} className="delete" />}
                </div>
            );
        }
        return <div />;
    };

    const renderCondition = (cond, key) => {
        const keySplit = String(key).split('_');
        let name = '';
        // eslint-disable-next-line no-return-assign
        keySplit.forEach((split) => (
            name = `${name}.conditions[${Number(split) - 1}]`
        ));

        return (
            <div key={key}>
                {(cond.has_child === false || cond.has_child === null)
                    ? (
                        <div className={clsx(classes.field, (cond.value_element_type !== 'multiselect'
                            || (cond.value_element_type === 'multiselect' && operatorKey === key)) && 'alignCenter')}
                        >
                            <span>{cond.label}</span>
                            <span>{' '}</span>
                            <span>{renderOperatorAggregator(cond, key)}</span>
                            {cond.operator?.value !== '<=>'
                                && (
                                    <span>
                                        {' '}
                                        {editKey !== key ? (
                                            <span
                                                className="bold-2"
                                                aria-hidden="true"
                                                onClick={() => handleClick('edit', key)}
                                            >
                                                {typeof cond.value_input === 'object'
                                                    ? Array.isArray(cond.value_input)
                                                        ? cond?.value_input?.map(({ label }) => (label === ' ' ? 'undefined' : label))
                                                            ?.join(', ')
                                                        : cond.value_input?.value
                                                            ? cond.value_input?.label
                                                            : cond.value_input?.label === ' ' ? 'undefined' : '...'
                                                    : String(cond.value_input) || '...'}
                                            </span>
                                        )
                                            : getEventConditionsRes.loading ? <Skeleton width={100} />
                                                : (renderInput(`conditions[0]${name}.value_input`, key, cond))}
                                        {' '}
                                    </span>
                                )}
                            <span>
                                <CancelIcon onClick={() => handleDelete(`${key}`)} className="delete" />
                            </span>
                        </div>
                    )
                    : (
                        renderParent(cond, key)
                    )}
                {cond.has_child && (
                    <div className={classes.group}>
                        {cond?.conditions?.map((condItem, ii) => (
                            renderCondition(condItem, `${key}_${ii + 1}`)
                        ))}
                        {renderAddChoice(`${key}`)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={classes.container}>
            {renderParent(formik.values.conditions?.[0], '0')}
            <div className={classes.group}>
                {formik.values.conditions?.[0]?.conditions?.map((condition, index) => (
                    renderCondition(condition, Number(index) + 1)
                ))}
                {renderAddChoice('0')}
            </div>
        </div>
    );
}
