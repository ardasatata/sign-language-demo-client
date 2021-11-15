import React, {useRef, useState} from 'react';
import {Api} from "./api";

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import VideoRecorder from 'react-video-recorder'
import Sidebar from "./Sidebar";
import Select from "react-select";
import {optionsLabel} from "./const";

function Predict() {
    const api = new Api()
    api.setup()

    const videoRef = useRef()

    const [prediction, setPrediction] = useState(['Press Record First! ⚠️'])
    const [fileName, setFileName] = useState("")

    const [isLoading, setIsloading] = useState(false)

    const [selectedOption, setSelectedOption] = useState(null);

    const predictVideo = async (file) => {
        setIsloading(true)
        const response = await api.sendVideo(file)

        console.log(response)

        setIsloading(false)
        setPrediction(response.prediction)
        setFileName(response.fileName)
    }

    const renderVideoRecorder = () => {
        // if(selectedOption === null || selectedSubject === null){
        //     return(
        //         <div className="font-bold text-xl ">
        //             {"You haven't select label & subject yet ->"}
        //         </div>
        //     )
        // }
        return(
            <div style={{aspectRatio: '4/3', minHeight: '40em'}} className="p-2 bg-gray-800 rounded-md">
                <VideoRecorder
                    ref={videoRef}
                    isReplayingVideo={false}
                    showReplayControls={true}
                    isOnInitially={true}
                    countdownTime={3000}
                    timeLimit={8000}
                    onRecordingComplete={async (videoBlob) => {
                        // Do something with the video...
                        setPrediction(['Processing your video...'])
                        await predictVideo(videoBlob)
                        console.log('videoBlob', videoBlob)
                    }}
                    onStartRecording={() => {
                        setPrediction(['Recording video...'])
                    }}
                    onTurnOnCamera={
                        () => {
                            setPrediction(['Press Record First!'])
                        }
                    }
                />
            </div>
        )
    }

    const fixLabel = async () => {
        setIsloading(true)
        const response = await api.fixLabel(selectedOption.labelOnly, fileName)

        console.log(response)

        setIsloading(false)

        if(response.ok){
            setPrediction(["Label Submitted ✅"])
        }
    }

    const reset = async () => {
        // setIsloading(false)
        // setPrediction(['Press Record'])
        // setSelectedOption(null)
        // // eslint-disable-next-line no-unused-expressions
        // videoRef.current.handleStopReplaying();
        window.location.reload(false);
    }

  return (
      <div className="flex flex-row h-screen w-full">
          <Sidebar />
          <div className="flex flex-col text-gray-800 w-full">
              <LoadingOverlay
                  active={isLoading}
                  spinner={<BounceLoader color={'lightblue'} />}
              >
                  <div  className="flex flex-row justify-center items-center h-screen">
                      <div className="flex w-2/3 items-center justify-center ">
                          {renderVideoRecorder()}
                      </div>
                      <div className="flex flex-col w-1/3">
                          <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 pb-8">
                              <div>
                                  <h3 className="text-gray-800 text-3xl font-semibold mb-2">Caution</h3>
                                  <p className="mt-2 text-gray-600 mb-8 text-red-500">
                                      Choose correct label from fixed label form ⚠️
                                  </p>
                                  <h3 className="text-gray-800 text-xl font-semibold mb-2">Predicted Label</h3>
                                  <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="username" type="text" value={prediction} disabled={true} />
                                  <h3 className="text-gray-800 text-xl font-semibold mb-2 mt-4">Fixed Label</h3>
                                  <Select
                                      defaultValue={selectedOption}
                                      onChange={setSelectedOption}
                                      options={optionsLabel}
                                  />

                                  <div className="flex items-center justify-between mt-8">
                                      <button
                                          disabled={(fileName==="")}
                                          onClick={fixLabel}
                                          className={ (fileName==="" ? 'bg-gray-500' : "bg-blue-500 hover:bg-blue-700") + " text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                                          type="button">
                                          Submit
                                      </button>
                                      <button
                                          onClick={reset}
                                          className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "}
                                          type="button">
                                          Record New Video
                                      </button>
                                  </div>
                              </div>
                              {/*<div className="flex justify-end mt-4">*/}
                              {/*    <a href="#" className="text-xl font-medium text-indigo-500">John Doe</a>*/}
                              {/*</div>*/}
                          </div>
                      </div>
                      {/*<div style={{position: 'absolute', bottom: 0, color: 'white', backgroundColor: 'black', padding: '1rem', marginBottom: '1rem'}} className="text-center text-3xl font-bold font-sans">*/}
                      {/*    {prediction}*/}
                      {/*</div>*/}
                  </div>
              </LoadingOverlay>
          </div>
      </div>
  );
}

export default Predict;
