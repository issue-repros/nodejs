const deepClone = value=>{
	if (Array.isArray(value)) {
		return value.map(val=>deepClone(val));
	} if (typeof value === "object" && value) {
		return Object.keys(value).reduce((memo, k)=>{
			memo[k] = deepClone(value[k]);
			return memo;
		}, {});
	}
	return value;
};

const data = {
	arr1: [],
	arr2: [
		{prop1: [1]}
	]
};
console.log("PreLoop");
for (let i = 0; i < 5000; i++) {
	data.arr1.push({
		prop1: true,
		prop2: {},
		prop3: false
	});
}
console.log("PostLoop");

deepClone(Object.freeze(data));
console.log("Done");