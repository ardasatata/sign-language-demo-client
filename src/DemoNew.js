import React, {useEffect, useState, useReducer} from 'react';
import {Api} from "./api";
import {SENTENCE_LIST, WORD_LIST} from "./const";
import modelImage from './model.png'

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

const delay = ms => new Promise(res => setTimeout(res, ms));

const files = [
    // { filename: '/video/kp_他招呼你来.mp4', prediction: '他招呼你来'},
    { filename: '/video/kp_26.mp4', prediction: '他爸爸是保安'},
    { filename: '/video/kp_27.mp4', prediction: '他妈妈是裁缝'},
    { filename: '/video/kp_29.mp4', prediction: '他祖母是盲人'},
    { filename: '/video/kp_29_f.mp4', prediction: '他祖母是盲人'},
    //他祖母是聋人
    { filename: '/video/kp_60.mp4', prediction: '社会的安手'},
    { filename: '/video/kp_61.mp4', prediction: '地球是行星'},
    { filename: '/video/kp_81.mp4', prediction: '他的牙刷疏'},
    { filename: '/video/kp_92.mp4', prediction: '他招呼你来'},
    // {filename: '/video/csl_81.mp4', prediction: '他的牙刷疏'},
    // {filename: '/video/phoenix.mp4', prediction: 'TAG VIEL WOLKE NEBEL BLEIBEN TROCKEN IX SONNE MOEGLICH'}
]

function Demo() {

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const api = new Api()
    api.setup()

    const [datalist, setDatalist] = useState(files)
    const [selectedData, setselectedData] = useState({
        filename: null, prediction: '-'
    })
    const [groundTruth, setGroundTruth] = useState([])
    const [prediction, setPrediction] = useState([])
    const [videoPath, setVideoPath] = useState('F:\\Dataset\\Sign Language\\CSL\\pytorch\\color/000000/P04_s1_00_0._color.avi')

    const [key, setKey] = useState(0)

    const refreshVideo = () => {
        setKey(key + 1)
    }

    const [isLoading, setIsloading] = useState(false)

    const getPrediction = async (items) => {
        setIsloading(true)
        // const data = await api.getPrediction(filepath)

        setselectedData({
            filename: null, prediction: '-'
        })
        await delay(2000);
        refreshVideo()


        setselectedData(items)
        setIsloading(false)

        // console.log(data)
    }

    // useEffect(()=>{
    //   const getFileList = async () => {
    //       setIsloading(true)
    //       const data = await api.getFilelist()
    //
    //       setDatalist(data.filepath)
    //
    //       console.log(data)
    //       setIsloading(false)
    //
    //   }
    //   getFileList()
    // },[])

    return (<div className="flex flex-col text-gray-800">
        <LoadingOverlay
            active={isLoading}
            spinner={<BounceLoader color={'lightblue'}/>}
        >
            <div className="flex flex-row justify-center items-center h-screen">
                <div className="flex flex-col max-h-screen w-1/3 ml-8">
                    <div className="text-center text-5xl font-bold font-sans">
                        File List
                    </div>
                    <div className="text-center text-md font-light font-sans text-red-500 mb-4">
                        *click on a filename to predict the video
                    </div>
                    <div className="flex flex-col bg-white w-full overflow-y-auto">
                        {datalist.map((items, index) => {
                            return (<div onClick={() => getPrediction(items)}
                                         className="px-4 py-2 cursor-pointer bg-white odd:bg-blue-100 text-sm font-light hover:bg-blue-500 hover:text-white">{items.filename}</div>)
                        })}
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    {/*<div className="flex flex-row items-center justify-center">*/}
                    {/*    <div className="text-center text-3xl font-bold font-sans mr-4">*/}
                    {/*        Video Preview*/}
                    {/*    </div>*/}
                    {/*    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                    {/*            onClick={refreshVideo}>*/}
                    {/*        ▶ Replay*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className="flex bg-white w-full overflow-y-auto items-center p-8 justify-center">
                        {/*<img className="bg-cover w-2/3" src={`http://140.115.51.225:5000/stream?filepath=${videoPath}&key=${key}`} />*/}
                        <video width="640" controls key={key}>
                            <source src={selectedData.filename} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="flex flex-col bg-white w-full h-full p-8 items-center justify-center">
                        <table className="table-auto">
                            <thead>
                            {/*<tr>*/}
                            {/*    <th className="px-4 py-2">-</th>*/}
                            {/*    <th className="px-4 py-2 w-3/4">Output</th>*/}
                            {/*</tr>*/}
                            </thead>
                            <tbody>
                            {/*<tr>*/}
                            {/*    <td className="border px-4 py-2 font-bold">Ground Truth</td>*/}
                            {/*    <td className="border px-4 py-2">{groundTruth}</td>*/}
                            {/*</tr>*/}
                            <tr className="bg-gray-100">
                                <td className="border px-4 py-2 font-bold">Prediction</td>
                                <td className="border px-4 py-2 font-bold text-teal-800">{selectedData.prediction}</td>
                            </tr>
                            {/*<tr>*/}
                            {/*    <td className="border px-4 py-2 font-bold">Filename</td>*/}
                            {/*    <td className="border px-4 py-2">{videoPath}</td>*/}
                            {/*</tr>*/}
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
                <img src={modelImage}/>
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
                        {[...Array(100)].map((x, i) => <tr>
                            <td className="border px-4 py-2 font-bold">{i}</td>
                            <td className="border px-4 py-2">{SENTENCE_LIST[i]}</td>
                        </tr>)}
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
                        {WORD_LIST.map((item, index) => {
                            return (<tr>
                                <td className="border px-4 py-2">{index}</td>
                                <td className="border px-4 py-2">{item}</td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pt-8 text-sm">
                *Built with python flask, react.js
                © CSIE-NCU, MineLab 2021
            </div>
        </div>
    </div>);
}

export default Demo;
