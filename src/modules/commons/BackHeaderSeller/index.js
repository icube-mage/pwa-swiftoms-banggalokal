import clsx from 'clsx';
import Link from 'next/link';

import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import useStyles from '@common_backheaderseller/style';

const BackHeaderSeller = (props) => {
    const { title, route } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.headerContainer, 'hidden-mobile')}>
            <Link href={route}>
                <a className="left">
                    <ArrowBackOutlinedIcon />
                    <h2 className={classes.title}>{title}</h2>
                </a>
            </Link>
        </div>
    );
};

export default BackHeaderSeller;
