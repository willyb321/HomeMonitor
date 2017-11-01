// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Metrics } from '../links.js';

Meteor.publish('metrics.all', function () {
  return Metrics.find();
});
