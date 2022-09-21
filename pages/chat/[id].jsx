import Head from "next/head";
import React, { useEffect } from "react";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import {
  doc,
  collection,
  orderBy,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useRouter } from "next/router";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Should verify this while SSR but no user session on the server
  // Need Next-Auth instead of useAuthState hook
  useEffect(() => {
    const verifyUserChat = async (currentUser) => {
      const chatSnapshot = await getDoc(doc(db, "chats", router.query.id));
      const isCurrentUserChat =
        chatSnapshot
          .data()
          .users.findIndex((user) => user === currentUser.email) !== -1;

      if (!isCurrentUserChat) return router.push("/not-found");
    };

    verifyUserChat(user);
  }, [router, router.query.id, user]);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(ctx) {
  const chatSnapshot = await getDoc(doc(db, "chats", ctx.query.id));
  const chat = {
    id: chatSnapshot.id,
    ...chatSnapshot.data(),
  };

  const messagesQuery = query(
    collection(db, "chats", ctx.query.id, "messages"),
    orderBy("timestamp", "asc")
  );

  const messagesSnapshot = await getDocs(messagesQuery);

  const messages = messagesSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
`;
