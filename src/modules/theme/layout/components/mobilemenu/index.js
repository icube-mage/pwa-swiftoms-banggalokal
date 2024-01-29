/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@i18n';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import useStyles from '@modules/theme/layout/components/mobilemenu/style';

const MobileMenu = () => {
    const router = useRouter();
    const classes = useStyles();
    const { t } = useTranslation('menu');

    const [value, setValue] = React.useState('recents');
    const path = router.pathname;

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
        case 'beranda':
            router.push('/seller/dashboard');
            break;
        case 'katalog':
            router.push('/seller/catalog');
            break;
        case 'pesanan':
            router.push('/seller/order');
            break;
        default:
            break;
        }
    };

    React.useEffect(() => {
        if (path.includes('/dashboard')) {
            setValue('beranda');
        } else if (path.includes('/catalog')) {
            setValue('katalog');
        } else if (path.includes('/order')) {
            setValue('pesanan');
        }
    }, [router]);

    const dashboardIcon = <img className="itemIcon" alt="" src="/assets/img/layout/seller/dashboard.svg" />;
    const katalogIcon = <img className="itemIcon" alt="" src="/assets/img/layout/seller/catalog.svg" />;
    const pesananIcon = <img className="itemIcon" alt="" src="/assets/img/layout/seller/order.svg" />;

    return (
        <BottomNavigation showLabels value={value} onChange={handleChange} className={classes.Footer}>
            <BottomNavigationAction label={t('menu:beranda')} value="beranda" icon={dashboardIcon} />
            <BottomNavigationAction label={t('menu:Catalog')} value="katalog" icon={katalogIcon} />
            <BottomNavigationAction label={t('menu:Order')} value="pesanan" icon={pesananIcon} />
        </BottomNavigation>
    );
};

export default MobileMenu;
