/* eslint-disable no-shadow */
/* eslint-disable radix */
import { useState, useEffect } from 'react';
import Layout from '@layout';
import {
    getSessionMessageList, getMessageList, addMessage, getStoreConfig, getAgentCode,
} from '@sellermodules/chat/services/graphql/index';
import firebaseApp from '@lib_firebase/index';
import {
    generateCombinedUser, generateGroupedMessages, combinedMessagesData, filteredUser,
} from '@sellermodules/chat/helpers/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: 'Seller Chat',
    };

    const { loading: loadChat, data: dataChat } = getStoreConfig({
        path: 'swiftoms_vendorportal/seller_chat/enable_chat',
    });

    const db = firebaseApp.firestore();
    const [isMobile, setIsMobile] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [searchUser, setSerchUser] = useState('');
    const [searchText, setSearchText] = useState('');

    const { data: agentData } = getAgentCode();
    const agentCode = agentData
        && agentData.customer
        && agentData.customer.customer_company_code;

    const { data, loading, refetch } = getSessionMessageList({
        variables: {
            agent_code: agentCode,
        },
        skip: agentCode === undefined,
    });
    const [getMessage, { data: messageData }] = getMessageList();
    const [sendMessage] = addMessage();

    // user data
    const sessionUserData = data && data.getSessionMessageList;
    const combinedUserData = generateCombinedUser(sessionUserData, users);
    const filteredUserResult = filteredUser(searchUser, combinedUserData);

    // message data
    const magentoMessageData = messageData && messageData.getMessageList && messageData.getMessageList;
    const combinedMessageResult = combinedMessagesData(magentoMessageData, msgs);
    const combinedMessages = generateGroupedMessages(combinedMessageResult);

    const changeSize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    const changeSerchUser = (e) => {
        if (e.target.value === '') {
            setSerchUser('');
            setSearchText('');
        } else {
            setSearchText(e.target.value);
        }
    };

    const handleSeachUser = (e) => {
        e.preventDefault();
        setSerchUser(searchText);
    };

    // change unread messages to read messages when typing in form
    const onFocusDeleteRead = async (selectedChat) => {
        const adminReadChat = db.collection('messages')
            .doc(selectedChat.chatId)
            .collection('chat')
            .where('is_admin_read', 'in', [0]);

        const selectedDoc = db.collection('messages')
            .doc(selectedChat.chatId)
            .collection('chat');

        const docReference = db.collection('messages')
            .doc(selectedChat.chatId);

        await docReference.update({
            is_admin_read: 1,
        });

        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(selectedDoc.doc(doc.id), { is_admin_read: 1 });
            });
            await batch.commit();
        });
    };

    const selectUserToChat = async (user) => {
        setChat('');
        setChat(user);

        const idChat = user.chatId;

        // reference chat collection
        const chatReferance = db.collection('messages')
            .doc(idChat)
            .collection('chat')
            .orderBy('createdAt', 'asc');

        // collection messages doc id chat reference
        const docReference = db.collection('messages')
            .doc(idChat);

        // reference admin unread chat
        const adminUnreadChat = db.collection('messages')
            .doc(idChat)
            .collection('chat')
            .where('is_admin_read', 'in', [0]);

        // reference read chat
        const adminReadChat = db.collection('messages')
            .doc(idChat)
            .collection('chat')
            .where('is_admin_read', 'not-in', [0]);

        // select chat collection
        const selectUpdatedDoc = db.collection('messages')
            .doc(idChat)
            .collection('chat');

        // update messages doc id chat reference
        await docReference.update({
            is_admin_read: 1,
        });

        // delete read message to replace with graphql
        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(selectUpdatedDoc.doc(doc.id));
            });
            await batch.commit();
        });

        // update unread message chat to read message chat
        adminUnreadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(selectUpdatedDoc.doc(doc.id), { is_admin_read: 1 });
            });
            await batch.commit();
        });

        // listen incoming messages from collection chat
        chatReferance.onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.docs.forEach((doc) => {
                messages.push(doc.data());
            });
            setMsgs(messages);
        });

        // get message from grapql based on session id
        await getMessage({
            variables: {
                chat_session_id: user.chat_session_id,
            },
        });

        refetch();
    };

    const clearChat = () => {
        setChat('');
    };

    // submit chat
    const submitChat = async (data) => {
        const idChat = chat.chatId;
        // const chatReferance = db.collection('messages').doc(idChat).collection('chat');
        const docReference = db.collection('messages')
            .doc(idChat);

        await docReference.update({
            is_customer_read: 0,
            is_admin_read: 1,
        });

        // send into firebase
        // await chatReferance.add({
        //     createdAt: new Date().toISOString(),
        //     customer_email: chat.customer_email,
        //     customer_id: chat.customer_id,
        //     customer_name: chat.customer_name,
        //     displayName: `${chat.customer_name}-${chat.agent_name}`,
        //     is_customer_message: 'False',
        //     agent_code: chat.agent_code,
        //     agent_name: chat.agent_name,
        //     text: data,
        //     is_admin_read: 1,
        //     is_customer_read: 0,
        //     uid: '',
        // });

        // send into magento
        await sendMessage({
            variables: {
                body_message: data,
                chat_session_id: chat.chat_session_id,
                customer_email: chat.customer_email,
                // customer_id: parseInt(chat.customer_id),
                customer_name: chat.customer_name,
                is_robot: 0,
                agent_code: chat.agent_code,
                sender: 0,
                file: '',
            },
        });

        refetch();
    };

    const handleDropFile = async (files) => {
        // const fileName = files[0].file.name;
        const { baseCode } = files[0];

        const idChat = chat.chatId;
        const docReference = db.collection('messages')
            .doc(idChat);

        // send into magento
        if (baseCode) {
            await docReference.update({
                is_customer_read: 0,
                is_admin_read: 1,
            });

            await sendMessage({
                variables: {
                    body_message: '',
                    chat_session_id: chat.chat_session_id,
                    customer_email: chat.customer_email,
                    // customer_id: parseInt(chat.customer_id),
                    customer_name: chat.customer_name,
                    is_robot: 0,
                    agent_code: chat.agent_code,
                    sender: 0,
                    file: baseCode,
                },
            });

            refetch();
        }
    };

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            submitChat(values.message);
            resetForm();
        },
    });

    // get all list messeges
    useEffect(() => {
        let unsub = () => null;
        if (agentCode || agentCode === '') {
            const queryAdmin = db.collection('messages');
            const queryNonAdmin = db.collection('messages').where('agent_code', 'in', [agentCode]);
            const refereceUserDb = agentCode === '' ? queryAdmin : queryNonAdmin;
            unsub = refereceUserDb.onSnapshot((querySnapshot) => {
                const users = querySnapshot.docs.map((doc) => ({
                    chatId: doc.id,
                    ...doc.data(),
                }));
                setUsers(users);
            });
        }

        return unsub;
    }, [agentCode]);

    useEffect(() => {
        changeSize();
    }, []);

    useEffect(() => {
        if (!isMobile && firstLoad && filteredUserResult.length > 0) {
            selectUserToChat(filteredUserResult[0]);
            setFirstLoad(false);
        }
    }, [firstLoad, filteredUserResult, isMobile]);

    React.useEffect(() => {
        BackdropLoad(loadChat);
    }, [loadChat]);

    if (loadChat) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (dataChat.getStoreConfig === '0') {
        router.push('/seller/order');
        return <Layout pageConfig={pageConfig} seller />;
    }

    return (
        <Layout pageConfig={pageConfig} seller chatAgentCode={agentCode}>
            <Content
                t={t}
                loading={loading}
                chat={chat}
                selectUserToChat={selectUserToChat}
                clearChat={clearChat}
                listUsers={filteredUserResult}
                onFocusDeleteRead={onFocusDeleteRead}
                db={db}
                messages={combinedMessages}
                formik={formik}
                changeSerchUser={changeSerchUser}
                searchText={searchText}
                handleSeachUser={handleSeachUser}
                handleDropFile={handleDropFile}
            />
        </Layout>
    );
};

export default Core;
