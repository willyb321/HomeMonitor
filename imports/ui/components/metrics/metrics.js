import './metrics.html';
import {Session} from 'meteor/session'
import {moment} from 'meteor/momentjs:moment';
import bytes from 'bytes';

Template.metrics.onCreated(function helloOnCreated() {
	Meteor.call('metrics', (err, data) => {
		Session.set('metrics', data);
	});
});

Template.metrics2.helpers({
	uptime() {
		const data = Session.get('metrics');
		return moment.duration().add(data.time.uptime, 's').humanize();
	},
	cpuUsage() {
		const data = Session.get('metrics');
		return _.last(data.cpu).systemAverage;
	},
	oneload() {
		const data = Session.get('metrics');
		return data.load.currentload;
	},
	memory() {
		const data = Session.get('metrics');
		const toReturn = [];
		toReturn.push(`Memory Total: ${bytes.format(data.mem.total)}`);
		toReturn.push(`Memory Free: ${bytes.format(data.mem.free)}`);
		return toReturn.join('\n');
	},
	cpus() {
		const data = Session.get('metrics');
		const toReturn = [];
		toReturn.push(`CPU Info: ${data.cpuInfo.manufacturer} ${data.cpuInfo.brand} @ ${data.cpuInfo.speed}GHz`);
		toReturn.push(`CPU Temp: ${data.cpuTemp.max}C max`);
		toReturn.push(`Load Info: ${data.load.avgload} average`);
		return toReturn.join('\n');
	}
});

Template.metrics.events({});
