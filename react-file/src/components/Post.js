import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbUpActive } from "@fortawesome/free-solid-svg-icons";

const PostBox = styled.div`
    width: 30%;
    max-height: 500px;
    overflow-y: hidden;

    margin: 2% 1%;
    padding: 1rem 1.5rem;

    border: 0.125rem solid #9c9c9c;
    border-radius: 0.75rem;
    box-shadow: 0 0 0.25rem 0.125rem rgba(0, 0, 0, 0.2);

    // RWD
    @media screen and (max-width: 992px) {
        width: 45%;
    }
    @media screen and (max-width: 576px) {
        width: 95%;
    }
`;

const Title = styled.h2`
    margin: 1.25rem 0;

    text-align: left;
    font-size: 1.5rem;
    line-height: 1.5;
    word-wrap: break-word;

    /* 限制行數 */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 992px) {
        font-size: 1.25rem;
    }
`;

const Content = styled.p`
    margin: 1rem 0;
    padding: 0.25rem 0;

    font-size: 1.25rem;
    text-indent: 2.5rem;
    line-height: 1.5rem;

    /* 限制行數 */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 576px) {
        font-size: 1rem;
        text-indent: 2rem;
    }
`;

const Reply = styled.div`
    width: 35%;

    margin: 1.5rem auto 0.5rem auto;

    :hover,
    :active {
        cursor: pointer;
        opacity: 0.8;
    }

    @media screen and (max-width: 992px) {
        width: 50%;
    }
    @media screen and (max-width: 576px) {
        width: 90%;
    }

    button {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.375rem;

        padding: 0.375rem 1rem;
        border: none;
        border-radius: 0.5rem;

        background-color: #a5f2f5;
    }

    p {
        font-size: 1.25rem;
    }
`;

const Post = ({ count, title, content }) => {
    // 默認值
    count = count || 0;
    title = title || "This is Title";
    content = content || "This is Content.";

    const [replyCount, setReplyCount] = useState(count); // 按讚數量
    const [replyActive, setReplyActive] = useState(false); // 檢查是否按過讚

    // 切換按讚數
    // 沒按過會 +1，有按過會 -1
    const changeReply = () => {
        if (replyActive) {
            setReplyCount(replyCount - 1);
            setReplyActive(false);
        } else {
            setReplyCount(replyCount + 1);
            setReplyActive(true);
        }
    };

    return (
        <PostBox>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <Reply>
                <button onClick={changeReply}>
                    {/* icon 會根據是否有按讚而改變 */}
                    <FontAwesomeIcon
                        icon={replyActive ? faThumbUpActive : faThumbsUp}
                        size="2xl"
                    />
                    <p>{replyCount}</p>
                </button>
            </Reply>
        </PostBox>
    );
};

export default Post;