import React, {useState} from 'react';
import {Api} from "./api";

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import VideoRecorder from 'react-video-recorder'
import Sidebar from "./Sidebar";

function Predict() {
    const api = new Api()
    api.setup()

    const [prediction, setPrediction] = useState(['Press Record First!'])

    const [isLoading, setIsloading] = useState(false)

    const predictVideo = async (file) => {
        setIsloading(true)
        const response = await api.sendVideo(file)

        console.log(response)

        setIsloading(false)
        setPrediction(response.prediction)
    }

  return (
      <div className="flex flex-row h-screen w-full">
          <Sidebar />
          <div className="flex flex-col text-gray-800 w-full">
              <LoadingOverlay
                  active={isLoading}
                  spinner={<BounceLoader color={'lightblue'} />}
              >
                  <div  className="flex flex-col justify-center items-center h-screen">
                      <div className="flex flex-col w-full h-full bg-black items-center justify-center ">
                          <div style={{aspectRatio: '4/3', minHeight: '48em'}} className="p-2 bg-gray-800 rounded-md">
                              <VideoRecorder
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
                      </div>
                      <div style={{position: 'absolute', bottom: 0, color: 'white', backgroundColor: 'black', padding: '1rem', marginBottom: '1rem'}} className="text-center text-3xl font-bold font-sans">
                          {prediction}
                      </div>
                  </div>
              </LoadingOverlay>
          </div>
      </div>
  );
}

export default Predict;
