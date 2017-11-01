// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
import { Meteor } from 'meteor/meteor';
import si from 'systeminformation';

Meteor.methods({
	async metrics() {
		try {
			const cpuInfo = await si.cpu();
			const cpuTemp = await si.cpuTemperature();
			const load = await si.currentLoad();
			const time = await si.time();
			const mem = await si.mem();
			const graphics = await si.graphics();
			const net = await si.networkStats();
			const os = await si.osInfo();
			console.log(cpuInfo);
			console.log(cpuTemp);
			console.log(load);
			console.log(time);
			console.log(mem);
			console.log(graphics);
			console.log(net);
			console.log(os);
			return {
				cpuInfo,
				cpuTemp,
				load,
				time,
				mem,
				graphics,
				net,
				os
			};
		} catch (e) {
			console.log(e)
		}
	}
});

Meteor.publish('metrics');
