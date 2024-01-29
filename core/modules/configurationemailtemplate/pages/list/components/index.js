/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/configurationemailtemplate/pages/list/components/Header';
import useStyles from '@modules/configurationemailtemplate/pages/list/components/style';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';

const EmailTemplateListContent = (props) => {
    const { data, loading, getEmailTemplateList, deleteEmailTemplate, t } = props;
    const classes = useStyles();

    const dataList = (data && data.getEmailTemplateList && data.getEmailTemplateList.items) || [];
    const dataTotal = (data && data.getEmailTemplateList && data.getEmailTemplateList.total_count) || 0;

    const columns = [
        { field: 'template_id', headerName: t('emailtemplatesconfiguration:ID'), hideable: false, sortable: true, initialSort: 'ASC' },
        { field: 'template_code', headerName: t('emailtemplatesconfiguration:Template'), hideable: true, sortable: true },
        { field: 'added_at', headerName: t('emailtemplatesconfiguration:Added'), hideable: true, sortable: true },
        { field: 'modified_at', headerName: t('emailtemplatesconfiguration:Updated'), hideable: true, sortable: true },
        { field: 'template_subject', headerName: t('emailtemplatesconfiguration:Subject'), hideable: true, sortable: true },
        { field: 'template_type', headerName: t('emailtemplatesconfiguration:Template_Type'), hideable: true, sortable: true },
        { field: 'action', headerName: t('emailtemplatesconfiguration:Action') },
    ];

    const filters = [
        { field: 'template_id', name: 'template_id_from', type: 'from', label: t('emailtemplatesconfiguration:ID_From'), initialValue: '' },
        { field: 'template_id', name: 'template_id_to', type: 'to', label: t('emailtemplatesconfiguration:ID_To'), initialValue: '' },
        { field: 'template_code', name: 'template_code', type: 'like', label: t('emailtemplatesconfiguration:Template'), initialValue: '' },
        {
            field: 'added_at',
            name: 'added_at_from',
            type: 'from',
            label: t('emailtemplatesconfiguration:Added_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'added_at',
            name: 'added_at_to',
            type: 'to',
            label: t('emailtemplatesconfiguration:Added_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'modified_at',
            name: 'modified_at_from',
            type: 'from',
            label: t('emailtemplatesconfiguration:Updated_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        {
            field: 'modified_at',
            name: 'modified_at_to',
            type: 'to',
            label: t('emailtemplatesconfiguration:Updated_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInputFilter,
                    }}
                />
            ),
        },
        { field: 'template_subject', name: 'template_subject', type: 'like', label: t('emailtemplatesconfiguration:Subject'), initialValue: '' },
        {
            field: 'template_type',
            name: 'template_type',
            type: 'eq',
            label: t('emailtemplatesconfiguration:Template_Type'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const typeOptions = [{ label: 'Text', value: '1' }, { label: 'HTML', value: '2' }];
                const primaryKey = 'value';
                const labelKey = 'label';
                return (
                    <Autocomplete
                        value={typeOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={typeOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
    ];

    const rows = dataList.map((datum) => ({
        ...datum,
        id: datum.template_id,
        action: () => (
            <div>
                <Link href={`/configurations/emailtemplates/preview/${datum.template_id}`} target="_blank">
                    <a className="link-button" target="_blank">{t('emailtemplatesconfiguration:Preview')}</a>
                </Link>
                <span style={{ margin: '0 10px' }}>
                    |
                </span>
                <Link href={`/configurations/emailtemplates/edit/${datum.template_id}`}>
                    <a className="link-button">{t('emailtemplatesconfiguration:Edit')}</a>
                </Link>
            </div>
        ),
    }));

    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getEmailTemplateList}
                deleteRows={deleteEmailTemplate}
                loading={loading}
                columns={columns}
                count={dataTotal}
                showCheckbox
            />
        </>
    );
};

export default EmailTemplateListContent;
