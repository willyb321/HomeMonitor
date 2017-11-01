import './metrics.html';
import {Session} from 'meteor/session'
import {moment} from 'meteor/momentjs:moment';
import bytes from 'bytes';
import {Metrics} from "../../../api/links/links";
Tracker.autorun(() => {
	Meteor.subscribe('Metrics')
});
Template.metrics.onCreated(function helloOnCreated() {
	Meteor.call('metrics', (err, data) => {
		Session.set('metrics', data);
	});
});

Template.metrics.helpers({
	uptime() {
		const data = Session.get('metrics');
		if (!data) return;
		return `Uptime on ${data.os.hostname} (${data.os.distro} ${data.os.platform}): ${moment.duration().add(data.time.uptime, 's').humanize()}`;
	},
	memory() {
		const data = Session.get('metrics');
		if (!data) return;
		const toReturn = [];
		toReturn.push(`Memory Total: ${bytes.format(data.mem.total)}`);
		toReturn.push(`Memory Free: ${bytes.format(data.mem.free)}`);
		return toReturn.join('\n');
	},
	cpus() {
		const data = Session.get('metrics');
		if (!data) return;
		const toReturn = [];
		toReturn.push(`CPU Info: ${data.cpuInfo.manufacturer} ${data.cpuInfo.brand} @ ${data.cpuInfo.speed}GHz`);
		if (data.cpuTemp.max !== -1) {
			toReturn.push(`CPU Temp: ${data.cpuTemp.max}\u00B0C max`);
		}
		if (data.load.avgload !== 0) {
			toReturn.push(`Load Info: ${data.load.avgload} average`);
		}
		return toReturn.join('\n');
	},
	net() {
		const data = Session.get('metrics');
		if (!data) return;
		const toReturn = [];
		toReturn.push(`Total RX: ${bytes.format(data.net.rx)} on ${data.net.iface}`);
		toReturn.push(`Total TX: ${bytes.format(data.net.tx)} on ${data.net.iface}`);
		return toReturn.join('\n');
	},
	logs() {
		return Metrics.find({}, { sort: { _id: -1 }});
	}
});

Template.metrics.events({});
