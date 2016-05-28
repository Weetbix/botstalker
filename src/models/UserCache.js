import UserModel from './UserModel';

// Fetches a user from the slack API
function fetchUser(cache, userID){
  const newUser = new UserModel({ id: userID, token: cache.token });
  
  return Promise.resolve(newUser.fetch())
    .then(() => {
      cache.users[userID] = newUser;
      return newUser;
    });
}
  
// Caches user details so we dont make multiple
// requests for the same user. 
export default class UserCache {
  
  // Pass the API key to be used for all the user fetches
  constructor(token){
    this.users = {};
    this.token = token;
  }
  
  // Returns a promise that resolves with the requested user. 
  // If the user is already in the cache it will resolve immediately,
  // otherwise it will resolve when the user is fetched from the server.
  getOrFetchUser(userID) {
    return this.users[userID] ? Promise.resolve(this.users[userID]) : fetchUser(this, userID);
  }  
}
