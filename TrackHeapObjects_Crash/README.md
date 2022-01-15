### Issue-reproduction instructions

1) Clone repo from: https://github.com/issue-repros/nodejs.git
2) Open terminal in the `TrackHeapObjects_Crash` folder.
3) Run `npm run start_normal`, and observe that `End` gets logged. (ie. no crash)
4) Run `npm run start_trackHeap`, and observe that the process crashes without `End` being logged.

Screen capture (Node 16.13.2):  
![](https://i.imgur.com/gLiTAPQ.gif)

Screen capture (Node 14.17.1):  
![](https://i.imgur.com/AMc2k7n.gif)