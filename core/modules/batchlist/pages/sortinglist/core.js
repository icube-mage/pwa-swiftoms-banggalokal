import Layout from '@layout';
import gqlService from '@modules/batchlist/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const batchId = router.query?.id;

    const pageConfig = {
        title: t('batchlist:Sorting_List'),
    };

    const [getPickByBatchSortList, { data, loading }] = gqlService.getPickByBatchSortList();

    const contentProps = {
        getPickByBatchSortList,
        data,
        loading,
        batchId,
        t,
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
