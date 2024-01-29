/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import clsx from 'clsx';
import Table from '@common_table';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Paper from '@material-ui/core/Paper';
import clitoolsGqlService from '@modules/clitools/services/graphql';
import Header from '@modules/clitools/pages/list/components/Header';
import useStyles from '@modules/clitools/pages/list/components/style';

const clitoolsListContent = (props) => {
    const {
        data,
        loading,
        getQueueList,
        formik,
        dataOptions,
        t,
    } = props;
    const queueList = (data && data.getQueueList && data.getQueueList.items) || [];
    const queueTotal = (data && data.getQueueList && data.getQueueList.total_count) || 0;
    const classes = useStyles();
    const [getIcubeCommandLineList, getIcubeCommandLineListRes] = clitoolsGqlService.getIcubeCommandLineList();

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'DESC' },
        { field: 'title', headerName: t('tools:Title'), sortable: true },
        { field: 'status', headerName: t('tools:Status'), sortable: true, hideable: true },
        { field: 'created_at', headerName: t('tools:Created_At'), sortable: true, hideable: true },
        { field: 'execute_at', headerName: t('tools:Execute_At'), sortable: true, hideable: true },
        { field: 'finish_at', headerName: t('tools:Finished_At'), sortable: true, hideable: true },
        { field: 'command', headerName: t('tools:Command'), sortable: true, hideable: true },
    ];

    const rows = queueList.map((queue) => ({
        ...queue,
        id: queue.id,
        status: <span style={{ textTransform: 'capitalize' }}>{queue.status}</span>,
    }));

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: t('tools:ID_from'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('tools:ID_to'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('tools:Created_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('tools:Created_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
            field: 'execute_at',
            name: 'execute_at_from',
            type: 'from',
            label: t('tools:Execute_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
            field: 'execute_at',
            name: 'execute_at_to',
            type: 'to',
            label: t('tools:Execute_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
            field: 'finish_at',
            name: 'finish_at_from',
            type: 'from',
            label: t('tools:Finished_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
            field: 'finish_at',
            name: 'finish_at_to',
            type: 'to',
            label: t('tools:Finished_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
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
        { field: 'title', name: 'title', type: 'like', label: t('tools:Title'), initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: t('tools:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = dataOptions.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        { field: 'command', name: 'command', type: 'like', label: t('tools:Command'), initialValue: '' },
    ];

    return (
        <>
            <Header t={t} />
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>{t('tools:Manually_Run_Command')}</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>{t('tools:Command_Name')}</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.id}
                            onChange={(e) => formik.setFieldValue('id', e)}
                            loading={getIcubeCommandLineListRes.loading}
                            options={
                                getIcubeCommandLineListRes
                                && getIcubeCommandLineListRes.data
                                && getIcubeCommandLineListRes.data.getIcubeCommandLineList
                            }
                            getOptions={getIcubeCommandLineList}
                            primaryKey="entity_id"
                            labelKey="title"
                            error={!!(formik.touched.id && formik.errors.id)}
                            helperText={(formik.touched.id && formik.errors.id) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>{t('tools:Additional_Command')}</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="additional"
                            value={formik.values.additional}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.additional && formik.errors.additional)}
                            helperText={(formik.touched.additional && formik.errors.additional) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('tools:Add_Command')}
                    </Button>
                </div>
            </Paper>
            <Table
                rows={rows}
                getRows={getQueueList}
                loading={loading}
                columns={columns}
                count={queueTotal}
                filters={filters}
                hideActions
            />
        </>
    );
};

export default clitoolsListContent;
