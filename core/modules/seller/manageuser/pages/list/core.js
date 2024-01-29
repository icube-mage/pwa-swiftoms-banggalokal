import React, { useState } from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/manageuser/services/graphql';
import BackdropLoad from '@helper_backdropload';
import cookies from 'js-cookie';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const [open, setOpen] = useState(false);
    const [dataUser, setDataUser] = useState({});

    const pageConfig = {
        title: t('sellermanageuser:Manage_User'),
    };
    const [getSellerUsers, { data, loading, refetch }] = gqlService.getLazySellerUsers();
    const [deleteSellerUser] = gqlService.deleteSellerUser();
    const { data: dataLoc, loading: loadLoc } = gqlService.getLocationList({
        pageSize: 1000,
        currentPage: 1,
        filter: {
            company_id: { eq: cookies.getJSON('cdt')?.customer_company_code },
        },
    });

    const handleDelete = () => {
        setOpen(false);
        window.backdropLoader(true);
        deleteSellerUser({
            variables: { ids: [dataUser.id] },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('sellermanageuser:User_has_been_deleted'),
                variant: 'success',
            });
            setDataUser({});
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            setOpen(true);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(loadLoc);
    }, [loadLoc]);

    if (loadLoc) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
        getSellerUsers,
        data,
        loading,
        refetch,
        handleDelete,
        dataLocations: dataLoc?.getLocationList?.items || [],
        dataUser,
        setDataUser,
        open,
        setOpen,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
