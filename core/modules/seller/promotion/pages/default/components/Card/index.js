import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@common_button';

import useStyles from '@sellermodules/promotion/pages/default/components/Card/style';

const ShippingCard = (props) => {
    const {
        label, value, description, buttonLabel,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} onClick={() => router.push(`/seller/promotion/${value}`)}>
            <CardContent className={clsx(classes.content, 'title')}>
                <div
                    className={classes.imgBack}
                >
                    <img className={classes.icon} src={`/assets/img/sellericon/${value}.svg`} alt={value} />
                </div>
            </CardContent>
            <div>
                <CardContent className={clsx(classes.content, 'title')}>
                    <div className={classes.name}>{label}</div>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardContent>
                <CardContent className={classes.content}>
                    <div className={classes.description}>{description}</div>
                </CardContent>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.collapseContent}>
                    <Button className={classes.btn} onClick={(e) => { e.stopPropagation(); router.push(`/seller/promotion/${value}`); }}>
                        {buttonLabel}
                    </Button>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ShippingCard;
