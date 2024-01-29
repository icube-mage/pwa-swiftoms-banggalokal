/* eslint-disable no-confusing-arrow */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
import React from 'react';
import useStyles from '@modules/configurationtaxrules/pages/create/components/style';
import clsx from 'clsx';

import TextField from '@common_textfield';
import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import Button from '@common_button';

import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import FormHelperText from '@material-ui/core/FormHelperText';

const GeneralConfigurationContent = (props) => {
    const {
        formik,
        name = '',
        options = [],
        loading,
        createTaxClass,
        updateTaxClass,
        deleteTaxClass,
        classType = 'PRODUCT',
        getCustomerTaxClassListRes,
        getProductTaxClassListRes,
        error,
        helperText = '',
        t,
    } = props;
    const classes = useStyles();

    const [addMode, setAddMode] = React.useState(false);
    const [addData, setAddData] = React.useState('');
    const [edited, setEdited] = React.useState(null);
    const [deletedId, setDeletedId] = React.useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const handleSelect = (e) => {
        if (formik.values[name].includes(e)) {
            formik.setFieldValue(name, formik.values[name].filter((select) => select !== e));
        } else {
            formik.setFieldValue(name, [...formik.values[name], e]);
        }
    };

    const handleAdd = () => {
        window.backdropLoader(true);
        createTaxClass({
            variables: {
                input: {
                    class_name: addData,
                    class_type: classType,
                },
            },
        }).then(() => {
            window.backdropLoader(false);
            setAddMode(false);
            setAddData('');
            if (classType === 'PRODUCT') {
                getProductTaxClassListRes.refetch();
            } else {
                getCustomerTaxClassListRes.refetch();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleEdit = () => {
        window.backdropLoader(true);
        updateTaxClass({
            variables: {
                id: edited.id,
                input: {
                    class_name: edited.class_name,
                    class_type: edited.class_type,
                },
            },
        }).then(() => {
            window.backdropLoader(false);
            setEdited(null);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDelete = () => {
        setOpenConfirmDialog(false);
        window.backdropLoader(true);
        deleteTaxClass({
            variables: {
                id: deletedId,
            },
        }).then(() => {
            window.backdropLoader(false);
            setDeletedId(null);
            if (classType === 'PRODUCT') {
                getProductTaxClassListRes.refetch();
            } else {
                getCustomerTaxClassListRes.refetch();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    return (
        <div>
            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => {
                    setDeletedId(null);
                    setOpenConfirmDialog(false);
                }}
                onConfirm={handleDelete}
                title={t('taxrulesconfiguration:Confirmation')}
                message={t('taxrulesconfiguration:Do_you_really_want_to_delete_this_tax_class')}
            />
            <div className={classes.divField} style={{ border: `1px solid ${error ? 'red' : 'rgba(0, 0, 0, 0.23)'}` }}>
                {loading ? (
                    <div className={classes.centerDiv}>
                        <CircularProgress className={classes.progress} />
                    </div>
                )
                    : (
                        <List className={classes.root}>
                            {options?.map((opt) => (
                                edited && edited.id === opt.id
                                    ? (
                                        <>
                                            <TextField
                                                autoFocus
                                                value={edited?.class_name}
                                                onChange={(e) => {
                                                    setEdited({ ...edited, class_name: e.target.value });
                                                }}
                                                fullWidth
                                                InputProps={{
                                                    className: classes.fieldInputEdit,
                                                    startAdornment: (
                                                        <CheckIcon className={classes.check} />
                                                    ),
                                                    endAdornment: (
                                                        <>
                                                            <IconButton
                                                                edge="end"
                                                                onClick={handleEdit}
                                                            >
                                                                <CheckIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => setEdited(null)}>
                                                                <BlockIcon />
                                                            </IconButton>
                                                        </>
                                                    ),
                                                }}
                                            />
                                        </>
                                    )
                                    : (
                                        <ListItem
                                            className={clsx(classes.listItem, formik.values[name].includes(opt.id) && 'selected')}
                                            key={opt.id}
                                            button
                                            onClick={() => edited === opt.id ? null : handleSelect(opt.id)}
                                        >
                                            <CheckIcon className={clsx(classes.check, formik.values[name].includes(opt.id) && 'selected')} />

                                            <ListItemText id={opt.id} primary={`${opt.class_name}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={() => setEdited(opt)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => {
                                                        setDeletedId(opt.id);
                                                        setOpenConfirmDialog(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                            ))}
                        </List>
                    )}
            </div>
            {error && helperText
                ? (
                    <FormHelperText className={classes.error}>
                        {helperText}
                    </FormHelperText>
                )
                : null}
            <div style={{ marginTop: 10, marginBottom: 20 }}>
                {addMode ? (
                    <TextField
                        autoFocus
                        value={edited?.class_name}
                        onChange={(e) => {
                            setAddData(e.target.value);
                        }}
                        fullWidth
                        InputProps={{
                            className: classes.fieldInputEdit,
                            startAdornment: (
                                <CheckIcon className={classes.check} />
                            ),
                            endAdornment: (
                                <>
                                    <IconButton
                                        edge="end"
                                        onClick={handleAdd}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={() => setAddMode(false)}>
                                        <BlockIcon />
                                    </IconButton>
                                </>
                            ),
                        }}
                    />
                )
                    : (
                        <Button
                            onClick={() => setAddMode(true)}
                            variant="contained"
                            buttonType="primary-rounded"
                        >
                            {t('taxrulesconfiguration:Add_New_Tax_Class')}
                        </Button>
                    )}
            </div>
        </div>
    );
};

export default GeneralConfigurationContent;
