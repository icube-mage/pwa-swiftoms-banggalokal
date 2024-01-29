import dayjs from 'dayjs';

const formatDate = (date = new Date(), format = 'MMMM D, YYYY') => {
    if (date) {
        return dayjs(date).format(format);
    }
    return '';
};

export default formatDate;
