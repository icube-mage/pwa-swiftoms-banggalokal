import React from 'react';
import SectionHeader from '@sellermodules/dashboard/pages/default/components/sectionHeader';
import BoxCardIntro from '@sellermodules/dashboard/pages/default/components/boxCardIntro';
import BoxCard from '@common_boxcard/index';
import BoxCardItem from '@common_boxcard/item';
import BoxCardItemContainer from '@common_boxcard/itemContainer';
import Grid from '@material-ui/core/Grid';
import gqlService from '@sellermodules/dashboard/services/graphql/index';
import Intro from '@sellermodules/plugins/guide';

const filterByDays = (t) => [
    {
        id: 1,
        name: t('common:7_days_ago'),
        value: 7,
    },
    {
        id: 2,
        name: t('common:30_days_ago'),
        value: 30,
    },
];

// prevent rerendering
const BoxCardSecond = ({
    t,
}) => {
    const firstInitFilterDay = filterByDays(t)[0];
    const [selectedDays, setSelectedDays] = React.useState(firstInitFilterDay);
    const { loading, data, refetch } = gqlService.getSellerStorePerformance({
        days: firstInitFilterDay.value,
    });

    const getSellerStorePerformance = data?.getSellerStorePerformance;
    const productSold = getSellerStorePerformance?.sold_product;
    const linkReport = '/seller/report/store';

    const onBoxFilterCallback = React.useCallback(async (params) => {
        setSelectedDays(params.value);
        refetch({ days: params.value.value });
    }, []);

    return (
        <Grid item md={4} sm={6} xs={12}>
            <BoxCard
                t={t}
                gridWidth={12}
                boxPaddingLeft={7}
                boxPaddingRight={7}
                boxPaddingLeftMobile={20}
                boxPaddingRightMobile={20}
                boxTitle={t('common:summary_activity_performance')}
                boxDescription={`${t('common:last_update')}:`}
                boxFilter={filterByDays(t)}
                boxFilterSelectedLabel={selectedDays.name}
                boxFilterCallback={onBoxFilterCallback}
                content={(
                    <BoxCardItemContainer
                        labelDetail={t('common:view_report_detail')}
                        onClickLink={linkReport}
                    >
                        <BoxCardItem
                            t={t}
                            loading={loading}
                            title={t('common:product_sold')}
                            textHelp={t('common:product_sold_desc')}
                            textHelpPlacement="top"
                            textAmount={productSold}
                            labelButton={selectedDays.name}
                            gridWidth={12}
                        />
                    </BoxCardItemContainer>
                )}
            />
        </Grid>
    );
};

const HomeContent = (props) => {
    const {
        t,
        classes,
        loading,
        loadingSeller,
        dataSeller,
        orderNew,
        orderHomeDelivery,
        linkOrder,
        linkStock,
        updateStock,
        dataPicture,
    } = props;

    const propsFromParent = { t };

    return (
        <div id="seller-home" className={classes.sellerHomeContainer}>
            <SectionHeader
                {...propsFromParent}
                dataSeller={dataSeller}
                loadingSeller={loadingSeller}
                dataPicture={dataPicture}
            />
            <BoxCardIntro
                {...propsFromParent}
                title={t('common:ready_step_easy')}
                dataSeller={dataSeller}
                loadingSeller={loadingSeller}
            />
            {/* BOX 1 */}
            <Grid container className={classes.sellerBoxDashboard}>
                <Grid item md={4} sm={6} xs={12}>
                    <BoxCard
                        {...propsFromParent}
                        boxPaddingLeft={20}
                        boxPaddingRight={7}
                        boxPaddingLeftMobile={20}
                        boxPaddingRightMobile={20}
                        gridWidth={12}
                        boxTitle={t('common:summary_activity')}
                        boxDescription={t('common:sales_activity_completed')}
                        content={(
                            <BoxCardItemContainer
                                labelDetail={t('common:view_order_detail')}
                                onClickLink={linkOrder}
                            >
                                <BoxCardItem
                                    loading={loading}
                                    t={t}
                                    title={t('common:New_Order')}
                                    borderRight
                                    borderBottom
                                    textHelp={t('common:order_not_process_yet')}
                                    textHelpPlacement="top"
                                    textAmount={orderNew}
                                    labelButton={t('common:View_Detail')}
                                    gridWidth={6}
                                    gridWidthMobile={6}
                                    onClickLink={linkOrder}
                                />
                                <BoxCardItem
                                    t={t}
                                    loading={loading}
                                    title={t('common:update_stock')}
                                    borderBottom
                                    textHelp={t('common:update_stock_need')}
                                    textHelpPlacement="top"
                                    textAmount={updateStock}
                                    labelButton={t('common:View_Detail')}
                                    gridWidth={6}
                                    gridWidthMobile={6}
                                    onClickLink={linkStock}
                                />
                                <BoxCardItem
                                    t={t}
                                    loading={loading}
                                    title={t('common:delivery_order')}
                                    textHelp={t('common:delivery_order_need')}
                                    textHelpPlacement="top"
                                    textAmount={orderHomeDelivery}
                                    labelButton={t('common:View_Detail')}
                                    gridWidth={12}
                                    onClickLink={linkOrder}
                                />
                            </BoxCardItemContainer>
                        )}
                    />
                </Grid>

                {/* BOX 2 */}
                <BoxCardSecond {...propsFromParent} />

            </Grid>
            <Intro page="HOMEPAGE" />
        </div>
    );
};

export default HomeContent;
