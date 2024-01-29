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
import SearchIcon from '@material-ui/icons/Search';
import FormHelperText from '@material-ui/core/FormHelperText';

import TaxRateModal from '@modules/configurationtaxrules/pages/create/components/TaxRateModal';

const GeneralConfigurationContent = (props) => {
    const {
        formik,
        name = '',
        options = [],
        loading,
        setSearch = () => { },
        error,
        helperText = '',
        getTaxRateListRes,
        deleteTaxRate,
        t,
    } = props;
    const classes = useStyles();

    const [addModal, setAddModal] = React.useState(false);
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

    const handleDelete = () => {
        setOpenConfirmDialog(false);
        window.backdropLoader(true);
        deleteTaxRate({
            variables: {
                id: deletedId,
            },
        }).then(() => {
            window.backdropLoader(false);
            setDeletedId(null);
            getTaxRateListRes.refetch();
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
            <TaxRateModal
                open={addModal}
                handleClose={() => { setEdited(null); setAddModal(false); }}
                handleOpen={() => setAddModal(true)}
                data={edited}
                refetch={getTaxRateListRes.refetch}
                t={t}
            />
            <ConfirmDialog
                open={openConfirmDialog}
                onCancel={() => {
                    setDeletedId(null);
                    setOpenConfirmDialog(false);
                }}
                onConfirm={handleDelete}
                title={t('taxrulesconfiguration:Confirmation')}
                message={t('taxrulesconfiguration:Do_you_really_want_to_delete_this_tax_rate')}
            />
            <div className={classes.divField} style={{ border: `1px solid ${error ? 'red' : 'rgba(0, 0, 0, 0.23)'}` }}>
                <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.23)', padding: '10px 0' }}>
                    <div style={{ padding: '0 10px' }}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            onChange={(e) => setSearch(e && e.target && e.target.value)}
                            fullWidth
                            InputProps={{
                                className: classes.fieldInput,
                                endAdornment: (
                                    <SearchIcon className="search" />
                                ),
                            }}
                        />
                    </div>
                    <span style={{ padding: '0 10px' }}>
                        {formik.values[name].length}
                        {' '}
                        selected
                    </span>
                </div>
                {loading ? (
                    <div className={classes.centerDiv}>
                        <CircularProgress className={classes.progress} />
                    </div>
                )
                    : (
                        <List className={classes.root}>
                            {options?.map((opt) => (
                                <ListItem
                                    className={clsx(classes.listItem, formik.values[name].includes(opt.id) && 'selected')}
                                    key={opt.id}
                                    button
                                    onClick={() => edited === opt.id ? null : handleSelect(opt.id)}
                                >
                                    <CheckIcon className={clsx(classes.check, formik.values[name].includes(opt.id) && 'selected')} />

                                    <ListItemText id={opt.id} primary={`${opt.code}`} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => {
                                                setEdited(opt);
                                                setTimeout(() => { setAddModal(true); }, 50);
                                            }}
                                        >
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
                <Button
                    onClick={() => setAddModal(true)}
                    variant="contained"
                    buttonType="primary-rounded"
                >
                    {t('taxrulesconfiguration:Add_New_Tax_Rate')}
                </Button>
            </div>
        </div>
    );
};

export default GeneralConfigurationContent;
