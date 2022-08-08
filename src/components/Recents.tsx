import { LS } from "@/utils/LS";
import moment from "moment";
import Link from "next/link";
import React from "react";

export type Recent = {
  url: string;
  short: string;
  createdAt: string;
};

export default function Recents() {
  const recents = LS.get<Recent[]>("recents");

  return (
    <>
      <div className="border" />
      <ul className="flex flex-col gap-4">
        {recents?.map(({ url, short, createdAt }) => (
          <li key={short} className="flex">
            <div
              className="flex flex-col justify-center itens-center mr-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href + short);
              }}
            >
              <svg
                className="h-6 w-6 cursor-pointer "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <Link href={url}>
              <a className="flex flex-col gap- w-full text-gray-600">
                <span className="">{short}</span>
                <p className="text-xs">{url}</p>
              </a>
            </Link>
            <div className="text-xs">
              <p>{moment(createdAt).format("HH:mm:ss")}</p>
              <p className="text-end">{moment(createdAt).format("DD/MM")}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
