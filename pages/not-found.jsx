import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const NotFound = () => {
  return (
    <Container>
      <Head>
        <title>Whatsapp Clone</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <NoChats>Sorry, no chats found...</NoChats>
      </ChatContainer>
    </Container>
  );
};

export default NotFound;

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

const NoChats = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  font-size: 72px;
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.8);
  background-color: #e5ded8;
`;
