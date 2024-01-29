/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import useStyles from '@common_boxcardsimpletab/style';
import Link from 'next/link';
import classNames from 'classnames';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createExcerpt } from '@helper_text';

const BoxCardSimpleTab = ({
    dataTabs,
    baseUrl,
    onCloseTabCallback,
    urlPlusHref,
    onPreventHandleClick,
}) => {
    const classes = useStyles();
    const router = useRouter();
    const routerQuery = router?.query;
    const urlPlusHrefQuery = { path: urlPlusHref, query: { ...routerQuery, channel: 'add' } };

    return (
        <div className={classNames('box-card-simple-tab', classes.boxCardSimpleTabContainer)}>
            <ul>
                {dataTabs && dataTabs.map((item, index) => {
                    const channelCode = item?.channel_code ?? item?.code;
                    const channelIcon = item?.image_url ?? item?.logo;
                    const channelName = item?.channel_name ?? item?.name;
                    const defaultChannelCode = dataTabs[0].channel_code ?? dataTabs[0].code;
                    const link = { path: baseUrl, query: { ...routerQuery, channel: channelCode } };
                    const onClickButtonClose = !onCloseTabCallback ? () => {} : () => onCloseTabCallback(item);
                    const isActive = routerQuery?.channel ? routerQuery?.channel === channelCode : channelCode === defaultChannelCode;
                    return (
                        <li key={`card-simple-item-${index}`} className={clsx('card-simple-simple-item', { active: isActive })}>
                            <Link
                                key={`card-simple-item-link-${index}`}
                                href={link}
                            >
                                <a className={clsx('card-simple-item-link-anchor', { active: isActive })} onClick={(event) => onPreventHandleClick(event, link)}>
                                    <img src={channelIcon} alt="icon channel" />
                                    {createExcerpt(channelName, 15)}
                                </a>
                            </Link>
                            <button type="button" onClick={onClickButtonClose}>
                                <img src="/assets/img/icon_close_circle_red.svg" alt="icon close circle red" />
                            </button>
                        </li>
                    );
                })}
                {
                    urlPlusHref && (
                        <li key="card-simple-item-add" className={clsx('card-simple-item-add', { empty: dataTabs?.length < 1 })}>
                            <Link
                                key="card-simple-item-link-add"
                                href={urlPlusHrefQuery}
                            >
                                <a
                                    className={clsx('card-simple-item-link-add-anchor', { active: routerQuery?.channel === 'add' })}
                                    onClick={(event) => onPreventHandleClick(event, urlPlusHrefQuery)}
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14.5" height="14.5" viewBox="0 0 14.5 14.5">
                                            <g id="Group_3817" data-name="Group 3817" transform="translate(-54.311 -16.844)">
                                                <g id="Group_3843" data-name="Group 3843">
                                                    <path id="Path_191" data-name="Path 191" d="M60.5,27.594v-13" transform="translate(1.057 3)" fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                                    <path id="Path_2051" data-name="Path 2051" d="M60.5,27.594v-13" transform="translate(82.655 -36.41) rotate(90)" fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </a>
                            </Link>
                        </li>
                    )
                }
                <div className="clear" />
            </ul>
        </div>
    );
};

export default BoxCardSimpleTab;
