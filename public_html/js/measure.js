/**
 *
 */

var numStore = {
	// data to show
	_regData: {},
	TYPE_OO_STEP: 'OO-steps',
	TYPE_FW_STEP: 'FW-steps',
	TYPE_OO_DRAW: 'FW-draw',
	TYPE_FW_DRAW: 'FW-draw',
	addNumber: function (num, type) {
		num = parseInt(num,10);
		if (!numStore._regData.hasOwnProperty(type)) {
			numStore._regData[type] = { };
			numStore._regData[type].data = [ ];
			numStore._regData[type].max = Number.MIN_VALUE;
			numStore._regData[type].min = Number.MAX_VALUE;
			numStore._regData[type].sum = 0;
		}

		var safe = numStore._regData[type];
		safe.unshift(num);
		safe.sum += num;
		if (safe.max < num) {
			safe.max = num;
		}
		if (safe.min > num) {
			safe.min = num;
		}
	},
	getMax: function (type) {
		if (!numStore._regData.hasOwnProperty(type)) {
			return 0;
		}
		return numStore._regData[type].max;
	},
	getMin: function (type) {
		if (!numStore._regData.hasOwnProperty(type)) {
			return 0;
		}
		return numStore._regData[type].min;
	},
	getAvg: function (type) {
		return numStore._regData.sum / numStore._regData.data.length;
	},
	// ========== OO ==========
	addOONumber: function (num) {
		numStore.addNumber(num, numStore.TYPE_OO_STEP);
	},
	getOOMax: function () {
		return numStore.getMax(numStore.TYPE_OO_STEP);
	},
	getOOMin: function () {
		return numStore.getMin(numStore.TYPE_OO_STEP);
	},
	getOOAvg: function () {
		return numStore.getAvg(numStore.TYPE_OO_STEP);
	},
	addOODraw: function (num) {
		numStore.addNumber(num, numStore.TYPE_OO_DRAW);
	},
	// ========== FW ==========
	addFwNumber: function (num) {
		numStore.addNumber(num, numStore.TYPE_FW_STEP);
	},
	getFwMax: function () {
		return numStore.getMax(numStore.TYPE_FW_STEP);
	},
	getFwMin: function () {
		return numStore.getMin(numStore.TYPE_FW_STEP);
	},
	getFwAvg: function () {
		return numStore.getAvg(numStore.TYPE_FW_STEP);
	},
	addFwDraw: function (num) {
		numStore.addNumber(num, numStore.TYPE_FW_DRAW);
	},
	getFwDrawMax: function () {
		return numStore.getMax(numStore.TYPE_FW_DRAW);
	},
	getFwDrawMin: function () {
		return numStore.getMin(numStore.TYPE_FW_DRAW);
	},
	getFwDrawAvg: function () {
		return numStore.getAvg(numStore.TYPE_FW_DRAW);
	}
};

var writeNumTo = {

};
