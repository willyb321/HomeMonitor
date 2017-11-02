// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
import { Meteor } from 'meteor/meteor';
import si from 'systeminformation';
import {Tail} from 'tail';
import {Metrics} from "../imports/api/links/links";

const tail = new Tail("/var/log/messages.log");

Tracker.autorun(function () {
	tail.on('line', Meteor.bindEnvironment(data => {
		console.log(data);
		Metrics.insert({message: data, timestamp: new Date()}, err => {
			if (err) console.log(err);
		})
	}));
});

Meteor.methods({
	async metrics() {
		try {
			const staticInfo = await si.getStaticData();
			const cpuInfo = await si.cpu();
			const cpuTemp = await si.cpuTemperature();
			const load = await si.currentLoad();
			const time = await si.time();
			const mem = await si.mem();
			const graphics = await si.graphics();
			const net = await si.networkStats();
			const os = await si.osInfo();
			console.log(staticInfo);
			console.log(cpuInfo);
			console.log(cpuTemp);
			console.log(load);
			console.log(time);
			console.log(mem);
			console.log(graphics);
			console.log(net);
			console.log(os);
			return {
				staticInfo,
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

Meteor.publish('Metrics', function () {
	return Metrics.find({}, {
	});
});

