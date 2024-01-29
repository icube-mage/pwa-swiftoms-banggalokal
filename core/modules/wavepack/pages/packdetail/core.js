/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const [showModal, setShowModal] = React.useState(false);
    const [nextShipment, setNextShipment] = React.useState(null);
    const packlist = data.getPackList.data[0];

    const packList = {
        entityId: packlist.entity_id,
        id: packlist.increment_id,
        shipmentId: packlist.channel_order_increment_id,
        statusLabel: packlist.status.label,
        statusValue: packlist.status.value,
        firstName: packlist.shipping_address.firstname,
        lastName: packlist.shipping_address.lastname,
        telephone: packlist.shipping_address.telephone,
        street: packlist.shipping_address.street,
        city: packlist.shipping_address.city,
        region: packlist.shipping_address.region,
        postcode: packlist.shipping_address.postcode,
        countryId: packlist.shipping_address.country_id,
        country: packlist.shipping_address.country_name,
        slot: packlist.slot_no,
        items: packlist.items,
        pick_id: packlist.pick_id,
        shipping: packlist.channel_shipping_label,
    };

    const [packShipment] = gqlService.packShipment();

    const [donePickByWavePacking] = gqlService.donePickByWavePacking({
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res && res.donePickByWavePacking && res.donePickByWavePacking.next_shipment_id_to_pack) {
                setNextShipment(res.donePickByWavePacking.next_shipment_id_to_pack);
            }
            setShowModal(true);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleDone = async () => {
        window.backdropLoader(true);
        await packShipment({
            variables: {
                id: [Number(packList.entityId)],
            },
        });
        donePickByWavePacking({
            variables: {
                id: Number(packList.pick_id),
                shipment_id: Number(packlist.entity_id),
            },
        });
    };

    const contentProps = {
        packList,
        handleDone,
        showModal,
        setShowModal,
        nextShipment,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getPackList({
        id: [router && router.query && Number(router.query.id)],
    });

    const pageConfig = {
        title: `${t('packlist:Pack_by_Wave_ID')} ${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_packlist',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('packlist:Data_not_found');
        const redirect = '/pickpack/wavelist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
