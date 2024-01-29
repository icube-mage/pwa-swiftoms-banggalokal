import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@sellermodules/catalog/pages/list/components/Table/style';

import { useRouter } from 'next/router';

const TableHeader = (props) => {
    const {
        catalogStatus,
        tabsMenu,
    } = props;

    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            {tabsMenu ? (
                <Grid item className="filter-item" xs="auto">
                    {tabsMenu.map((e) => (
                        e.query.status === catalogStatus && e.name
                    ))}
                    <IconButton
                        className={classes.closeButton}
                        onClick={() => router.push('/seller/catalog')}
                    >
                        <CloseIcon className={classes.closeIcon} />
                    </IconButton>
                </Grid>
            ) : null}
        </>
    );
};

export default TableHeader;
