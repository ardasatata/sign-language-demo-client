import React, {useState} from 'react';
import {Api} from "./api";

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import VideoRecorder from 'react-video-recorder'
import Sidebar from "./Sidebar";

import Select from 'react-select';
import {optionsLabel, optionsSubject} from "./const";

const RECORDER_TIME_CONFIG = {
    countdownTime : 3000,
    timeLimit: 8000
}

function Collection() {
    const api = new Api()
    api.setup()

    const [prediction, setPrediction] = useState(['Press Record First!'])

    const [isLoading, setIsloading] = useState(false)

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSubject, setSelectSubject] = useState(null);

    const uploadVideo = async (file, label, subject) => {
        setIsloading(true)
        const response = await api.uploadVideo(file, label, subject)

        console.log(response)

        setIsloading(false)
        setPrediction('Video Uploaded')
    }

    const renderVideoRecorder = () => {
        if(selectedOption === null || selectedSubject === null){
            return(
                <div className="font-bold text-xl ">
                    {"You haven't select label & subject yet ->"}
                </div>
            )
        }
        return(
            <div style={{aspectRatio: '4/3', minHeight: '40em'}} className="p-2 bg-gray-800 rounded-md">
                <VideoRecorder
                    isReplayingVideo={false}
                    showReplayControls={true}
                    isOnInitially={true}
                    countdownTime={RECORDER_TIME_CONFIG.countdownTime}
                    timeLimit={RECORDER_TIME_CONFIG.timeLimit}
                    onRecordingComplete={async (videoBlob) => {
                        // Do something with the video...
                        setPrediction(['Uploading your video'])
                        await uploadVideo(videoBlob, selectedOption.value, selectedSubject.value)
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

    const reset = async () => {
        window.location.reload(false);
    }

  return (
      <div className="flex flex-row h-screen w-full">
          <Sidebar />
          <div className="flex flex-col text-gray-800 bg-gray-100 w-full">
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
                                      Make sure you already select the sentence number and subject number before record the video!
                                  </p>
                                  <h3 className="text-gray-800 text-xl font-semibold mb-2">Sentence/Label</h3>
                                  <Select
                                      defaultValue={selectedOption}
                                      onChange={setSelectedOption}
                                      options={optionsLabel}
                                  />
                                  <h3 className="text-gray-800 text-xl font-semibold mb-2 mt-4">Subject</h3>
                                  <Select
                                      defaultValue={selectedSubject}
                                      onChange={setSelectSubject}
                                      options={optionsSubject}
                                  />
                              </div>
                              <div className="flex items-center justify-between mt-8">
                                  <button
                                      onClick={reset}
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                      type="button">
                                      Record New Video
                                  </button>
                              </div>
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

export default Collection;
