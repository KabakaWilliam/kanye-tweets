import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ChatAlt2Icon,
  ChatIcon,
  HeartIcon,
  LinkIcon,
  ReplyIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  interface tweet {
    quote: string;
  }
  const [tweet, setTweet] = useState("");
  const [BACKGROUND, setBackground] = useState(false);
  const getKanyeTweet = async () => {
    const res = await fetch("https://api.kanye.rest");
    const tweet = (await res.json()) as tweet;
    console.log(tweet);
    setTweet(tweet.quote);
  };
  const bgImage =
    "https://media3.giphy.com/media/RlwF2vFb4y7bDnWvcO/giphy.gif?cid=ecf05e47fd6lkme4yjafbpbu51vl3n2k754387jmqdll4k5f&rid=giphy.gif&ct=g";
  useEffect(() => {
    getKanyeTweet();
  }, []);

  return (
    <div className="bg-black">
      <Head>
        <title>Ye Quotes</title>
        <meta name="description" content="Some gems from Ye" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐻</text></svg>"
        />
      </Head>

      <div
        className={` w-screen h-screen flex items-center justify-center bg-[url(https://media3.giphy.com/media/RlwF2vFb4y7bDnWvcO/giphy.gif?cid=ecf05e47fd6lkme4yjafbpbu51vl3n2k754387jmqdll4k5f&rid=giphy.gif&ct=g)] bg-cover `}
      >
        <div className="border border-[#2F3336] w-[300px] md:w-[600px] h-max md:h-max rounded-lg px-3 py-3 flex flex-col gap-y-2">
          {/* top profile info */}
          <div className="w-[100%] h-[20%]   flex ">
            <div className="w-[50%] h-[100%] flex ">
              {/* <div className="w-[50px] h-[50px] bg-gray-400 rounded-full"></div> */}
              <img
                src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v.jpg"
                className="w-[50px] h-[50px] bg-gray-400 rounded-full"
                alt=""
              />
              <div className="w-[70%] h-[50px] pl-3  text-[15px]">
                <div className="font-bold text-[#e7e9ea]">ye</div>
                <div className="font-normal text-[#71767b]">@kanyewest</div>
              </div>
            </div>
            <div className="w-[50%] h-[100%] flex items-start justify-end ">
              <img src="/twitterLogo.svg" alt="" className="h-6" />
            </div>
          </div>
          {/* text */}
          <div className="w-[100%] h-max font-normal text-[16px] md:text-[23px] text-[#e7e9ea]   ">
            {tweet}
            <div className="w-[100%] h-[20px] flex">
              <div className="w-[80%] md:w-[50%] h-[100%] text-[15px] text-[#71767b]">
                {/* 5:13pm . May 9, 2022 */}
                <span>5:13pm </span>
                <span className="h-[100%] ">. </span>
                <span> May 9, 2022</span>
              </div>
              <div className="w-[20%] md:w-[50%] h-[100%] flex justify-end text-[#71767b] hover:text-[#1d9bf0] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="border-[0.3px] border-[#2F3336] mt-2"></div>
          </div>
          {/* heart, reply icons, link */}
          <div className="w-[100%] md:w-[50%] flex">
            <div className="w-[30%] group flex text-[#71767b] gap-x-1 items-center justify-center">
              <HeartIcon className="h-5  text-[#71767b] group-hover:rounded-full group-hover:text-[#da2d53] group-hover:bg-red-300 cursor-pointer" />
              <span className="group-hover:text-red-300 group-hover:underline cursor-pointer">
                13.7k
              </span>
            </div>
            <div className="w-[30%] flex text-[#71767b] group gap-x-1 items-center justify-center">
              <ChatIcon className="md:w-5 h-5 text-[#71767b] group-hover:text-[#1d9bf0] icon" />
              <span className="group-hover:text-[#1d9bf0] group-hover:underline cursor-pointer">
                Reply
              </span>
            </div>
            <div className="w-[40%] flex text-[#71767b] gap-x-1 items-center justify-center group">
              <LinkIcon className="h-5 text-[#71767b] group-hover:rounded-full group-hover:text-green-300  cursor-pointer" />
              <span className="group-hover:text-green-300 group-hover:underline cursor-pointer">
                Copy Link
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
