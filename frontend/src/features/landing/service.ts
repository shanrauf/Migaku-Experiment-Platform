export default class Service {
  constructor(options?) {}

  getProfile() {
    // Mock data.
    // Replace this with actual call to backend server below.
    const parsed = {
      email: 'prograhammer@gmail.com',
      name: 'David Graham',
      country: 'USA',
      addressLine1: '1234 Some St.',
      addressLine2: '',
      state: 'Texas',
      zipcode: '78789'
    };

    // Simulate loading time.
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(parsed);
      }, 500);
    });
  }
  loginWithDiscord() {
    console.log('Integrate auth');
  }
}
