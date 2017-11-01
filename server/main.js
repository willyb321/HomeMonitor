// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
import { Meteor } from 'meteor/meteor';
import os from 'os';
const getMetrics = require('metrics-os');
const si = require('systeminformation');

Meteor.methods({
	metrics: () => {
		return getMetrics()
	},
	async cpus() {
		try {
			const cpuInfo = await si.cpu();
			const cpuTemp = await si.cpuTemperature();
			const load = await si.currentLoad();
			console.log(cpuInfo);
			console.log(cpuTemp);
			console.log(load);
			return {
				cpuInfo,
				cpuTemp,
				load
			};
		} catch (e) {
			console.log(e)
		}
	}
});
Meteor.publish('metrics');
