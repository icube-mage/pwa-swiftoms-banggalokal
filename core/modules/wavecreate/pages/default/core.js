import Layout from '@layout';
import gqlService from '@modules/wavecreate/services/graphql';
import aclService from '@modules/theme/services/graphql';
import Router from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const { data, loading } = gqlService.getSummaryShipmentToPick();
    const [createPickByWave] = gqlService.createPickByWave();

    const autoGenerate = () => {
        window.backdropLoader(true);
        createPickByWave({
            variables: {
                is_auto: true,
            },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('createpickbywave:Pick_list_has_been_created'),
                    variant: 'success',
                });
                setTimeout(() => Router.push(`/pickpack/wavelist/picklist/${res.data.createPickByWave.pick_by_wave.entity_id}`), 250);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_create',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        Router.push('/');
    }

    const contentProps = {
        data,
        loading,
        autoGenerate,
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
