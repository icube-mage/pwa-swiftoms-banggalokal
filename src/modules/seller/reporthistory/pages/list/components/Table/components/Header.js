import Paper from '@material-ui/core/Paper';
import useStyles from '@sellermodules/reporthistory/pages/list/components/Table/style';

const TabsHeader = (props) => {
    const {
        header = '',
    } = props;

    const classes = useStyles();

    return (
        <>
            <Paper className={classes.paperHead}>
                <div className={classes.tableToolbar}>
                    <div className="top-buttons-wrapper nopad">
                        <div className="top-item-left header">
                            {header}
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default TabsHeader;
