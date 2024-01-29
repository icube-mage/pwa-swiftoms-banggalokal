import clsx from 'clsx';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStyles from '@sellermodules/storesetting/pages/default/components/managebanner/style';

const FloatingContent = (props) => {
    const {
        handleUp, handleDown, handleDelete, mode,
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.editContainer, 'edit', mode)}>
            <div
                aria-hidden="true"
                onClick={handleUp}
                className={clsx(classes.iconEdit)}
            >
                <ArrowUpwardIcon className="icon" />
            </div>
            <div
                aria-hidden="true"
                onClick={handleDown}
                className={clsx(classes.iconEdit, 'border')}
            >
                <ArrowDownwardIcon className="icon" />
            </div>
            <div
                aria-hidden="true"
                onClick={handleDelete}
                className={clsx(classes.iconEdit)}
            >
                <DeleteOutlineIcon className="icon" />
            </div>
        </div>
    );
};

export default FloatingContent;
