import Post from "./Post";
import posts from "../../data/posts.json";

export default function PostsContainer() {
    return (
        <div
            className={`flex justify-center flex-wrap 
                mx-4 sm:mx-6 lg:mx-10 my-6 
                border-4 border-gray-500 
                rounded-2xl
            `}
        >
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
        </div>
    );
}
