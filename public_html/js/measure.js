/**
 *
 */

var msr = {
	// data to show
	_regData: {},
	TYPE_OO_STEP: 'OO-steps',
	addNumber: function (num, type) {
		num = parseInt(num,10);
		if (!msr._regData.hasOwnProperty(type)) {
			msr._regData[type] = { };
			msr._regData[type].data = [ ];
			msr._regData[type].max = Number.MIN_VALUE;
			msr._regData[type].min = Number.MAX_VALUE;
			msr._regData[type].sum = 0;
		}

		var safe = msr._regData[type];
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
		if (!msr._regData.hasOwnProperty(type)) {
			return 0;
		}
		return msr._regData[type].max;
	},
	getMin: function (type) {
		if (!msr._regData.hasOwnProperty(type)) {
			return 0;
		}
		return msr._regData[type].min;
	},
	getAvg: function (type) {
		return msr._regData.sum / msr._regData.data.length;
	},
	addOONumber: function (num) {
		msr.addNumber(num, msr.TYPE_OO_STEP);
	},
	getOOMax: function () {
		return msr.getMax(msr.TYPE_OO_STEP);
	},
	getOOMin: function () {
		return msr.getMin(msr.TYPE_OO_STEP);
	},
	getOOAvg: function () {
		return msr.getAvg(msr.TYPE_OO_STEP);
	}
};
