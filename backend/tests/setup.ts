import 'reflect-metadata'; // Needed for @decorators in services

/**
 * Events must be imported so that they can be triggered.
 */
import '../src/loaders/events';

module.exports = async function() {
  console.log('Installed global stuff');
};
