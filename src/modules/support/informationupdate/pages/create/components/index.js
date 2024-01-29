/* eslint-disable */
import React, { useState } from 'react';
import TextEditor from '@common_texteditor';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/support/informationupdate/pages/create/components/style';

const InformationUpdateAddContent = (props) => {
    const { formik, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const [imageBase64, setImageBase64] = React.useState('');
    const imgRef = React.useRef();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64(reader.result);
            formik.setFieldValue("image", reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    
    const isCompleteForm = () => {
        const title = formik.values.title.trim();
        const body = formik.values.body.trim();
        const description = formik.values.description.replace(/<[^>]+>/g, '').trim();

        if (title && body && description) {
            return true;
        }
        return false;
    };

    return (<>
        <Button className={classes.btnBack} onClick={() => router.push('/support/informationupdate')} variant="contained" style={{ marginRight: 30 }}>
            <ChevronLeftIcon
                style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </Button>
        <h2 className={classes.titleTop} style={{marginLeft: 20}}>{t('create_publish')}</h2>
        <div></div>
        <Paper className={classes.container1}>
            <div className={classes.content}>
                <div className={classes.marginSection}>
                    <div className={classes.divLabel}>
                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('title')}</span>
                    </div>
                    <input
                        className={classes.fieldRoot}
                        variant="outlined"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.marginSection}>
                    <div className={classes.divLabel}>
                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('short_description')}</span>
                    </div>
                    <textarea
                        className={classes.fieldRootArea}
                        variant="outlined"
                        name="body"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={classes.marginSection}>
                    <div className={classes.divLabel}>
                        <span className={[classes.label, classes.labelRequired].join(' ')}>{t('long_description')}</span>
                    </div>
                    <TextEditor
                        variant="outlined"
                        name="description"
                        value={formik.values.description}
                        onChange={(e) => {
                            formik.setFieldValue('description', e);
                        }}
                        style={{ height: 350, marginTop: 10 }}
                    />
                </div>
                <div style={{marginTop: 50}}></div>
            </div>
        </Paper>
        <Paper className={classes.container2}>
            <div className={classes.content}>
                <div className={classes.marginSection}>
                    <div className={classes.divLabel} style={{ marginBottom: 10 }}>
                        <span className={classes.label}>{t('image')}</span>
                    </div>
                    { imageBase64 ? (
                        <img
                            className={classes.imageUpload}
                            src={imageBase64}
                            onClick={() => imgRef.current.click()}
                        />
                    ) : (
                        <img
                            className={classes.imageUpload}
                            src="/assets/img/placeholder_image.jpg"
                            onClick={() => imgRef.current.click()}
                            style={{ padding: 0 }}
                        />
                    )}
                    <p><i style={{ fontSize: 13, color: "#c1c1c1" }}>* {t('Click_to_select_image')}</i></p>
                    
                    <input
                        type="file"
                        ref={imgRef}
                        style={{ display: "none" }}
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className={classes.marginSection}>
                    <Button disabled={!isCompleteForm()} className={classes.btn} onClick={isCompleteForm() && formik.handleSubmit} variant="contained">
                        {t('publish')}
                    </Button>
                </div>
            </div>
        </Paper>
        <div style={{ height: 50 }}></div>
    </>);
};

export default InformationUpdateAddContent;
