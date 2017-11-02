// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Metrics } from '../../api/links/links.js';

const getMetrics = require('metrics-os');

Meteor.startup(() => {
  // if the Links collection is empty
  if (Metrics.find().count() === 0) {

  }
});
