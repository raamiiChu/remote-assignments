import Image from "next/image";
import { Inter } from "next/font/google";

import PostsContainer from "./components/getPostData.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main className={`${inter.className}`}>
            <PostsContainer />
        </main>
    );
}
