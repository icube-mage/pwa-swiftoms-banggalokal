/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/createbundle/components/style';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Select from '@common_select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DropFile from '@common_dropfile';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import gqlLocation from '@modules/location/services/graphql';

import OptionsContent from '@modules/productlist/plugins/modaloptions';
import BundleOptionsContent from '@modules/productlist/plugins/modalbundle';
import { inputTypeOptions } from '@modules/productlist/helpers/index';

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#7AA12E',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#7AA12E',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#F9E5E4',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => (
    <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
        }}
        {...props}
    />
));

const AttributeComponents = ({
    formik, attribute_code, attribute_options,
    is_readonly, frontend_input, opposite = [], disabled_code,
}) => {
    const classes = useStyles();
    switch (frontend_input) {
    case 'weight':
    case 'price':
    case 'text':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldInput),
                }}
                autoComplete="off"
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                helperText={(formik.touched[attribute_code] && formik.errors[attribute_code]) || ''}
                fullWidth
            />
        );
    case 'textarea':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldRootNote),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                multiline
                rows={5}
                fullWidth
            />
        );
    case 'select':
        return (
            <Select
                name={attribute_code}
                disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                dataOptions={attribute_options}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                selectClasses={classes.fieldInput}
                formControlClasses={classes.selectControl}
                enableEmpty={false}
            />
        );
    case 'multiselect':
        return (
            <Autocomplete
                multiple
                className={classes.autocompleteRoot}
                name={attribute_code}
                disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                value={typeof formik.values[attribute_code] === 'object' ? formik.values[attribute_code]
                    : [formik.values[attribute_code]]}
                onChange={(e) => formik.setFieldValue(attribute_code, e)}
                primaryKey="value"
                labelKey="label"
                options={attribute_options}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                helperText={(formik.touched[attribute_code] && formik.errors[attribute_code]) || ''}
                fullWidth
            />
        );
    case 'date':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                className={classes.fieldRoot}
                variant="outlined"
                type="date"
                value={formik.values[attribute_code]?.split(' ')[0]}
                onChange={(e) => formik.setFieldValue(attribute_code, e.target.value)}
                InputProps={{
                    className: clsx(classes.fieldInput),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                fullWidth
            />
        );
    case 'boolean':
        return (
            <FormControlLabel
                control={(
                    <IOSSwitch
                        name={attribute_code}
                        disabled={is_readonly || (disabled_code && formik.values[disabled_code])}
                        checked={formik.values[attribute_code]}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (opposite.length && isChecked) {
                                opposite.forEach((el) => formik.setFieldValue(el, !isChecked));
                            }
                            formik.handleChange(e);
                        }}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                )}
                label={formik.values[attribute_code] ? 'Yes' : 'No'}
            />
        );
    default:
        return null;
    }
};

const ImageManagement = ({ handleDropFile, setImgConfig, formik }) => {
    const classes = useStyles();
    return (
        <div>
            <DropFile
                formatFile=".jpg, .jpeg, .png, .gif"
                getBase64={handleDropFile}
                showFiles={false}
                multiple
            />
            {formik && formik.values && formik.values.input_image?.length
                ? (
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {formik.values.input_image.map((image, idx) => (
                            <div key={image.position} className={classes.imgGroup} style={{ display: image.is_deleted ? 'none' : 'unset' }}>
                                <div
                                    className={classes.imgContainer}
                                    style={{ backgroundImage: `url(${image.id ? image.url : image.binary})` }}
                                    onClick={() => setImgConfig({ open: true, data: { ...image }, index: idx })}
                                    aria-hidden="true"
                                >
                                    {/* <img
                                        key={image.position}
                                        className={classes.img}
                                        src={image.id ? image.url : image.binary}
                                        alt="media_img"
                                        onClick={() => setImgConfig({ open: true, data: { ...image }, index: idx })}
                                    /> */}
                                    <img
                                        src="/assets/img/trash.svg"
                                        alt="delete"
                                        className={classes.trashIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (image.id) {
                                                formik.setFieldValue(`input_image[${idx}].is_deleted`, true);
                                            } else {
                                                const temp = formik.values.input_image;
                                                temp.splice(idx, 1);
                                                formik.setFieldValue('input_image', temp);
                                            }
                                        }}
                                    />
                                </div>
                                <div style={{ width: 200, textAlign: 'left' }}>
                                    {`${image.name} - ${image.size}`}
                                </div>
                                <div className={classes.typeContainer}>
                                    {image.types?.map((type) => (
                                        <div className={classes.labelType}>{type?.split('_').join(' ')}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
                : null}
        </div>
    );
};
const ProductCreateContent = (props) => {
    const {
        formik,
        attributeToMap,
        attribute_set_id,
        onChangeAttribute,
        attributeOptions,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [openOptions, setOpenOptions] = React.useState(false);
    const [openBundel, setOpenBundle] = React.useState(null);

    const [expanded, setExpanded] = React.useState(['product_location', 'bundle_options']);
    const [imgConfig, setImgConfig] = React.useState({ open: false, data: {}, index: null });
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            setExpanded((prev) => [...prev, panel]);
        } else {
            setExpanded((prev) => prev.filter((item) => item !== panel));
        }
    };
    const groupDetails = attributeToMap.groups.find((obj) => obj.attribute_group_code === 'product-details');
    const typeOptions = [
        { label: t('productlist:Base'), value: 'image' },
        { label: t('productlist:Small'), value: 'small_image' },
        { label: t('productlist:Swatch'), value: 'swatch_image' },
        { label: t('productlist:Thumbnail'), value: 'thumbnail' },
    ];

    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [searchLocation, setSearchLocation] = React.useState('');
    const [locationOption, setLocationOption] = React.useState([]);

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setImgConfig({ ...imgConfig, data: { ...imgConfig.data, types: value } });
    };

    const handleSaveImage = () => {
        let temp = [...formik.values.input_image];
        temp = temp.map((input, idx) => {
            if (idx === imgConfig.index) {
                return imgConfig.data;
            }
            return {
                ...input,
                types: input.types.filter((type) => (
                    !imgConfig.data.types.includes(type)
                )),
            };
        });
        formik.setFieldValue('input_image', temp);
        setImgConfig({ open: false, data: {}, index: null });
    };

    const handleDeleteOption = (i) => {
        const temp = formik.values.options;
        temp.splice(i, 1);
        if (temp.length === 0) {
            formik.setFieldValue('shouldCheck', false);
        }
        formik.setFieldValue('options', temp);
    };

    const handleDeleteValue = (i, idx) => {
        const temp = formik.values.options[i].values;
        temp.splice(idx, 1);
        if (temp.length === 0) {
            window.toastMessage({
                open: true,
                text: t('productlist:Minimal_1_Title_is_filled_If_you_want_to_delete_this_title_please_delete_the_option_instead'),
                variant: 'error',
            });
        } else {
            formik.setFieldValue(`options[${i}].values`, temp);
        }
    };

    const handleDeleteBundleOption = (i) => {
        const temp = formik.values.bundle_options;
        temp.splice(i, 1);
        formik.setFieldValue('bundle_options', temp);
    };

    const handleDeleteBundleValue = (i, idx) => {
        const temp = formik.values.bundle_options[i].values;
        temp.splice(idx, 1);
        if (temp.length === 0) {
            window.toastMessage({
                open: true,
                text: t('productlist:Minimal_1_Title_is_filled_If_you_want_to_delete_this_title_please_delete_the_option_instead'),
                variant: 'error',
            });
        } else {
            formik.setFieldValue(`bundle_options[${i}].values`, temp);
        }
    };

    React.useEffect(() => {
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchLocation && locationOption
                .filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
            if (searchLocation && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: searchLocation,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (keyName === 'product_location' || keyName === 'options' || keyName === 'bundle_options') {
                if (!expanded.includes(keyName)) {
                    setExpanded((prev) => [...prev, keyName]);
                }
                node[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            } else {
                node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            }
            node[0].focus();
        }
    }, [formik]);

    return (
        <>
            <div className={classes.topPage}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/product/productlist')}
                        variant="contained"
                        style={{ marginRight: 16 }}
                    >
                        <ChevronLeftIcon style={{
                            fontSize: 30,
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        />
                    </Button>
                    <h2 className={classes.titleTop}>{t('productlist:Product_Detail')}</h2>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('productlist:Save')}
                    </Button>
                </div>
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.gridAttribute}>
                        <div
                            className={classes.divLabel}
                        >
                            <span className={classes.label}>
                                {t('productlist:Attribute_Set')}
                            </span>
                        </div>
                        <Select
                            value={attribute_set_id}
                            onChange={(e) => onChangeAttribute(e)}
                            dataOptions={attributeOptions}
                            selectClasses={classes.fieldInput}
                            formControlClasses={classes.selectControl}
                            enableEmpty={false}
                        />
                    </div>
                    {groupDetails.attributes.map((att, attIdx) => (
                        <div className={classes.gridAttribute} key={attIdx}>
                            <div
                                className={classes.divLabel}
                            >
                                <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                    {att.frontend_label}

                                </span>
                            </div>
                            <AttributeComponents {...props} {...att} />
                        </div>
                    ))}
                </div>
                {attributeToMap.groups.map((attGroup, attGroupIdx) => ((attGroup.attribute_group_code !== 'product-details')
                    ? attGroup.attribute_group_code === 'content'
                        ? (
                            <>
                                <div className={classes.content} key={attGroupIdx}>
                                    <Accordion
                                        elevation={0}
                                        expanded={expanded.includes(attGroup.attribute_group_code)}
                                        onChange={handleChangeAccordion(attGroup.attribute_group_code)}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                            <h5 className={classes.title}>
                                                {attGroup.attribute_group_name}
                                                {attGroup.attributes.find((att) => att.is_required)
                                                    && <span className={classes.asterisk}>*</span>}
                                            </h5>
                                        </AccordionSummary>
                                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                            {
                                                attGroup.attribute_group_code === 'image-management'
                                                    ? <ImageManagement {...props} {...attGroup} setImgConfig={setImgConfig} />
                                                    : (
                                                        attGroup.attributes.map((att, attIdx) => (
                                                            <div className={classes.gridAttribute} key={attIdx}>
                                                                <div
                                                                    className={classes.divLabel}
                                                                >
                                                                    <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                                                        {att.frontend_label}
                                                                    </span>
                                                                </div>
                                                                <AttributeComponents {...props} {...att} />
                                                            </div>
                                                        )))
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                                <div className={classes.content} key={attGroupIdx}>
                                    <Accordion
                                        elevation={0}
                                        expanded={expanded.includes('bundle_options')}
                                        onChange={handleChangeAccordion('bundle_options')}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                            <h5 className={classes.title} name="bundle_options">
                                                {t('catalog:Bundle_Items')}
                                                <span className={classes.asterisk}>*</span>
                                            </h5>
                                        </AccordionSummary>
                                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                            {!formik.values.is_fixed_bundle
                                                && (
                                                    <div className={classes.optionTop}>
                                                        <div className={classes.optionButton}>
                                                            <Button
                                                                buttonType="primary-rounded"
                                                                onClick={() => {
                                                                    formik.setFieldValue('bundle_options', [...formik.values.bundle_options, {
                                                                        option_id: formik.values.options.length,
                                                                        title: '',
                                                                        is_required: false,
                                                                        values: [],
                                                                        input_type: 'select',
                                                                    }]);
                                                                }}
                                                            >
                                                                {t('productlist:Add_Option')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            {(formik.values.is_fixed_bundle ? formik.values.bundle_options.slice(0, 1) : formik.values.bundle_options).map((option, i) => (
                                                <div className={classes.optionContainer} key={i}>
                                                    {(!formik.values.is_fixed_bundle && formik.values.bundle_options?.length > 1)
                                                        && (
                                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                <IconButton
                                                                    className={classes.bundleDelete}
                                                                    edge="end"
                                                                    onClick={() => handleDeleteBundleOption(i)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </div>
                                                        )}
                                                    {!formik.values.is_fixed_bundle
                                                        && (
                                                            <div className={classes.gridOption}>
                                                                <div className={classes.divLabel}>
                                                                    <span className={clsx(classes.label, classes.labelRequired)}>
                                                                        {t('productlist:Option_Title')}
                                                                    </span>
                                                                </div>
                                                                <div className={classes.gridTextBundleOption}>
                                                                    <TextField
                                                                        name={`bundle_options[${i}].title`}
                                                                        className={classes.fieldRoot}
                                                                        variant="outlined"
                                                                        value={option?.title}
                                                                        onChange={formik.handleChange}
                                                                        InputProps={{
                                                                            className: clsx(classes.fieldInput),
                                                                        }}
                                                                        autoComplete="off"
                                                                        error={!!(formik.touched.bundle_options?.length && formik.touched.bundle_options[i]?.title
                                                                            && formik.errors.bundle_options?.length && formik.errors.bundle_options[i]?.title)}
                                                                        helperText={(formik.touched.bundle_options?.length
                                                                            && formik.touched.bundle_options[i]?.title && formik.errors.bundle_options?.length
                                                                            && formik.errors.bundle_options[i]?.title) || ''}
                                                                        fullWidth
                                                                    />
                                                                    <FormControlLabel
                                                                        control={(
                                                                            <Checkbox
                                                                                name={`bundle_options[${i}].is_required`}
                                                                                onChange={formik.handleChange}
                                                                                className={classes.checkBox}
                                                                                checked={formik.values.is_fixed_bundle || option.is_required}
                                                                                disabled={formik.values.is_fixed_bundle}
                                                                            />
                                                                        )}
                                                                        className={classes.controlLabel}
                                                                        classes={{ root: classes.rootLabel }}
                                                                        label={t('productlist:Required')}
                                                                    />

                                                                </div>
                                                            </div>
                                                        )}
                                                    {!formik.values.is_fixed_bundle
                                                        && (
                                                            <div className={classes.gridOption}>
                                                                <div className={classes.divLabel}>
                                                                    <span className={clsx(classes.label, classes.labelRequired)}>
                                                                        {t('productlist:Input_Type')}
                                                                    </span>
                                                                </div>
                                                                <div className={classes.gridTextBundleOption}>
                                                                    <Autocomplete
                                                                        className={classes.autocompleteRoot}
                                                                        name={`bundle_options[${i}].input_type`}
                                                                        value={inputTypeOptions.find((o) => o.value === formik.values.bundle_options[i].input_type)}
                                                                        onChange={(e) => formik.setFieldValue(`bundle_options[${i}].input_type`, e?.value)}
                                                                        primaryKey="value"
                                                                        labelKey="label"
                                                                        options={inputTypeOptions}
                                                                        fullWidth
                                                                        disableClearable
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    <div className={classes.gridTableOptionBundle}>
                                                        <div />
                                                        <table className={classes.table}>
                                                            <tbody>
                                                                <tr className={classes.tr}>
                                                                    {!formik.values.is_fixed_bundle
                                                                        && (
                                                                            <th className={classes.th}>
                                                                                {t('productlist:Is_Default')}
                                                                            </th>
                                                                        )}
                                                                    <th className={classes.th}>
                                                                        {t('productlist:Name')}
                                                                    </th>
                                                                    <th className={classes.th}>
                                                                        {t('productlist:SKU')}
                                                                    </th>
                                                                    {!formik.values.is_fixed_bundle && !formik.values.price_type
                                                                        && (
                                                                            <th className={classes.th}>
                                                                                {t('productlist:Price')}
                                                                            </th>
                                                                        )}
                                                                    <th className={classes.th}>
                                                                        {t('productlist:Default_Quantity')}
                                                                        <span className={classes.required}>*</span>
                                                                    </th>
                                                                    {(formik.values.bundle_options[i].input_type === 'select' || formik.values.bundle_options[i].input_type === 'radio')
                                                                        && !formik.values.is_fixed_bundle
                                                                        && (
                                                                            <th className={classes.th}>
                                                                                {t('productlist:User_Defined')}
                                                                            </th>
                                                                        )}
                                                                    <th className={classes.th}>
                                                                        {t('productlist:Action')}
                                                                    </th>
                                                                </tr>
                                                                {option.values.map((e, idx) => (
                                                                    <tr key={e?.id}>
                                                                        {!formik.values.is_fixed_bundle
                                                                            && (
                                                                                <td className={classes.td}>
                                                                                    <Checkbox
                                                                                        name={`bundle_options[${i}].values[${idx}].is_default`}
                                                                                        className={classes.checkBox}
                                                                                        onChange={formik.handleChange}
                                                                                        size="small"
                                                                                        checked={formik.values.is_fixed_bundle || e.is_default}
                                                                                        disabled={formik.values.is_fixed_bundle}
                                                                                    />
                                                                                </td>
                                                                            )}
                                                                        <td className={classes.td}>
                                                                            {e.name}
                                                                        </td>
                                                                        <td className={classes.td}>
                                                                            {e.sku}
                                                                        </td>
                                                                        {!formik.values.is_fixed_bundle && !formik.values.price_type
                                                                            && (
                                                                                <td className={classes.td} style={{ alignItems: 'center' }}>
                                                                                    <TextField
                                                                                        fullWidth
                                                                                        name={`bundle_options[${i}].values[${idx}].price`}
                                                                                        variant="outlined"
                                                                                        value={e.price}
                                                                                        onChange={formik.handleChange}
                                                                                        autoComplete="off"
                                                                                        InputProps={{
                                                                                            className: clsx(classes.fieldInputSquareBundle),
                                                                                        }}
                                                                                        error={!!(formik.touched.bundle_options?.length && formik.touched.bundle_options[i]?.values?.length
                                                                                            && formik.touched.bundle_options[i]?.values[idx]?.price
                                                                                            && formik.errors.bundle_options?.length && formik.errors.bundle_options[i]?.values?.length
                                                                                            && formik.errors.bundle_options[i]?.values[idx]?.price)}
                                                                                        helperText={(formik.touched.bundle_options?.length && formik.touched.bundle_options[i]?.values?.length
                                                                                            && formik.touched.bundle_options[i]?.values[idx]?.price
                                                                                            && formik.errors.bundle_options?.length && formik.errors.bundle_options[i]?.values?.length
                                                                                            && formik.errors.bundle_options[i]?.values[idx]?.price) || ''}
                                                                                    />
                                                                                </td>
                                                                            )}
                                                                        <td className={classes.td}>
                                                                            <TextField
                                                                                fullWidth
                                                                                name={`bundle_options[${i}].values[${idx}].qty`}
                                                                                variant="outlined"
                                                                                value={e.qty}
                                                                                onChange={formik.handleChange}
                                                                                autoComplete="off"
                                                                                InputProps={{
                                                                                    className: clsx(classes.fieldInputSquareBundle),
                                                                                }}
                                                                                error={!!(formik.touched.bundle_options?.length && formik.touched.bundle_options[i]?.values?.length
                                                                                    && formik.touched.bundle_options[i]?.values[idx]?.qty
                                                                                    && formik.errors.bundle_options?.length && formik.errors.bundle_options[i]?.values?.length
                                                                                    && formik.errors.bundle_options[i]?.values[idx]?.qty)}
                                                                                helperText={(formik.touched.bundle_options?.length && formik.touched.bundle_options[i]?.values?.length
                                                                                    && formik.touched.bundle_options[i]?.values[idx]?.qty
                                                                                    && formik.errors.bundle_options?.length && formik.errors.bundle_options[i]?.values?.length
                                                                                    && formik.errors.bundle_options[i]?.values[idx]?.qty) || ''}
                                                                            />
                                                                        </td>
                                                                        {(formik.values.bundle_options[i].input_type === 'select' || formik.values.bundle_options[i].input_type === 'radio')
                                                                            && !formik.values.is_fixed_bundle
                                                                            && (
                                                                                <td className={classes.td}>
                                                                                    <Checkbox
                                                                                        name={`bundle_options[${i}].values[${idx}].qty_edit`}
                                                                                        onChange={formik.handleChange}
                                                                                        checked={e.qty_edit}
                                                                                        className={classes.checkBox}
                                                                                    />
                                                                                </td>
                                                                            )}
                                                                        <td className={classes.td}>
                                                                            <IconButton
                                                                                edge="end"
                                                                                onClick={() => handleDeleteBundleValue(i, idx)}
                                                                            >
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className={classes.gridTableOption}>
                                                        <div />
                                                        <Button
                                                            style={{ width: 200 }}
                                                            buttonType="primary-rounded"
                                                            onClick={() => setOpenBundle(i)}
                                                        >
                                                            {t('productlist:Add_Products_to_Option')}
                                                        </Button>
                                                    </div>
                                                    <div className={classes.gridTableOption}>
                                                        <div />
                                                        {(formik.touched?.bundle_options?.[i]?.values && formik.errors?.bundle_options?.[i]?.values
                                                            && typeof formik.errors.bundle_options[i].values === 'string')
                                                            ? (
                                                                <div className={classes.errorHtml}>
                                                                    <div style={{ paddingLeft: 5 }}>{t('productlist:Minimal_1_Products_is_choosen')}</div>
                                                                </div>
                                                            ) : null}
                                                    </div>
                                                    <div style={{ height: 10 }} />
                                                </div>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </>
                        )
                        : attGroup.attribute_group_code === 'advanced-pricing'
                            ? (
                                <>
                                    <div className={classes.content} key={attGroupIdx}>
                                        <Accordion
                                            elevation={0}
                                            expanded={expanded.includes(attGroup.attribute_group_code)}
                                            onChange={handleChangeAccordion(attGroup.attribute_group_code)}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                                <h5 className={classes.title}>
                                                    {attGroup.attribute_group_name}
                                                    {attGroup.attributes.find((att) => att.is_required)
                                                        && <span className={classes.asterisk}>*</span>}
                                                </h5>
                                            </AccordionSummary>
                                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                                {
                                                    attGroup.attribute_group_code === 'image-management'
                                                        ? <ImageManagement {...props} {...attGroup} setImgConfig={setImgConfig} />
                                                        : (
                                                            attGroup.attributes.map((att, attIdx) => (
                                                                <div className={classes.gridAttribute} key={attIdx}>
                                                                    <div
                                                                        className={classes.divLabel}
                                                                    >
                                                                        <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                                                            {att.frontend_label}
                                                                        </span>
                                                                    </div>
                                                                    <AttributeComponents {...props} {...att} />
                                                                </div>
                                                            )))
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                    <div className={classes.content} key={attGroupIdx}>
                                        <Accordion
                                            elevation={0}
                                            expanded={expanded.includes('options')}
                                            onChange={handleChangeAccordion('options')}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                                <h5 className={classes.title} name="options">
                                                    {t('catalog:Product_Option')}
                                                </h5>
                                            </AccordionSummary>
                                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                                <div className={classes.optionTop}>
                                                    <span>
                                                        {t('productlist:Custom_options_let_customers_choose_the_product_variations_they_want')}
                                                    </span>
                                                    <div className={classes.optionButton}>
                                                        <Button
                                                            style={{ marginTop: 5 }}
                                                            buttonType="outlined-rounded"
                                                            onClick={() => setOpenOptions(true)}
                                                        >
                                                            {t('productlist:Import_Option')}
                                                        </Button>
                                                        <Button
                                                            style={{ marginLeft: 10, marginTop: 5 }}
                                                            buttonType="primary-rounded"
                                                            onClick={() => {
                                                                formik.setFieldValue('options', [...formik.values.options, {
                                                                    is_delete: false,
                                                                    option_id: null,
                                                                    title: '',
                                                                    values: [
                                                                        {
                                                                            sku: '', title: '',
                                                                        },
                                                                    ],
                                                                }]);
                                                            }}
                                                        >
                                                            {t('productlist:Add_Option')}
                                                        </Button>
                                                    </div>
                                                </div>
                                                {formik.values.options.map((option, i) => (
                                                    <div className={classes.optionContainer} key={i}>
                                                        <div className={classes.gridOption}>
                                                            <div className={classes.divLabel}>
                                                                <span className={clsx(classes.label, classes.labelRequired)}>
                                                                    {t('productlist:Option_Title')}
                                                                </span>
                                                            </div>
                                                            <div className={classes.gridTextOption}>
                                                                <TextField
                                                                    name={`options[${i}].title`}
                                                                    className={classes.fieldRoot}
                                                                    variant="outlined"
                                                                    value={option?.title}
                                                                    onChange={formik.handleChange}
                                                                    InputProps={{
                                                                        className: clsx(classes.fieldInput),
                                                                    }}
                                                                    autoComplete="off"
                                                                    error={!!(formik.touched.options?.length && formik.touched.options[i]?.title
                                                                        && formik.errors.options?.length && formik.errors.options[i]?.title)}
                                                                    helperText={(formik.touched.options?.length
                                                                        && formik.touched.options[i]?.title && formik.errors.options?.length
                                                                        && formik.errors.options[i]?.title) || ''}
                                                                    fullWidth
                                                                />
                                                                <IconButton
                                                                    style={{
                                                                        placeSelf: 'start center',
                                                                        width: 'fit-content',
                                                                        color: 'black',
                                                                        paddingTop: 5,
                                                                    }}
                                                                    edge="end"
                                                                    onClick={() => handleDeleteOption(i)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                        <div className={classes.gridTableOption}>
                                                            <div />
                                                            <table className={classes.table}>
                                                                <tbody>
                                                                    <tr className={classes.tr}>
                                                                        <th className={classes.th}>
                                                                            {t('productlist:Title')}
                                                                            <span className={classes.required}>*</span>
                                                                        </th>
                                                                        <th className={classes.th}>
                                                                            {t('productlist:SKU')}
                                                                            <span className={classes.required}>*</span>
                                                                        </th>
                                                                        <th className={classes.th}>{t('productlist:Action')}</th>
                                                                    </tr>
                                                                    {option.values.map((e, idx) => (
                                                                        <tr key={idx}>
                                                                            <td className={classes.td}>
                                                                                <TextField
                                                                                    name={`options[${i}].values[${idx}].title`}
                                                                                    variant="outlined"
                                                                                    value={e.title}
                                                                                    onChange={formik.handleChange}
                                                                                    autoComplete="off"
                                                                                    fullWidth
                                                                                    InputProps={{
                                                                                        className: clsx(classes.fieldInputSquare),
                                                                                    }}
                                                                                    error={!!(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                                                        && formik.touched.options[i]?.values[idx]?.title
                                                                                        && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                                                        && formik.errors.options[i]?.values[idx]?.title)}
                                                                                    helperText={(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                                                        && formik.touched.options[i]?.values[idx]?.title
                                                                                        && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                                                        && formik.errors.options[i]?.values[idx]?.title) || ''}
                                                                                />
                                                                            </td>
                                                                            <td className={classes.td}>
                                                                                <TextField
                                                                                    name={`options[${i}].values[${idx}].sku`}
                                                                                    variant="outlined"
                                                                                    value={e.sku}
                                                                                    onChange={formik.handleChange}
                                                                                    autoComplete="off"
                                                                                    fullWidth
                                                                                    InputProps={{
                                                                                        className: clsx(classes.fieldInputSquare),
                                                                                    }}
                                                                                    error={!!(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                                                        && formik.touched.options[i]?.values[idx]?.sku
                                                                                        && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                                                        && formik.errors.options[i]?.values[idx]?.sku)}
                                                                                    helperText={(formik.touched.options?.length && formik.touched.options[i]?.values?.length
                                                                                        && formik.touched.options[i]?.values[idx]?.sku
                                                                                        && formik.errors.options?.length && formik.errors.options[i]?.values?.length
                                                                                        && formik.errors.options[i]?.values[idx]?.sku) || ''}
                                                                                />
                                                                            </td>
                                                                            <td className={classes.td}>
                                                                                <IconButton
                                                                                    edge="end"
                                                                                    onClick={() => handleDeleteValue(i, idx)}
                                                                                >
                                                                                    <DeleteIcon />
                                                                                </IconButton>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                    <tfoot>
                                                                        <tr>
                                                                            <td>
                                                                                <Button
                                                                                    buttonType="primary-rounded"
                                                                                    onClick={() => {
                                                                                        formik.setFieldValue(`options[${i}].values`,
                                                                                            [...formik.values.options[i].values, {
                                                                                                sku: '', title: '',
                                                                                            }]);
                                                                                    }}
                                                                                >
                                                                                    {t('productlist:Add')}
                                                                                </Button>

                                                                            </td>
                                                                        </tr>
                                                                    </tfoot>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div style={{ height: 10 }} />
                                                    </div>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </>
                            )
                            : (
                                <div className={classes.content} key={attGroupIdx}>
                                    <Accordion
                                        elevation={0}
                                        expanded={expanded.includes(attGroup.attribute_group_code)}
                                        onChange={handleChangeAccordion(attGroup.attribute_group_code)}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                            <h5 className={classes.title}>
                                                {attGroup.attribute_group_name}
                                                {attGroup.attributes.find((att) => att.is_required)
                                                    && <span className={classes.asterisk}>*</span>}
                                            </h5>
                                        </AccordionSummary>
                                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                            {
                                                attGroup.attribute_group_code === 'image-management'
                                                    ? <ImageManagement {...props} {...attGroup} setImgConfig={setImgConfig} />
                                                    : (
                                                        attGroup.attributes.map((att, attIdx) => (
                                                            <div className={classes.gridAttribute} key={attIdx}>
                                                                <div
                                                                    className={classes.divLabel}
                                                                >
                                                                    <span className={clsx(classes.label, att.is_required && classes.labelRequired)}>
                                                                        {att.frontend_label}
                                                                    </span>
                                                                </div>
                                                                <AttributeComponents {...props} {...att} />
                                                            </div>
                                                        )))
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )
                    : null))}
                <div className={classes.content}>
                    <Accordion
                        elevation={0}
                        expanded={expanded.includes('product_location')}
                        onChange={handleChangeAccordion('product_location')}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h5 className={classes.title} name="product_location">
                                {t('productlist:Product_Location_Mapping')}
                                <span className={classes.asterisk}>*</span>
                            </h5>
                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.gridAttribute}>
                                <div
                                    className={classes.divLabel}
                                >
                                    <span className={clsx(classes.label)}>
                                        {t('productlist:Location')}
                                    </span>
                                </div>
                                <Autocomplete
                                    multiple
                                    name="product_location"
                                    mode={locationOption.length > 0 ? 'default' : 'lazy'}
                                    className={classes.autocompleteRoot}
                                    value={typeof formik.values.product_location === 'object' ? formik.values.product_location
                                        : [formik.values.product_location]}
                                    onChange={(e) => formik.setFieldValue('product_location', e)}
                                    loading={getLocationListRes.loading}
                                    options={locationOption}
                                    getOptions={getLocationList}
                                    getOptionsVariables={{
                                        variables: {
                                            search: searchLocation,
                                            pageSize: 20,
                                            currentPage: 1,
                                        },
                                    }}
                                    primaryKey="loc_code"
                                    labelKey="loc_name"
                                    onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                    error={!!(formik.touched.product_location && formik.errors.product_location)}
                                    helperText={(formik.touched.product_location && formik.errors.product_location) || ''}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Paper>

            <Dialog
                open={imgConfig.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('productlist:Product_Image_Configuration')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <img
                            className={classes.img}
                            src={imgConfig.data?.id ? imgConfig.data?.url : imgConfig.data?.binary}
                            alt="configImg"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <Select
                        multiple
                        value={imgConfig.data?.types}
                        onChange={handleChangeMultiple}
                        dataOptions={typeOptions}
                        selectClasses={classes.fieldInputMultiple}
                        fullWidth
                    />
                    <Select
                        value={imgConfig.data?.position}
                        dataOptions={Array.from(Array(formik.values.input_image.length + 1).keys()).map((e) => (
                            { value: e, label: e }
                        ))}
                        onChange={(e) => setImgConfig({ ...imgConfig, data: { ...imgConfig.data, position: Number(e.target.value) } })}
                        fullWidth
                        enableEmpty={false}
                    />
                    <div style={{ margin: '10px 0' }}>
                        <Button onClick={handleSaveImage} color="primary" style={{ marginRight: 10 }}>
                            {t('productlist:Ok')}
                        </Button>
                        <Button onClick={() => setImgConfig({ open: false, data: {}, index: null })} buttonType="outlined" color="primary" autoFocus>
                            {t('productlist:Cancel')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                disableEnforceFocus
                className={classes.dialogFull}
                open={openOptions}
                onClose={() => setOpenOptions(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">{t('productlist:Select_Product')}</DialogTitle>
                <DialogContent>
                    <OptionsContent formik={formik} t={t} handleClose={() => setOpenOptions(false)} />
                </DialogContent>
            </Dialog>
            <Dialog
                disableEnforceFocus
                className={classes.dialogFull}
                open={openBundel !== null}
                onClose={() => setOpenBundle(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">{t('productlist:Add_Products_to_Option')}</DialogTitle>
                <DialogContent>
                    <BundleOptionsContent openBundel={openBundel} formik={formik} t={t} handleClose={() => setOpenBundle(null)} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCreateContent;
