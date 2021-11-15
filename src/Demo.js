import React, {useEffect, useState, useReducer} from 'react';
import {Api} from "./api";
import {SENTENCE_LIST, WORD_LIST} from "./const";
import modelImage from './model.png'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'


function Demo() {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const api = new Api()
  api.setup()

  const [datalist, setDatalist] = useState([])
  const [groundTruth, setGroundTruth] = useState([])
  const [prediction, setPrediction] = useState([])
  const [videoPath, setVideoPath] = useState('F:\\Dataset\\Sign Language\\CSL\\pytorch\\color/000000/P04_s1_00_0._color.avi')

  const [key, setKey] = useState(0)

    const refreshVideo = () => {
        setKey(key +1)
    }

  const [isLoading, setIsloading] = useState(false)

    const getPrediction = async (filepath) => {
        setIsloading(true)
        const data = await api.getPrediction(filepath)

        setGroundTruth(data.ground_truth)
        setPrediction(data.prediction)
        setVideoPath(data.video_path)

        setIsloading(false)

        console.log(data)
    }

  useEffect(()=>{
    const getFileList = async () => {
        setIsloading(true)
        const data = await api.getFilelist()

        setDatalist(data.filepath)

        console.log(data)
        setIsloading(false)

    }
    getFileList()
  },[])

  return (
      <div className="flex flex-col text-gray-800">
          <LoadingOverlay
              active={isLoading}
              spinner={<BounceLoader color={'lightblue'} />}
          >
              <div className="flex flex-row justify-center items-center h-screen">
                  <div className="flex flex-col max-h-screen w-1/3 ml-8">
                      <div className="text-center text-5xl font-bold font-sans">
                          File List
                      </div>
                      <div className="text-center text-md font-light font-sans text-red-500 mb-4">
                          *click on a filename to predict the video sentence
                      </div>
                      <div className="flex flex-col bg-white w-full overflow-y-auto">
                          {datalist.map((items, index)=>{
                              return(
                                  <div onClick={()=> getPrediction(items)} className="px-4 py-2 cursor-pointer bg-white odd:bg-blue-100 text-sm font-light hover:bg-blue-500 hover:text-white">{items}</div>
                              )
                          })}
                      </div>
                  </div>
                  <div className="flex flex-col flex-1">
                      <div className="flex flex-row items-center justify-center">
                          <div className="text-center text-3xl font-bold font-sans mr-4">
                              Video Preview
                          </div>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={refreshVideo}>
                              ▶ Replay
                          </button>
                      </div>
                      <div className="flex bg-white w-full overflow-y-auto items-center p-8 justify-center">
                          <img className="bg-cover w-2/3" src={`http://140.115.51.225:5000/stream?filepath=${videoPath}&key=${key}`} />
                      </div>
                      <div className="flex flex-col bg-white w-full h-full p-8 items-center justify-center">
                          <table className="table-auto">
                              <thead>
                              <tr>
                                  <th className="px-4 py-2">-</th>
                                  <th className="px-4 py-2 w-3/4">Output</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td className="border px-4 py-2 font-bold">Ground Truth</td>
                                  <td className="border px-4 py-2">{groundTruth}</td>
                              </tr>
                              <tr className="bg-gray-100">
                                  <td className="border px-4 py-2 font-bold">Prediction</td>
                                  <td className="border px-4 py-2 font-bold text-teal-800">{prediction}</td>
                              </tr>
                              <tr>
                                  <td className="border px-4 py-2 font-bold">Filename</td>
                                  <td className="border px-4 py-2">{videoPath}</td>
                              </tr>
                              {/*<tr>*/}
                              {/*    <td className="border px-4 py-2 font-bold">WER</td>*/}
                              {/*    <td className="border px-4 py-2">~8%</td>*/}
                              {/*</tr>*/}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </LoadingOverlay>
          <div className="flex flex-col justify-center items-center p-8">
            <div className="text-center text-5xl font-bold font-sans">
              Model Architecture
            </div>
              <div className="p-16 w-2/3">
                  <img src={modelImage} />
              </div>
          </div>
          <div className="flex flex-col justify-center items-center p-8">
              <div className="text-center text-5xl font-bold font-sans">
                  Additional Information
              </div>
              <div className="flex flex-row flex-1 w-full">
                <div className="flex flex-1 w-full">
                    <table className="table-auto w-full">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2 w-full">Sentence</th>
                        </tr>
                        </thead>
                        <tbody>
                            {[...Array(100)].map((x, i) =>
                                <tr>
                                    <td className="border px-4 py-2 font-bold">{i}</td>
                                    <td className="border px-4 py-2">{SENTENCE_LIST[i]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                  <div className="flex flex-col flex-1 pl-8">
                      <table className="table-auto w-full">
                          <thead>
                          <tr>
                              <th className="px-4 py-2">No</th>
                              <th className="px-4 py-2 w-full">Word</th>
                          </tr>
                          </thead>
                          <tbody>
                              {
                                  WORD_LIST.map((item, index)=>{
                                      return(
                                          <tr>
                                              <td className="border px-4 py-2">{index}</td>
                                              <td className="border px-4 py-2">{item}</td>
                                          </tr>
                                      )
                                  })
                              }
                          </tbody>
                      </table>
                  </div>
              </div>
              <div className="pt-8 text-sm">
                  *Built with python flask, react.js
                  © CSIE-NCU, MineLab 2021
              </div>
          </div>
      </div>
  );
}

export default Demo;
