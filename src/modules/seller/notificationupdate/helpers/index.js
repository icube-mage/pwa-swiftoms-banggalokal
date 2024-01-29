/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const relativeTimeFrom = (date, t) => {
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        relativeTime: {
            future: `${t('common:in')} %s`,
            past: `%s ${t('common:ago')}`,
            s: `${t('common:a_few_seconds')}`,
            m: `${t('common:a_minute')}`,
            mm: `%d ${t('common:minutes')}`,
            h: `${t('common:an_hour')}`,
            hh: `%d ${t('common:hours')}`,
            d: `${t('common:a_day')}`,
            dd: `%d ${t('common:days')}`,
            M: `${t('common:a_month')}`,
            MM: `%d ${t('common:months')}`,
            y: `${t('common:a_year')}`,
            yy: `%d ${t('common:years')}`,
        },
    });
    if (date) {
        const dateParams = dayjs(date);
        const now = dayjs();
        if (now > dateParams && now.diff(dateParams, 'day') <= 2) {
            return `${dayjs(date).fromNow(true)} ${t('common:ago')}`;
        }
        return date;
    }
    return '';
};
