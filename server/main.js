// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
import { Meteor } from 'meteor/meteor';
import os from 'os';
const si = require('systeminformation');

Meteor.methods({
	async metrics() {
		try {
			const cpuInfo = await si.cpu();
			const cpuTemp = await si.cpuTemperature();
			const load = await si.currentLoad();
			const time = await si.time();
			const mem = await si.mem();
			console.log(cpuInfo);
			console.log(cpuTemp);
			console.log(load);
			console.log(time);
			console.log(mem);
			return {
				cpuInfo,
				cpuTemp,
				load,
				time,
				mem
			};
		} catch (e) {
			console.log(e)
		}
	}
});

Meteor.publish('metrics');
