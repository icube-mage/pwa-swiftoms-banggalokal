/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import useStyles from '@modules/productlist/plugins/attributecomponents/style';
import { withStyles } from '@material-ui/core/styles';

import Autocomplete from '@common_autocomplete';
import Select from '@common_select';
import TextField from '@common_textfield';
import DropFile from '@common_dropfile';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

export const AttributeComponents = ({
    formik, attribute_code, attribute_options,
    is_readonly, frontend_input,
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
                disabled={is_readonly}
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
                        disabled={is_readonly}
                        checked={formik.values[attribute_code]}
                        onChange={formik.handleChange}
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

export const ImageManagement = ({ handleDropFile, setImgConfig, formik }) => {
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

export default { ImageManagement, AttributeComponents };
