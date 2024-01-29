/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import DropFile from '@common_dropfile';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';

const ImageManagement = (props) => {
    const {
        formik, handleDrop, name = '', labelName = '', setImgConfig, error, helperText,
    } = props;
    const formikName = labelName && formik.values[name] ? formik.values[name][labelName] : formik.values[name];
    const keyName = labelName ? name[labelName] : name;
    const classes = useStyles();
    return (
        <>
            <div className={classes.attLabelGrid}>
                {labelName
                    ? <div className={classes.attLabel}>{labelName}</div>
                    : null}
                <DropFile
                    formatFile=".jpg, .jpeg, .png, .gif"
                    getBase64={handleDrop}
                    showFiles={false}
                    multiple
                />
            </div>
            {error && helperText
                ? <span className={classes.errorText}>{helperText}</span>
                : null}
            {formik && formik.values && formikName?.length
                ? (
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {formikName.map((image, idx) => (
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
                                        onClick={() => setImgConfig({
                                            open: true, data: { ...image }, index: idx, name, labelName,
                                        })}
                                    /> */}
                                    <img
                                        src="/assets/img/trash.svg"
                                        alt="delete"
                                        className={classes.trashIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (image.id) {
                                                formik.setFieldValue(`${keyName}[${idx}].is_deleted`, true);
                                            } else {
                                                const temp = formikName;
                                                temp.splice(idx, 1);
                                                formik.setFieldValue(keyName, temp);
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
        </>
    );
};

export default ImageManagement;
