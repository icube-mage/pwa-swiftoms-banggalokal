/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import Autocomplete from '@common_autocomplete';
import gqlChannel from '@modules/channel/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/categorybychannel/pages/import/components/style';

const CategoryImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelList, getChannelListRes] = gqlChannel.getChannelList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/product/categorybychannel')}
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
            <h2 className={classes.titleTop}>Category Upload</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                <div className={classes.content}>
                    <div className={clsx(classes.formField, 'textRight')}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>Download the Sample CSV</a>
                        </span>
                    </div>
                    <div className={clsx(classes.formField, 'textLeft')}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Select Channel</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            value={formik.values.channelCode}
                            className={classes.autocompleteRoot}
                            onChange={(e) => {
                                formik.setFieldValue('channelCode', e);
                            }}
                            loading={getChannelListRes?.loading}
                            options={
                                getChannelListRes
                            && getChannelListRes.data
                            && getChannelListRes.data.getChannelList
                            && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            primaryKey="channel_code"
                            labelKey="channel_name"
                            error={!!(formik.touched.channelCode && formik.errors.channelCode)}
                            helperText={(formik.touched.channelCode && formik.errors.channelCode) || ''}
                        />
                        <br />
                        <br />
                        <DropFile
                            title="Please select the file : "
                            error={(
                                (formik.errors.binary && formik.touched.binary)
                            )}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                        disabled={!formik.values.binary}
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default CategoryImport;
