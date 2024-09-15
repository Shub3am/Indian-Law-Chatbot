"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
              <p className="text-center text-gray-300 mt-2">
                Empowering Citizens through Legal Assistance
              </p>
            </div>
            <div className="bg-blue-50 p-4 border-b border-blue-100">
              <h2 className="text-lg font-semibold text-blue-800">
                Theme: Citizen-Centric and Open Innovation
              </h2>
              <p className="text-sm text-blue-600">
                Bringing legal support closer to every citizen
              </p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Our backend server shuts down after 30 minutes of
                    inactivity. If your request is taking time, please try again
                    10-12 seconds later after making a request.
                  </p>
                </div>
              </div>
            </div>
            <div className=" p-4 overflow-y-auto">
              {/* Chat messages would go here */}
              <p className="text-gray-600 text-center">
                Start your legal query below. We are here to assist you!
              </p>
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
            <div className="p-6 overflow-y-scroll text-black">
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
                  setMessages([]);
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
            <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
              <p>Built by Team OnCall Engineers</p>
              <p className="mt-1">
                Members: Shubham Vishwakarma, Monash Kumar Verma, Twinkle
                Dhingra, Abhishek Mohan
              </p>
              <p>Project for Code the cubicle 3.0</p>
            </footer>
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
