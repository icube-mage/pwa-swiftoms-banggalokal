/* eslint-disable react/no-danger */
import Loading from '@common_loaders/Backdrop';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import useStyles from '@modules/cms/pages/default/components/style';

const CmsPage = (props) => {
    const {
        data, t, loading, error,
    } = props;
    const classes = useStyles();

    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {t('common:error:fetchError')}
            </Alert>
        );
    }
    if (loading) return <Loading open={loading} />;
    return (
        <>
            <div className={clsx(classes.cmsContainer, 'cms-container')}>
                {/* eslint-disable-next-line react/no-danger */}
                <h4 className={classes.titleCenter} dangerouslySetInnerHTML={{ __html: data.cmsPage.content_heading }} />
                <div className="content" dangerouslySetInnerHTML={{ __html: data.cmsPage.content }} />
            </div>
        </>
    );
};

export default CmsPage;
