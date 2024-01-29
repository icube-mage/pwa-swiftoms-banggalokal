import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/myaccount/pages/default/components/style';

const AdminStoreCreateContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.titleTop}>
                My Account
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Firstname</span>
                        </div>

                        <TextField
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            className={classes.fieldRoot}
                            variant="outlined"
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            helperText={(formik.touched.firstname && formik.errors.firstname) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Lastname</span>
                        </div>

                        <TextField
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            className={classes.fieldRoot}
                            variant="outlined"
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            helperText={(formik.touched.lastname && formik.errors.lastname) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Email</span>
                        </div>

                        <TextField
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={classes.fieldRoot}
                            variant="outlined"
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                            error={!!(formik.touched.email && formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>New Password</span>
                        </div>
                        <TextField
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className={classes.fieldRoot}
                            variant="outlined"
                            type="password"
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default AdminStoreCreateContent;
