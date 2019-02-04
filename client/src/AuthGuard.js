import store from './store';

/**
 * Setting up the auth guard for the store when it comes to the routes
 * @param { to } the to route that we are going to
 * @param { from } the from route that we are coming from
 * @param { next } the middleware that will call the next middleware or pass in the path to which we are redirecting to
 */
export default (to, from, next) => {
    // If there is no user in the store then we need to call next and send the user to signin
    if (!store.getters.user) {
        next({
            path: '/signin'
        });
    } else {
        next();
    }
};
