import Button from '@common_button';
import TextField from '@common_textfield';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@sellermodules/order/pages/list/components/ListCard/style';
import clsx from 'clsx';

const SearchBar = (props) => {
    const { t, value, onChange } = props;
    const classes = useStyles();

    return (
        <TextField
            name="email"
            placeholder={t('common:Search_for_buyer’s_name_product_receipt_number_or_invoice')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(classes.textInput, 'full')}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                    </InputAdornment>
                ),
                endAdornment:
                    value === '' ? (
                        false
                    ) : (
                        <InputAdornment position="end">
                            <Button
                                classic
                                bg="transparent"
                                padding="0"
                                margin="0"
                                classicButtonIcon={<img alt="" src="/assets/img/icon_close.svg" />}
                                classicButtonOnClick={() => onChange('')}
                            />
                        </InputAdornment>
                    ),
            }}
        />
    );
};

export default SearchBar;
