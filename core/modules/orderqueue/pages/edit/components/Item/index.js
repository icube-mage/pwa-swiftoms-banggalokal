/* eslint-disable no-nested-ternary */
import { formatPriceNumber } from '@helper_currency';
import LocationAutoComplete from '@modules/orderqueue/pages/edit/components/locationAutoComplete';

const Item = (props) => {
    const {
        idx, classes, setFieldValue, isModeEdit, item, errors, touched, channelCode, isChild = false, values,
    } = props;

    return (
        <tr>
            <td className={classes.td} style={{ paddingLeft: isChild ? 10 : 0 }}>
                {isChild ? `- ${item.sku}` : item.sku}
            </td>
            <td className={classes.td}>{item.name}</td>
            <td className={classes.td}>
                {typeof item.sell_price === 'string' ? item.sell_price : formatPriceNumber(item.sell_price)}
            </td>
            <td className={classes.td} style={{ textAlign: 'center' }}>
                {item.qty}
            </td>
            <td className={classes.td}>
                {isChild ? '' : item.discount_amount}
            </td>
            <td className={classes.td} style={{ width: `${isModeEdit ? '300px' : 'auto'}` }}>
                {isChild ? <></>
                    : !isModeEdit ? (
                        <>{item.loc_code || '-'}</>
                    ) : (
                        <LocationAutoComplete
                            classes={classes}
                            item={item}
                            idx={idx}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                            channelCode={channelCode}
                            values={values}
                        />
                    )}
            </td>
            <td className={classes.td}>{isChild ? '' : item.pickup_name || '-'}</td>
        </tr>
    );
};

const ItemCore = (props) => {
    const { item } = props;

    return (
        <>
            <Item {...props} />
            {item.bundle_children?.map((child) => (
                <Item {...props} item={child} isChild />
            ))}
        </>
    );
};

export default ItemCore;
