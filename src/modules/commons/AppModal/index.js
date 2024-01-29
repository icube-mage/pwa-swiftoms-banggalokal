import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '@common_appmodal/style';
import Button from '@common_button/index';
import clsx from 'clsx';
import { BLACK } from '@theme_color';

const AppModal = ({
    bottom,
    className,
    children,
    show = false,
    title = 'Title',
    closeButton,
    onHandleClose,
    negativeLabel = 'Negative',
    negativeIcon,
    onClickNegative,
    positiveLabel = 'Positive',
    positiveIcon,
    onClickPositive,
    positiveDisable,
    positiveButtonFullWidth,
    classNameNegative,
    classNamePositive,
}) => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={clsx(classes.appModalContainer, bottom && classes.appModalContainerBottom, className)}
            open={show}
            onClose={onHandleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <div className="container">
                {
                    (title || closeButton) && (
                        <div className="header">
                            {
                                title && (
                                    <div className="title">{title}</div>
                                )
                            }
                            {
                                closeButton && (
                                    <button type="button" className="btn-close" onClick={onHandleClose}>
                                        <img src="/assets/img/icon_close.svg" alt="icon close" />
                                    </button>
                                )
                            }
                        </div>
                    )
                }
                <div className="content">
                    {children}
                </div>
                {
                    (onClickNegative || onClickPositive) && (
                        <div className={clsx('footer')}>
                            {
                                onClickNegative && (
                                    <Button
                                        className={classNameNegative}
                                        bg="transparent"
                                        color={BLACK}
                                        classic
                                        classicButtonIcon={negativeIcon}
                                        classicButtonLabel={negativeLabel}
                                        classicButtonOnClick={onClickNegative}
                                    />
                                )
                            }
                            {
                                onClickPositive && (
                                    <Button
                                        className={clsx(classNamePositive, { fullWidth: positiveButtonFullWidth })}
                                        disabled={positiveDisable}
                                        classic
                                        classicButtonIcon={positiveIcon}
                                        classicButtonLabel={positiveLabel}
                                        classicButtonOnClick={onClickPositive}
                                    />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </Modal>
    );
};

export default AppModal;
