const functions = require('firebase-functions');
const express = require('express');
const requestPromise = require('request-promise-native');

//読み込んだモジュールの実行
const app = express();

//　APIにリクエストを送る関数

const getDataFromApi = async keyword => {
    //const requestUrl = 'https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:';
    const requestUrl = 'https://covid19-japan-web-api.now.sh/api//v1/prefectures';
    //const result = await requestPromise(`${requestUrl}${keyword}`);
    const result = await requestPromise(`${requestUrl}`);
    return result;
}

// getでリクエストを受ける
app.get('/hello',(req, res) => {
    //レスポンスの設定
    res.send('Hello Express!');
});

app.get('/user/:userId',(req, res)=>{
    const users = [
        { id:1, name: 'ジョナサン' },
        { id:2, name: 'ジョセフ' },
        { id:3, name: '承太郎' },
        { id:4, name: '賀介' },
        { id:5, name: 'ジョルノ' },
    ];
    const targetUser = users.find(user => user.id === Number(req.params.userId));
    res.send(targetUser);
});

//app.get('/gbooks/:keyword',async(req, res)=>{
app.get('/covid',async(req, res)=>{
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});

//出力
const api = functions.https.onRequest(app);
module.exports = {api};


// locall
// http://localhost:5000/functions-cbeee/us-central1/helloWorld


// deploy
//? https://us-central1-functions-cbeee.cloudfunctions.net/helloWorld
//? https://us-central1-functions-cbeee.cloud-fun.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });