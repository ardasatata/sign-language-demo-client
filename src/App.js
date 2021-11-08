import React, {useEffect, useState, useReducer} from 'react';
import {Api} from "./api";
import {SENTENCE_LIST, WORD_LIST} from "./const";
import modelImage from './model.png'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Demo from "./Demo";
import VideoRecorder from 'react-video-recorder'

function App() {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const api = new Api()
  api.setup()

  const [datalist, setDatalist] = useState([])
  const [groundTruth, setGroundTruth] = useState([])
  const [prediction, setPrediction] = useState(['Press Record First!'])
  const [videoPath, setVideoPath] = useState('F:\\Dataset\\Sign Language\\CSL\\pytorch\\color/000000/P04_s1_00_0._color.avi')

  const [key, setKey] = useState(0)

    const refreshVideo = () => {
        setKey(key +1)
    }

  const [isLoading, setIsloading] = useState(false)

    const predictVideo = async (file) => {
        setIsloading(true)
        const response = await api.sendVideo(file)

        console.log(response)

        setIsloading(false)
        setPrediction(response.prediction)
    }

  useEffect(()=>{
    const getFileList = async () => {
        setIsloading(true)
        const data = await api.getFilelist()

        setDatalist(data.filepath)

        console.log(data)
        setIsloading(false)

    }
    // getFileList()
  },[api])

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={
                  <div className="flex flex-col text-gray-800">
                      <LoadingOverlay
                          active={isLoading}
                          spinner={<BounceLoader color={'lightblue'} />}
                      >
                          <div  className="flex flex-col justify-center items-center h-screen">
                              <div className="flex flex-col w-full h-full bg-black items-center justify-center">
                                  <VideoRecorder
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
                              <div style={{position: 'absolute', bottom: 0, color: 'white', backgroundColor: 'black', padding: '1rem', marginBottom: '1rem'}} className="text-center text-3xl font-bold font-sans">
                                  {prediction}
                              </div>
                          </div>
                      </LoadingOverlay>
                  </div>
              } />
              <Route path="demo" element={<Demo />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
