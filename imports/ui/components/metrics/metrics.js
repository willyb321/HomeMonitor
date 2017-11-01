import './metrics.html';
import {Session} from 'meteor/session'
import {moment} from 'meteor/momentjs:moment';

Template.metrics.onCreated(function helloOnCreated() {
	Meteor.call('metrics', (err, data) => {
		Session.set('metrics', data);
	});
	Meteor.call('cpus', (err, data) => {
		Session.set('cpus', data);
	});
});

Template.metrics2.helpers({
	uptime() {
		const data = Session.get('metrics');
		const uptime = moment.duration().add(data.uptime, 'ms').humanize();
		return uptime;
	},
	cpuUsage() {
		const data = Session.get('metrics');
		return _.last(data.cpu).systemAverage;
	},
	oneload() {
		const data = Session.get('metrics');
		return data.load['1m'];
	},
	fiveload() {
		const data = Session.get('metrics');
		return data.load['5m'];
	},
	fifteenload() {
		const data = Session.get('metrics');
		return data.load['15m'];
	},
	cpus() {
		const data = Session.get('cpus');
		const toReturn = [];
		toReturn.push(`CPU Info: ${data.cpuInfo.manufacturer} ${data.cpuInfo.brand} @ ${data.cpuInfo.speed}GHz`);
		toReturn.push(`CPU Temp: ${data.cpuTemp.max}C max`);
		toReturn.push(`Load Info: ${data.load.avgload} average`);
		return toReturn.join('\n');
	}
});

Template.metrics.events({});
