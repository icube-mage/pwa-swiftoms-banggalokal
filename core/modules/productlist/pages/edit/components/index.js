/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
import React from 'react';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/edit/components/style';
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
import { DataGrid } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import gqlLocation from '@modules/location/services/graphql';

import OptionsContent from '@modules/productlist/plugins/modaloptions';

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
    formik, handleDropFile, attribute_code, attribute_options,
    is_readonly, frontend_input, setImgConfig,
}) => {
    const classes = useStyles();
    switch (frontend_input) {
    case 'weight':
    case 'price':
    case 'text':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldInput, is_readonly && 'disabled'),
                }}
                error={!!(formik.touched[attribute_code] && formik.errors[attribute_code])}
                helperText={(formik.touched[attribute_code] && formik.errors[attribute_code]) || ''}
                fullWidth
            />
        );
    case 'textarea':
        return (
            <TextField
                name={attribute_code}
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                value={formik.values[attribute_code]}
                onChange={formik.handleChange}
                InputProps={{
                    className: clsx(classes.fieldRootNote, is_readonly && 'disabled'),
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
                disabled={is_readonly}
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
                disabled={is_readonly}
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
                disabled={is_readonly}
                className={classes.fieldRoot}
                variant="outlined"
                type="date"
                value={formik.values[attribute_code]?.split(' ')[0]}
                onChange={(e) => formik.setFieldValue(attribute_code, e.target.value)}
                InputProps={{
                    className: clsx(classes.fieldInput, is_readonly && 'disabled'),
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
                        disabled={is_readonly}
                        checked={formik.values[attribute_code]}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                )}
                label={formik.values[attribute_code] ? 'Yes' : 'No'}
            />
        );
    case 'image':
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
    default:
        return null;
    }
};

const ProductListEditContent = (props) => {
    const {
        productDetail, attribute_set_id, onChangeAttribute, formik, t, refetch,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [expanded, setExpanded] = React.useState([]);
    const [openOptions, setOpenOptions] = React.useState(false);
    const [imgConfig, setImgConfig] = React.useState({ open: false, data: {}, index: null });
    const [channelSelected, setChannelSelected] = React.useState([{}]);
    const [locationsSelected, setLocationsSelected] = React.useState([{}]);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        if (isExpanded) {
            setExpanded((prev) => [...prev, panel]);
        } else {
            setExpanded((prev) => prev.filter((item) => item !== panel));
        }
    };

    const groupDetails = productDetail.groups.find((obj) => obj.attribute_group_code === 'product-details');
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
        const option = formik.values.options[i];
        if (option.is_old) {
            formik.setFieldValue(`options[${i}].is_delete`, true);
        } else {
            const temp = formik.values.options;
            temp.splice(i, 1);
            if (temp.length === 0) {
                formik.setFieldValue('shouldCheck', false);
            }
            formik.setFieldValue('options', temp);
        }
    };

    const handleDeleteValue = (i, idx) => {
        const option = formik.values.options[i];
        if (option.is_old) {
            const countValue = option.values.filter((val) => !val.is_delete)?.length;
            if (countValue > 1) {
                formik.setFieldValue(`options[${i}].values[${idx}].is_delete`, true);
            } else {
                window.toastMessage({
                    open: true,
                    text: t('productlist:Minimal_1_Title_is_filled_If_you_want_to_delete_this_title_please_delete_the_option_instead'),
                    variant: 'error',
                });
            }
        } else {
            const temp = option.values;
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
        }
    };

    const stocklistColumns = [
        {
            field: 'id', headerName: 'ID', sortable: false, hide: true,
        },
        {
            field: 'loc_name', headerName: t('productlist:Location'), minWidth: 200,
        },
        {
            field: 'qty_total', headerName: t('productlist:Qty_Total'), minWidth: 150,
        },
        {
            field: 'qty_reserved', headerName: t('productlist:Qty_Reserved'), minWidth: 150,
        },
        {
            field: 'qty_saleable', headerName: t('productlist:Qty_Saleable'), minWidth: 150,
        },
    ];

    const stocklistRows = productDetail.sourcing.map((e, i) => ({
        id: i,
        loc_name: e.loc_name,
        qty_total: e.qty_total,
        qty_reserved: e.qty_reserved,
        qty_saleable: e.qty_saleable,
    }));

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
        if (productDetail.company_price && productDetail.company_price.length) {
            setChannelSelected(productDetail.company_price.map((com) => com.channels[0]));
            setLocationsSelected(productDetail.company_price.map((com) => com.channels[0]?.locations[0]));
        }
    }, []);

    React.useEffect(() => {
        if (!formik.isSubmitting) return;
        const keys = Object.keys(formik.errors);
        if (keys.length > 0) {
            const keyName = keys[0];
            const node = document.getElementsByName(keyName);
            if (keyName === 'options') {
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
                            dataOptions={productDetail.attribute_set_options}
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
                {productDetail.groups.map((attGroup, attGroupIdx) => (attGroup.attribute_group_code !== 'product-details')
                    && (attGroup.attribute_group_code === 'advanced-pricing' ? (
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
                                        {attGroup.attributes.map((att, attIdx) => (
                                            attGroup.attribute_group_code === 'image-management'
                                                ? <AttributeComponents {...props} {...att} setImgConfig={setImgConfig} />
                                                : (
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
                                                )
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <div className={classes.content} key={attGroupIdx}>
                                <Accordion
                                    elevation={0}
                                    expanded={expanded.includes('product-option')}
                                    onChange={handleChangeAccordion('product-option')}
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
                                        {formik.values.options?.map((option, i) => (!option.is_delete
                                            && (
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
                                                                {option.values?.map((e, idx) => (!e.is_delete
                                                                    && (
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
                                                                    )
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
                                            )
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
                                        {attGroup.attributes.map((att, attIdx) => (
                                            attGroup.attribute_group_code === 'image-management'
                                                ? <AttributeComponents {...props} {...att} setImgConfig={setImgConfig} />
                                                : (
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
                                                )
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    ))}

                <div className={classes.content}>
                    <Accordion
                        elevation={0}
                        expanded={expanded.includes('stocklist')}
                        onChange={handleChangeAccordion('stocklist')}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h2 className={classes.title}>{t('productlist:Stock_List')}</h2>

                        </AccordionSummary>
                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                            <div className={classes.formField} style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={stocklistRows}
                                    columns={stocklistColumns}
                                    pageSize={20}
                                    disableColumnMenu
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {productDetail.company_price && productDetail.company_price.length
                    ? (
                        <div className={classes.content}>
                            <Accordion
                                elevation={0}
                                expanded={expanded.includes('vendor_price')}
                                onChange={handleChangeAccordion('vendor_price')}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                    <h2 className={classes.title}>{t('productlist:Price_List')}</h2>

                                </AccordionSummary>
                                <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                    <div className={classes.formField}>
                                        <table className={classes.table}>
                                            <tbody>
                                                <tr className={classes.trGrid}>
                                                    <th className={classes.th}>{t('productlist:Company')}</th>
                                                    <th className={classes.th}>{t('productlist:Channel')}</th>
                                                    <th className={classes.th}>{t('productlist:Location')}</th>
                                                    <th className={classes.th}>{t('productlist:Price')}</th>
                                                </tr>
                                                {productDetail.company_price.map((e, i) => (
                                                    <tr className={classes.trGrid} key={i}>
                                                        <td className={classes.td} style={{ alignSelf: 'center' }}>{e.company_name}</td>
                                                        <td className={classes.td}>
                                                            <Autocomplete
                                                                value={channelSelected[i]}
                                                                onChange={(ev) => {
                                                                    setChannelSelected((prev) => prev.map((item, j) => (j === i ? ev : item)));
                                                                    setLocationsSelected((prev) => prev.map(
                                                                        (item, j) => (j === i ? ev?.locations[0] || {} : item),
                                                                    ));
                                                                }}
                                                                options={e.channels}
                                                                primaryKey="channel_id"
                                                                labelKey="channel_name"
                                                                className={classes.autocompleteTable}
                                                            />
                                                        </td>
                                                        <td className={classes.td}>
                                                            <Autocomplete
                                                                value={locationsSelected[i]}
                                                                onChange={(ev) => {
                                                                    setLocationsSelected((prev) => prev.map((item, j) => (j === i ? ev : item)));
                                                                }}
                                                                options={channelSelected[i]?.locations}
                                                                primaryKey="loc_id"
                                                                labelKey="loc_name"
                                                                className={classes.autocompleteTable}
                                                            />
                                                        </td>
                                                        <td className={classes.td}>
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                {t('productlist:Price')}
                                                                {' '}
                                                                :
                                                            </span>
                                                            <span>
                                                                {
                                                                    ` IDR${locationsSelected[i]?.price || '-'}`
                                                                }
                                                            </span>
                                                            <br />
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                {t('productlist:Special_Price')}
                                                                {' '}
                                                                :
                                                            </span>
                                                            <span>
                                                                {
                                                                    ` IDR${locationsSelected[i]?.special_price || '-'}`
                                                                }
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ) : null}
                <div className={classes.content}>
                    <Accordion
                        elevation={0}
                        expanded={expanded.includes('product-location-mapping')}
                        onChange={handleChangeAccordion('product-location-mapping')}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                            <h5 className={classes.title}>
                                {t('productlist:Product_Location_Mapping')}
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
                            {t('productlist:OK')}
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
                    <OptionsContent formik={formik} t={t} handleClose={() => setOpenOptions(false)} refetch={refetch} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductListEditContent;
