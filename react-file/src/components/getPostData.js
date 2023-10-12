import React from "react";
import styled from "styled-components";

import Post from "./Post.js";
import posts from "./posts.json";

const PostsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    margin: 1.5rem 2.5rem;
    border: 0.25rem solid gray;
    border-radius: 1rem;

    @media screen and (max-width: 1024px) {
        margin: 1.5rem;
    }

    @media screen and (max-width: 640px) {
        margin: 1rem;
    }
`;

const PostData = () => {
    return (
        <PostsContainer>
            {posts.map((post) => {
                let { id, count, title, content } = post;
                return (
                    <Post
                        key={id}
                        count={count}
                        title={title}
                        content={content}
                    />
                );
            })}
        </PostsContainer>
    );
};

export default PostData;
