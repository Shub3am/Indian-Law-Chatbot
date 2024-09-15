"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [querys, setQuery] = useState<string>("");
  return (
    <div className="">
      <main className="">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gray-800 p-6">
              <div className="flex justify-center">
                <Image
                  src="/Logo.png"
                  alt="Legal Saathi Logo"
                  width={80}
                  height={80}
                  className="text-yellow-500"
                />
              </div>
              <h1 className="text-2xl font-bold text-center text-yellow-500 mt-2">
                LEGAL SAATHI
              </h1>
            </div>
            {loading && (
              <div className="flex flex-col gap-4 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="spinner"></div>
                <h2 className="text-center text-white">
                  Generating Legal Advice for your query <br />
                  (based on new Bhartiya Nyaya Sanhita Act 2023 and Bhartiya
                  Sakshya Bill)
                </h2>
              </div>
            )}
            <div className="h-96 p-6 overflow-y-scroll text-black">
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
            <div className="p-4 bg-gray-50 flex items-center">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-grow mr-2 border-black border-2 p-4 rounded-md text-black"
                onChange={(evt) => {
                  setQuery(evt.target.value);
                }}
              />
              <button
                onClick={async () => {
                  console.log("called", querys);
                  setLoading(true);
                  const getResponse = await fetch(
                    process.env.NEXT_PUBLIC_BACKEND + "/query",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        query: querys,
                      }),
                      headers: { "content-type": "application/json" },
                    }
                  ).then((res) => res.json());
                  console.log(getResponse);
                  setMessages([...messages, getResponse.answer]);
                  setQuery("");
                  setLoading(false);
                }}
                className="bg-green-500 p-4 rounded-md hover:bg-green-600 text-white">
                Submit Query
              </button>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #ffffff;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
