/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Table from '@common_table';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/notification/helpers';
import useStyles from '@modules/notification/pages/list/components/style';
import Header from '@modules/notification/pages/list/components/Header';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const NotificationListContent = (props) => {
    const classes = useStyles();
    const {
        data,
        loading,
        getNotificationList,
        multiReadNotification,
        handleAllRead,
        t,
    } = props;
    const notificationList = (data && data.getNotificationList && data.getNotificationList.items) || [];
    const notificationTotal = (data && data.getNotificationList && data.getNotificationList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: t('notification:ID'), sortable: true },
        { field: 'created_at', headerName: t('notification:Created_At'), sortable: true, initialSort: 'DESC' },
        { field: 'entity_type', headerName: t('notification:Type'), sortable: true },
        { field: 'status', headerName: t('notification:Status'), sortable: true },
        { field: 'message', headerName: t('notification:Messages'), sortable: true },
        { field: 'attachment', headerName: t('notification:Attachment') },
    ];

    const filters = [
        { field: 'type', name: 'type', type: 'eq', label: '', class: 'fixed', initialValue: 'web', hidden: true },
        { field: 'id', name: 'id_from', type: 'from', label: t('notification:ID_From'), initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: t('notification:ID_To'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('notification:Created_At_From'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('notification:Created_At_To'),
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
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'entity_type', name: 'entity_type', type: 'like', label: t('notification:Type'), initialValue: '' },
        { field: 'message', name: 'message', type: 'like', label: t('notification:Messages'), initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'in',
            label: t('notification:Status'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    multiple
                    value={(filterValue || []).map((option) => optionsStatus.find((e) => e.name === option))}
                    onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.name))}
                    options={optionsStatus}
                />
            ),
        },
        {
            field: 'is_read',
            name: 'is_read',
            type: 'in',
            label: '',
            initialValue: [],
            component: ({ filterValue, setFilterValue }) => (
                <FormGroup>
                    <FormControlLabel
                        className={classes.controllable}
                        control={(
                            <Checkbox
                                checked={filterValue.includes('1')}
                                onChange={(e) => {
                                    const index = filterValue.indexOf('1');
                                    if (index !== -1 && !e.target.checked) {
                                        const temp = [...filterValue];
                                        temp.splice(index, 1);
                                        setFilterValue(temp);
                                    } else {
                                        const temp = [...filterValue];
                                        if (temp[0] !== '') {
                                            temp.push('1');
                                        } else {
                                            temp[0] = '1';
                                        }
                                        setFilterValue(temp);
                                    }
                                }}
                            />
                        )}
                        label={t('notification:Read')}
                    />
                    <FormControlLabel
                        className={classes.controllable}
                        control={(
                            <Checkbox
                                checked={filterValue.includes('0')}
                                onChange={(e) => {
                                    const index = filterValue.indexOf('0');
                                    if (index !== -1 && !e.target.checked) {
                                        const temp = [...filterValue];
                                        temp.splice(index, 1);
                                        setFilterValue(temp);
                                    } else {
                                        const temp = [...filterValue];
                                        if (temp[0] !== '') {
                                            temp.push('0');
                                        } else {
                                            temp[0] = '0';
                                        }
                                        setFilterValue(temp);
                                    }
                                }}
                            />
                        )}
                        label={t('notification:Unread')}
                    />
                </FormGroup>
            ),
        },
    ];

    const actions = [
        {
            label: t('notification:Mark_as_Read'),
            message: t('notification:Are_you_sure_you_want_to_continue'),
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id.props.children) };
                await multiReadNotification({ variables });
            },
        },
    ];

    const getBoldStyle = (isRead) => {
        if (isRead === 0) {
            return { fontWeight: 600 };
        }
        return null;
    };

    const rows = notificationList.map((notification) => ({
        ...notification,
        id: <span style={getBoldStyle(notification.is_read)}>{notification.id}</span>,
        created_at: <span style={getBoldStyle(notification.is_read)}>{notification.created_at}</span>,
        entity_type: <span style={getBoldStyle(notification.is_read)}>{notification.entity_type}</span>,
        status: <span style={getBoldStyle(notification.is_read)}>{notification.status}</span>,
        message: <span style={getBoldStyle(notification.is_read)}>{notification.message}</span>,
        attachment: notification.attachment ? (
            <a href={notification.attachment} style={{ color: '#BE1F93' }}>
                {t('notification:Download')}
            </a>
        ) : (
            '-'
        ),
    }));

    return (
        <>
            <Header handleAllRead={handleAllRead} t={t} />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getNotificationList}
                loading={loading}
                columns={columns}
                count={notificationTotal}
                showCheckbox
                hideColumns
                recordName="notification"
            />
        </>
    );
};

export default NotificationListContent;
