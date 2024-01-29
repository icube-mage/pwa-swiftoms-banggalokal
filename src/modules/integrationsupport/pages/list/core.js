import Layout from '@layout';
import gqlService from '@modules/integrationsupport/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import { getHost } from '@helper_config';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [getMarketplaceIntegrationRequestList, { data, loading, refetch }] = gqlService.getMarketplaceIntegrationRequestList();
    const [updateMarketplaceIntegrationRequest] = gqlService.updateMarketplaceIntegrationRequest();

    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [marketplace, setMarketplace] = React.useState(null);
    const [remoteCompanyId, setRemoteCompanyId] = React.useState(null);
    const [actionStatus, setActionStatus] = React.useState(0);
    const [brandId, setBrandId] = React.useState(null);

    const [getSellerMpCredentials, { data: mpData }] = gqlService.getSellerMpCredentials();
    const [integrateMarketplaceIntegrationRequest] = gqlService.integrateMarketplaceIntegrationRequest();
    const [registerBrandByAdmin] = gqlService.registerBrandByAdmin();

    React.useEffect(async () => {
        if (actionStatus === 0 && marketplace && marketplace?.marketplace_code) {
            setActionStatus(1);
            const registerBrand = await registerBrandByAdmin({
                variables: {
                    marketplace_code: marketplace?.marketplace_code,
                    remote_company_id: remoteCompanyId || '',
                },
            });
            if (registerBrand?.data?.registerBrandByAdmin) {
                await getSellerMpCredentials({
                    variables: {
                        marketplace_code: marketplace.marketplace_code,
                        callback_url: `${getHost()}${router.asPath}?`,
                        brand_id: registerBrand?.data?.registerBrandByAdmin,
                    },
                });
                setBrandId(registerBrand?.data?.registerBrandByAdmin);
            }
            setActionStatus(2);
        }
    }, [marketplace, mpData]);

    const handleUpdateStatus = (id, status) => {
        const variables = {
            id,
            status,
        };

        if (status === 'integration') {
            setOpen(true);
        } else {
            window.backdropLoader(true);
            updateMarketplaceIntegrationRequest({
                variables,
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('integrationsupport:Status_has_been_updated'),
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        }
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'marketplace_integration_support',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        getMarketplaceIntegrationRequestList,
        handleUpdateStatus,
        data,
        loading,
        t,
        integrateMarketplaceIntegrationRequest,
        marketplace_data: mpData?.getSellerMpCredentials?.marketplaces?.[0],
        open,
        setOpen,
        marketplace,
        setMarketplace,
        refetch,
        setRemoteCompanyId,
        setActionStatus,
        actionStatus,
        brandId,
        setBrandId,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
