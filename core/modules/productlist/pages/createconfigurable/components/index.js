/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-destructuring */
import React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import Select from '@common_select';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import gqlLocation from '@modules/location/services/graphql';

import OptionsContent from '@modules/productlist/plugins/modaloptions';
import useStyles from '@modules/productlist/pages/createconfigurable/components/style';
import ProductOptions from '@modules/productlist/pages/createconfigurable/components/productoptions';
import ProductConfigurable from '@modules/productlist/plugins/productconfigurable';
import Steppers from '@modules/productlist/plugins/productconfigurable/steppers';
import { AttributeComponents, ImageManagement } from '@modules/productlist/plugins/attributecomponents';

const ProductCreateConfigurableContent = (props) => {
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

    const [expanded, setExpanded] = React.useState(['configurable']);
    const [openConfig, setOpenConfig] = React.useState(false);
    const [openOptions, setOpenOptions] = React.useState(false);
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
            if (keyName === 'configurable' || keyName === 'options') {
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
                    <h2 className={classes.titleTop}>{t('productlist:Create_Configurable_Product')}</h2>
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
                    {groupDetails.attributes.filter((att) => att.attribute_code !== 'price').map((att, attIdx) => (
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
                {attributeToMap.groups.map((attGroup, attGroupIdx) => (attGroup.attribute_group_code !== 'product-details')
                    && (attGroup.attribute_group_code === 'content'
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
                                <div className={classes.content}>
                                    <Accordion
                                        elevation={0}
                                        expanded={expanded.includes('configurable')}
                                        onChange={handleChangeAccordion('configurable')}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                            <h5 className={classes.title} name="configurable">
                                                {t('catalog:Configurations')}
                                                <span className={classes.asterisk}>*</span>
                                            </h5>
                                        </AccordionSummary>
                                        <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                            <ProductConfigurable {...props} setShowModal={setOpenConfig} />
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
                                            expanded={expanded.includes('product-option')}
                                            onChange={handleChangeAccordion('product-option')}
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.accordion}>
                                                <h5 className={classes.title} name="options">
                                                    {t('catalog:Product_Option')}
                                                </h5>
                                            </AccordionSummary>
                                            <AccordionDetails classes={{ root: classes.accordionDetailRoot }}>
                                                <ProductOptions {...props} setOpenOptions={setOpenOptions} />
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
                    ))}
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
                className={classes.dialogConfig}
                fullWidth
                maxWidth="xl"
                open={openConfig}
                aria-labelledby="alert-dialog-title-config"
                aria-describedby="alert-dialog-description-config"
                onClose={() => setOpenConfig(false)}
            >
                <DialogTitle>
                    {t('productlist:Create_Product_Configurations')}
                </DialogTitle>
                <DialogContent>
                    <Steppers {...props} onCancel={() => setOpenConfig(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCreateConfigurableContent;
