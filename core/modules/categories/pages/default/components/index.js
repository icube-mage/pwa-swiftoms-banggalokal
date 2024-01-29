/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@common_textfield';
import Button from '@common_button';
import Tabs from '@common_tabsseller';
import Switch from '@common_switch';
import TextEditor from '@common_texteditor';

import { breakPointsUp } from '@helper_theme';
import Tree from '@modules/categories/pages/default/components/Tree';
import Confirmation from '@modules/categories/pages/default/components/Confirmation';
import useStyles from '@modules/categories/pages/default/components/style';

const ChannelCreateContent = (props) => {
    const {
        t, categories, loading, handleDelete, open, setOpen, nodeAct,
        formik, addMode, setAddMode,
    } = props;
    const classes = useStyles();
    const desktop = breakPointsUp('md');
    const [tab, setTab] = useState('all');
    const dataTabs = [
        { label: t('sellercatalog:General'), value: 'all' },
    ];

    return (
        <>
            <Paper className={classes.container}>
                <h2 className={classes.title}>{t('categories:Categories')}</h2>
                <div className={clsx(classes.headContainer, 'end')}>
                    {addMode || formik.values?.id
                        ? (
                            <div className="flex">
                                {/* <Button className={clsx(classes.btn, 'secondary')}>{t('categories:Cancel')}</Button> */}
                                <Button className={classes.btn} onClick={formik.handleSubmit}>
                                    <img alt="" src="/assets/img/save-white.svg" className="icon" />
                                    {t('categories:Save')}
                                </Button>
                            </div>
                        )
                        : null}
                </div>
                <Grid container>
                    <Grid item xs={12} md={5} className={classes.gridLeft}>
                        <div className={clsx(classes.headContainer, 'grid')}>
                            <h2 className={clsx(classes.title, 'grid')}>{t('categories:Categories')}</h2>
                        </div>
                        {loading ? <div className={classes.progress}><CircularProgress /></div>
                            : categories.length ? <Tree {...props} setAddMode={setAddMode} />
                                : (
                                    <Button
                                        className={classes.btnAdd}
                                        onClick={() => setAddMode(!addMode)}
                                    >
                                        {t('categories:Add_New_Categories')}
                                    </Button>
                                )}
                    </Grid>
                    <Grid item xs={12} md={7} className={classes.gridRight}>
                        {addMode || formik.values?.id ? (
                            <>
                                <Tabs data={dataTabs} transparent onChange={(e, v) => setTab(v)} value={tab} allItems={false} />
                                <Paper className={classes.paperForm}>
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid item xs={12} md={9}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <InputLabel htmlFor="name" className={classes.label}>
                                                    {t('categories:Name')}
                                                </InputLabel>
                                                <TextField
                                                    id="name"
                                                    name="name"
                                                    className={classes.textInput}
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    error={!!(formik.touched.name && formik.errors.name)}
                                                    helperText={(formik.touched.name && formik.errors.name) || ''}
                                                />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)} style={{ paddingTop: desktop ? 20 : 0 }}>
                                                <Switch
                                                    id="is_active"
                                                    name="is_active"
                                                    value={formik.values.is_active}
                                                    onChange={formik.handleChange}
                                                    trueLabel={t('categories:Activate')}
                                                    falseLabel={t('categories:Deactivate')}
                                                    usePrimary={false}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                                <InputLabel htmlFor="description" className={classes.label}>
                                                    {t('categories:Description')}
                                                </InputLabel>
                                                <TextEditor
                                                    id="description"
                                                    className={classes.fieldRoot}
                                                    name="description"
                                                    value={formik.values.description}
                                                    onChange={(e) => formik.setFieldValue('description', e)}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </>
                        )
                            : (
                                <div className={classes.divRight}>
                                    <div>
                                        <img alt="" src="/assets/img/stack.svg" className="icon" />
                                        <div className="title">
                                            {t('categories:No_category_selected')}
                                        </div>
                                        <div className="subtitle">
                                            {t('categories:Manage_categories_here')}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </Grid>
                </Grid>
            </Paper>
            <Confirmation
                open={open}
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
                nodeAct={nodeAct}
                t={t}
            />
        </>
    );
};

export default ChannelCreateContent;
