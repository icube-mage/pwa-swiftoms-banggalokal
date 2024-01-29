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
import { DataGrid } from '@material-ui/data-grid';

import gqlLocation from '@modules/location/services/graphql';

import useStyles from '@modules/productlist/pages/editconfigurable/components/style';
import OptionsContent from '@modules/productlist/plugins/modaloptions';
import ProductOptions from '@modules/productlist/pages/editconfigurable/components/productoptions';
import ProductConfigurable from '@modules/productlist/plugins/productconfigurable';
import Steppers from '@modules/productlist/plugins/productconfigurable/steppers';
import { AttributeComponents, ImageManagement } from '@modules/productlist/plugins/attributecomponents';

const ProductListEditContent = (props) => {
    const {
        productDetail, attribute_set_id, onChangeAttribute, formik, t, refetch, dataAtt,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const [showModal, setShowModal] = React.useState(false);

    const [expanded, setExpanded] = React.useState(['configurable']);
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
                    {groupDetails.attributes.filter((att) => att.attribute_code !== 'price').map((att) => (
                        <div className={classes.gridAttribute} key={att.attribute_code}>
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
                {productDetail.groups.map((attGroup) => (attGroup.attribute_group_code !== 'product-details')
                    && (attGroup.attribute_group_code === 'content'
                        ? (
                            <div key={attGroup.attribute_group_code}>
                                <div className={classes.content}>
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
                                                        attGroup.attributes.map((att) => (
                                                            <div className={classes.gridAttribute} key={att.attribute_code}>
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
                                            <ProductConfigurable {...props} setShowModal={setShowModal} />
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        )
                        : attGroup.attribute_group_code === 'advanced-pricing' ? (
                            <div key={attGroup.attribute_group_code}>
                                <div className={classes.content}>
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
                                                    ? <ImageManagement key={att.attribute_code} {...props} {...attGroup} setImgConfig={setImgConfig} />
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
                                <div className={classes.content}>
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
                            </div>
                        )
                            : (
                                <div className={classes.content} key={attGroup.attribute_group_code}>
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
                                            {attGroup.attributes.map((att) => (
                                                attGroup.attribute_group_code === 'image-management'
                                                    ? <ImageManagement key={att.attribute_code} {...props} {...att} setImgConfig={setImgConfig} />
                                                    : (
                                                        <div className={classes.gridAttribute} key={att.attribute_code}>
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
                    <OptionsContent formik={formik} t={t} handleClose={() => setOpenOptions(false)} />
                </DialogContent>
            </Dialog>

            <Dialog
                className={classes.dialogConfig}
                fullWidth
                maxWidth="xl"
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <DialogTitle>
                    {t('productlist:Create_Product_Configurations')}
                </DialogTitle>
                <DialogContent>
                    <Steppers formik={formik} t={t} onCancel={() => setShowModal(false)} refetch={refetch} dataAtt={dataAtt} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductListEditContent;
