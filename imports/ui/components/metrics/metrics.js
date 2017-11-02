import './metrics.html';
import {Session} from 'meteor/session'
import {moment} from 'meteor/momentjs:moment';
import bytes from 'bytes';
import {Metrics} from "../../../api/links/links";
Tracker.autorun(() => {
	Meteor.subscribe('Metrics');
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
		toReturn.push(`Memory Active: ${bytes.format(data.mem.active)}`);
		toReturn.push(`Swap Total: ${bytes.format(data.mem.swaptotal)}`);
		toReturn.push(`Swap Free: ${bytes.format(data.mem.swapfree)}`);
		return toReturn.join('\n');
	},
	sysTime() {
		const data = Session.get('metrics');
		if (!data) return;
		return `System time on ${data.os.hostname} (${data.os.distro} ${data.os.platform}): ${moment(data.time.current).format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
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
		Session.set('logs', Metrics.find({}, { sort: { timestamp: -1 }, limit: 25}).fetch());
		return Session.get('logs');
	}
});

Template.metrics.events({});
