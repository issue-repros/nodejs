### Issue-reproduction instructions

1) Clone repo from: https://github.com/issue-repros/nodejs.git
2) Open terminal in the `TrackHeapObjects_Crash` folder.
3) Run `npm run start_normal`, and observe that `Done` gets logged. (ie. no crash)
4) Run `npm run start_trackHeap`, and observe that the process crashes without `Done` being logged.

<details>
<summary>Screen capture (Node 16.13.2)</summary>

![](https://i.imgur.com/gLiTAPQ.gif)
</details>

<details>
<summary>Screen capture (Node 14.17.1)</summary>

![](https://i.imgur.com/AMc2k7n.gif)
</details>

## Workaround

I found a way to restructure the `deepClone` function where the crash is avoided:
```
const deepClone = value=>{
	if (Array.isArray(value)) {
		return value.map(val=>deepClone(val));
	} if (typeof value === "object" && value) {

		// crash occurs, with this version
		/*return Object.keys(value).reduce((memo, k)=>{
			memo[k] = deepClone(value[k]);
			return memo;
		}, {});*/

		// crash does not occur, with this version
		const func = (memo, k, value)=>{
			memo[k] = deepClone(value[k]);
			return memo;
		};
		return Object.keys(value).reduce((memo, k)=>func(memo, k, value), {});

	}
	return value;
};
```

So the bug in NodeJS must have something to do with recursive functions.

<details>
<summary>Screen capture showing before and after</summary>

![](https://i.imgur.com/GufDT7R.gif)
</details>