import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbUpActive } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

export default function Post({ count, title, content }) {
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
        <div
            className={`
                w-[95%] sm:w-[45%] lg:w-[30%]
                max-h-[600px] mx-[1%] my-[2%] 
                px-6 py-4 
                border-2 border-gray-400 rounded-xl 
                shadow-md
            `}
        >
            <h2
                className={`
                    my-5 text-xl sm:text-2xl 
                    break-words line-clamp-5
                `}
            >
                {title}
            </h2>
            <p
                className={`
                    my-4 py-1 text-base sm:text-xl 
                    indent-8 sm:indent-10 line-clamp-8
                `}
            >
                {content}
            </p>
            <div
                className={`
                    w-[90%] sm:w-[50%] lg:w-[35%]
                    mx-auto mt-6 mb-2
                    hover:opacity-90 hover:cursor-pointer
                    active:opacity-80 active:cursor-pointer
                `}
                role="button"
            >
                <button
                    className={`
                        w-full flex justify-center items-center
                        gap-1.5 px-4 py-1.5
                        rounded-lg bg-blue-200 dark:bg-blue-800
                    `}
                    onClick={changeReply}
                >
                    {/* icon 會根據是否有按讚而改變 */}
                    <FontAwesomeIcon
                        icon={replyActive ? faThumbUpActive : faThumbsUp}
                        size="2xl"
                    />
                    <p className={`text-xl`}>{replyCount}</p>
                </button>
            </div>
        </div>
    );
}
