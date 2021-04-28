const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('Users')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


module.exports = passport => {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user=await User.findById(jwt_payload.id)
        if(user) {
            return done(null,user)
        } else {
            return done(null,false)
        }
    }))
}