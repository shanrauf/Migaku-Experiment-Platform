import 'reflect-metadata'; // Needed for @decorators in services

/**
 * Events must be imported so that they can be triggered.
 */
import '../src/loaders/events';

export default async (): Promise<void> => {
  console.log('\nInstalled global dependencies.');
};
