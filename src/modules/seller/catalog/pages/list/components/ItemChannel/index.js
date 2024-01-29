/* eslint-disable no-console */
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import Progressbar from '../ProgressBar';

const ItemChannel = ({
    t,
    item,
    loading,
    onPushSingleChannel,
    dataProductProcess,
    dataProductTotal,
    dataProductLastSync,
    sendToGTM,
    type = 'push',
}) => {
    const [loadingBtn, setLoadingBtn] = React.useState(false);
    const [countdown, setCountdown] = React.useState(false);
    const [isRun, setIsRun] = React.useState(false);

    const onClickItemSync = async () => {
        setLoadingBtn(true);
        await onPushSingleChannel(item);
        sendToGTM(item);
        setLoadingBtn(false);
    };

    const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

    const formatDate = (inputDate) => {
        if (inputDate) {
            const regexPattern = /^(\d{2})\s([a-zA-Z]+)\s(\d{4})\s(\d{2})\.(\d{2})\.(\d{2})$/;
            const match = inputDate.match(regexPattern);

            if (match) {
                const day = match[1];
                const month = match[2];
                const year = match[3];
                const hour = match[4];
                const minute = match[5];
                const second = match[6];
                return `${month} ${year},${day} ${hour}:${minute}:${second}`;
            }
        }

        return inputDate;
    };

    const countdownInterval = () => {
        const getFinishedTime = new Date(formatDate(item?.activity?.started_at)).getTime() + (60 * 16 * 1000);
        setTimeout(() => {
            const curentTime = new Date().getTime();
            const distance = getFinishedTime - curentTime;
            const minutes = addLeadingZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            const seconds = addLeadingZero(Math.floor((distance % (1000 * 60)) / 1000));
            setCountdown(`${minutes}:${seconds}`);

            if (distance > 0) {
                setIsRun(true);
                countdownInterval();
            } else {
                setIsRun(false);
                setCountdown('');
            }
        }, 1000);
    };

    React.useEffect(async () => {
        if (isRun === false && type === 'pull' && ['finished', 'stopped'].includes(item?.activity?.run_status)) {
            countdownInterval();
        }
    }, [item]);

    return (
        <div className="item-channel-container">
            <div className={clsx('item-channel-left', { loading })}>
                <div className="item-channel-left-icon">
                    { item?.image_url && <img src={item?.image_url} alt="icon channel item" /> }
                </div>
                <div className="item-channel-left-content">
                    <div className="title">
                        {item?.channel_name ?? ''}
                    </div>
                    <div className="snapshot">
                        { loading && (dataProductProcess > 0
                            ? <Progressbar value={dataProductProcess} total={dataProductTotal} />
                            : <LinearProgress />
                        )}
                        {
                            loading && (
                                <div className="info">
                                    {dataProductProcess ? t('catalog:in_progress') : t('catalog:data_is_being_prepared')}
                                </div>
                            )
                        }
                        {
                            (!loading && dataProductLastSync) && (
                                <span className="info">
                                    { `${t('common:last_sync')} - ${dataProductLastSync}`}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="item-channel-right">
                {type === 'pull' ? countdown : ''}
                {
                    !loading && (countdown === '' || type === 'push') && (
                        <button
                            type="button"
                            onClick={onClickItemSync}
                        >
                            <img src={loadingBtn ? '/assets/img/loader.gif' : '/assets/img/icon_sync.svg'} alt="icon sync" />
                        </button>
                    )
                }

            </div>
        </div>
    );
};

export default ItemChannel;
