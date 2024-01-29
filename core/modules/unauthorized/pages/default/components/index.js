import useStyles from '@modules/unauthorized/pages/default/components/style';

const ErrorContent = (props) => {
    const { t } = props;
    const classes = useStyles();

    return (
        <>
            <div className={classes.error}>
                <div className={classes.wrapper}>
                    <img src="/assets/img/Warning.svg" alt="warning" />
                    <h2 className={classes.h2}>{t('common:Sorry_you_need_permission_to_access_this_feature')}</h2>
                </div>
            </div>
        </>
    );
};

export default ErrorContent;
