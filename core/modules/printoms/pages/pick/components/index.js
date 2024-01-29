/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/printoms/pages/pick/components/style';

const PrintPickContent = (props) => {
    const {
        pickList,
    } = props;
    const classes = useStyles();
    // const [show, setShow] = useState('non-hide');

    React.useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, [pickList]);

    return (
        <>
            <Paper className={classes.container}>
                {/* <div className={classes.content}>
                    <img className="imgIcon" alt="" src="/assets/img/swiftoms_logo_expanded.png" />
                    <h2 className={classes.titleTop}>Pick List</h2>
                    <h5 className={classes.title}>
                        Print Date :
                        {pickList.printDate}
                    </h5>
                    <Button
                        onClick={() => {
                            setShow('hide');
                            setTimeout(() => {
                                window.print();
                            }, 100);
                            setTimeout(() => {
                                setShow('non-hide');
                            }, 1000);
                        }}
                        className={show}
                    >
                        Print
                    </Button>
                </div> */}
                <div className={classes.content}>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Qty</th>
                            </tr>
                            {pickList.printItem.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.sku}</td>
                                    <td className={classes.td}>{e.name}</td>
                                    <td className={classes.td}>{e.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default PrintPickContent;
