import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '@modules/productlist/plugins/imageconfig/style';

import Select from '@common_select';
import Button from '@common_button';

const ImageConfig = (props) => {
    const {
        imgConfig, setImgConfig, formik, t,
    } = props;
    const classes = useStyles();
    const { name, labelName } = imgConfig;
    const formikName = labelName && name ? `${name}[${labelName}]` : name;
    const formikValues = labelName && formik.values[name] ? formik.values[name][labelName] : formik.values[name];

    const typeOptions = [
        { label: t('productlist:Base'), value: 'image' },
        { label: t('productlist:Small'), value: 'small_image' },
        { label: t('productlist:Swatch'), value: 'swatch_image' },
        { label: t('productlist:Thumbnail'), value: 'thumbnail' },
    ];

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
        let temp = [...formikValues];
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
        formik.setFieldValue(formikName, temp);
        setImgConfig({ open: false, data: {}, index: null });
    };

    return (
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
                    dataOptions={Array.from(Array(formikValues?.length + 1).keys()).map((e) => (
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
    );
};

export default ImageConfig;
