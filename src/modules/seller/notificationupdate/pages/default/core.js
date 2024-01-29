import { useState, useRef, useEffect } from 'react';

import Layout from '@layout';
import BackdropLoad from '@helper_backdropload';
import { setLocalStorage } from '@helper_localstorage';

import gqlService from '@sellermodules/notificationupdate/services/graphql';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('sellernotification:Update'),
    };

    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const [dataNotif, setDataNotif] = useState();
    const firstRender = useRef(true);

    const { loading } = gqlService.getInformationUpdateListQuery({
        variables: {
            pageSize: 5,
            currentPage: page,
            sort: {
                inserted_at: 'DESC',
            },
        },
        onCompleted: (res) => {
            firstRender.current = false;
            if (res && res.getInformationUpdateList && res.getInformationUpdateList.items) {
                setLocalStorage('system_update_count', res.getInformationUpdateList?.total_count);
                if (dataNotif?.items?.length) {
                    setDataNotif((prevNotif) => ({
                        ...prevNotif,
                        page_info: res.getInformationUpdateList.page_info,
                        items: [...prevNotif.items, ...res.getInformationUpdateList.items],
                    }));
                } else {
                    setDataNotif(res.getInformationUpdateList);
                }
            }
            setLoadMore(false);
        },
    });

    const handleLoadMore = () => {
        setLoadMore(true);
        setPage(page + 1);
    };

    const contentProps = {
        ...props,
        loadMore,
        handleLoadMore,
        firstRender,
        dataNotif,
    };

    useEffect(() => {
        BackdropLoad(loading && firstRender.current);
    }, [loading]);

    if (loading && firstRender.current) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
