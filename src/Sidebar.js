import React from 'react';

function Sidebar({}) {

  return (
      <div style={{minWidth: '16em'}} className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="flex w-full max-w-xs p-4 bg-gray-800 h-full">
              <ul className="flex flex-col w-full">
                  <li className="my-px">
                      <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">TSL Data Collection</span>
                  </li>
                  <li className="my-px">
                      <a href="/"
                         className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700">
						<span className="flex items-center justify-center text-lg text-gray-100">
							<svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512"><path
                                d="M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z"
                                fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="32"/><path
                                d="M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z"
                                fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
						</span>
                          <span className="ml-3 text-gray-100">Collect Video</span>
                      </a>
                  </li>
                  <li className="my-px">
                      <a href="/predict"
                         className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700">
						<span className="flex items-center justify-center text-lg text-gray-100">
							<svg fill="none"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="h-6 w-6">
								<path
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</span>
                          <span className="ml-3 text-gray-100">Predict & Collect</span>
                      </a>
                  </li>
                  {/*<li className="my-px">*/}
                  {/*    <a href="http://140.115.51.225:3001/files/Sample/"*/}
                  {/*       className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-100 hover:bg-gray-700">*/}
					{/*	<span className="flex items-center justify-center text-lg text-gray-100">*/}
					{/*		<svg*/}
                  {/*              className="h-6 w-6"*/}
                  {/*              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Play Circle</title><path*/}
                  {/*              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"*/}
                  {/*              fill="white" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path*/}
                  {/*              d="M216.32 334.44l114.45-69.14a10.89 10.89 0 000-18.6l-114.45-69.14a10.78 10.78 0 00-16.32 9.31v138.26a10.78 10.78 0 0016.32 9.31z"/></svg>*/}
					{/*	</span>*/}
                  {/*        <span className="ml-3 text-gray-100">Sample Video</span>*/}
                  {/*    </a>*/}
                  {/*</li>*/}
                  <li className="my-px">
                      <a href="http://140.115.51.225:3001"
                         className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-500 hover:bg-gray-700">
						<span className="flex items-center justify-center text-lg text-gray-100">
							<svg fill="none"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="h-6 w-6">
								<path
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
							</svg>
						</span>
                          <span className="ml-3 text-gray-100">File Manager</span>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  );
}

export default Sidebar;
