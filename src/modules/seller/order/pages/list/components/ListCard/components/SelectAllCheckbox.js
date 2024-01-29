import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';

const SelectAllCheckbox = (props) => {
    // prettier-ignore
    const {
        t, checkedRows, checked, onChange, count,
    } = props;
    const classes = useStyles();

    return (
        <FormControlLabel
            control={(
                <Checkbox
                    className={classes.checkbox}
                    label={`${checkedRows.length} ${t('common:Selected')}`}
                    checked={checked}
                    onChange={onChange}
                    disabled={!count}
                />
            )}
            label={checkedRows.length ? `${checkedRows.length} ${t('common:Selected')}` : t('common:Select_All')}
            className={classes.controlLabel}
        />
    );
};

export default SelectAllCheckbox;
