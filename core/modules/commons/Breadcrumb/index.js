/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import clsx from 'clsx';
import useStyles from '@common_breadcrumb/style';
import { useTranslation } from '@i18n';

const CustomBreadcrumb = ({ data = [] }) => {
    const { t } = useTranslation('common');
    const styles = useStyles();
    return (
        <List className={clsx(styles.flexContainer, styles.containerMobile)}>
            {data?.slice(1)?.map((breadcrumb, index) => (
                <div key={index}>
                    <ListItem className={styles.breadcrumbItem}>
                        <Link href={breadcrumb.url}>
                            <a className={styles.flexContainer} href={breadcrumb.url}>
                                <span className={styles.breadcrumbActive}>{breadcrumb.label}</span>
                                <span className={styles.breadcrumbSeparator}>{index === data.length - 2 ? '' : '/'}</span>
                            </a>
                        </Link>
                    </ListItem>
                </div>
            ))}
        </List>
    );
};

export default CustomBreadcrumb;
