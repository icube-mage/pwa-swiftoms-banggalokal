import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Switch from '@common_switch';

import useStyles from '@sellermodules/warehouse/pages/form/components/Card/style';

const ShippingCard = (props) => {
    const {
        formik, options = [], provider, service, shipping_method_logo_url, error, code,
    } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const isError = formik.touched?.[code]?.selected && !!formik.errors?.[code]?.selected;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeParent = (e) => {
        const value = e.target.checked;
        const tempShip = [...formik.values.shipping];
        formik.setFieldValue(`${code}.value`, value);
        if (value) {
            formik.setFieldValue(`${code}.selected`, options.map((opt) => (opt.entity_id)));
            tempShip.push(code);
            formik.setFieldValue('shipping', tempShip);
            setExpanded(true);
        } else {
            formik.setFieldValue(`${code}.selected`, []);
            formik.setFieldValue('shipping', tempShip.filter((ship) => ship !== provider));
        }
    };

    const handleChange = (event, val) => {
        const temp = [...formik.values[code].selected];
        if (!event.target.checked) {
            formik.setFieldValue(`${code}.selected`, temp.filter((el) => el !== val));
        } else {
            temp.push(val);
            formik.setFieldValue(`${code}.selected`, temp);
        }
        return 0;
    };

    React.useEffect(() => {
        if (isError) {
            setExpanded(true);
        }
    });

    return (
        <Card className={clsx(classes.root, (isError || error) && 'errors')}>
            <CardContent className={classes.content}>
                <div
                    className={classes.imgBack}
                    style={{
                        backgroundImage: `url(${shipping_method_logo_url || '/assets/img/placeholder_image.jpg'})`,
                    }}
                />
                <Switch
                    id={code}
                    name={`${provider}.value`}
                    trueLabel=""
                    falseLabel=""
                    value={formik.values[code]?.value}
                    onChange={handleChangeParent}
                />
            </CardContent>
            <CardActions disableSpacing classes={{ root: classes.contentAction }}>
                <div>
                    <span className={classes.name}>{provider}</span>
                    <br />
                    <span className={classes.method}>{service}</span>
                </div>
                <IconButton
                    classes={{ root: classes.expandRoot }}
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider className={classes.divider} />
                <CardContent classes={{ root: classes.collapseContent }}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup classes={{ root: classes.formGroupRoot }}>
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                            {options.map((opt) => (
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            color="default"
                                            checked={formik.values[code]?.selected?.includes(opt.entity_id)}
                                            onChange={(e) => handleChange(e, opt.entity_id)}
                                            classes={{ root: classes.rootCheck, checked: classes.checkedCheck }}
                                        />
                                    )}
                                    classes={{ root: classes.rootControl, label: classes.rootControlLabel }}
                                    label={opt.service}
                                    key={opt.entity_id}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                    {isError
                    && (
                        <div className={classes.error}>
                            {formik.errors?.[code]?.selected}
                        </div>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ShippingCard;
