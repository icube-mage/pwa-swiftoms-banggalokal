import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    wrapperMainTable: {
        '& td.MuiTableCell-body': {
            verticalAlign: 'top',
        },
        '& td div.old-data': {
            minWidth: 110,
            display: 'grid',
            gridTemplateColumns: '90% 10%',
        },
        '& td div.new-data': {
            minWidth: 110,
            display: 'grid',
            gridTemplateColumns: '90% 10%',
        },
    },
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
}));

export default useStyles;
