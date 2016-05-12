import UserModel from './UserModel';

export default class UserCache {
  constructor(token){
    this.users = {};
    this.token = token;
  }
  
  getOrFetchUser(userID) {
    return this.users[userID] ? Promise.resolve(this.users[userID]) : this.fetchUser(userID);
  }
  
  fetchUser(userID){
    const newUser = new UserModel({ id: userID, token: this.token });
    
    return Promise.resolve(newUser.fetch())
      .then(() => {
        this.users[userID] = newUser;
        return newUser;
      });
  }
  
};