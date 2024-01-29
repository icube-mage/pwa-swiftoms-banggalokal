/* eslint-disable object-curly-newline */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import gqlService from '@modules/integrationautomation/services/graphql';
import Table from '@modules/integrationautomation/pages/edit/components/log/Table';
import Action from '@modules/integrationautomation/pages/edit/components/log/Action';
import useStyles from '@modules/integrationautomation/pages/edit/components/log/style';

const LogContent = (props) => {
    const {
        t,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    const actions = [
        {
            label: t('integrationautomation:View_Payload'),
            link: (log_id) => `/integration/automation/edit/${router.query?.id}/log/payload/${log_id}`,
        },
        {
            label: t('integrationautomation:View_Action_Details'),
            link: (log_id) => `/integration/automation/edit/${router.query?.id}/log/action/${log_id}`,
        },
    ];

    const [getAutomationLogList, { data, loading }] = gqlService.getAutomationLogList();
    const dataList = (data && data.getAutomationLogList && data.getAutomationLogList.items) || [];
    const dataTotal = (data && data.getAutomationLogList && data.getAutomationLogList.total_count) || 0;

    const columns = [
        { field: 'created_at', headerName: t('integrationautomation:Date_Time'), sortable: true, initialSort: 'DESC' },
        { field: 'event', headerName: t('integrationautomation:Event') },
        { field: 'result', headerName: t('integrationautomation:Result'), sortable: true },
        { field: 'result_message', headerName: t('integrationautomation:Result_Message') },
        { field: 'triggered_by', headerName: t('integrationautomation:Executed_By') },
        { field: 'action', headerName: t('integrationautomation:Action') },
    ];

    const rows = dataList.map((row) => ({
        ...row,
        id: row.log_id,
        result: <div className={clsx(classes.status, row.result)}>{row.result}</div>,
        result_message: row.result_message?.length > 300 ? (
            <div>
                {row.result_message?.slice(0, 300)}
                {' '}
                <span className="click">
                    <Link href={`/integration/automation/edit/${router.query?.id}/log/result_message/${row.log_id}`} passHref>
                        <a target="_blank" className="link-button">{t('integrationautomation:see_more')}</a>
                    </Link>
                </span>
            </div>
        ) : row.result_message,
        action: <Action actions={actions} row={row} />,
    }));

    const filters = [
        { field: 'automation_id', name: 'automation_id', type: 'eq', label: '', initialValue: String(router.query.id), hidden: true },
    ];

    return (
        <div className={classes.content}>
            <div className={classes.divider} />
            <Table
                columns={columns}
                getRows={getAutomationLogList}
                rows={rows}
                loading={loading}
                count={dataTotal}
                searchPlaceholder={t('integrationautomation:Search_Event_or_Result')}
                t={t}
                filters={filters}
            />
        </div>
    );
};

export default LogContent;
