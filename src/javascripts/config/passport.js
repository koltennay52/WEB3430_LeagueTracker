const LocalStrategy = require('passport-local').Strategy
import { User } from '../models/user'
export const strategy = new LocalStrategy({usernameField: 'summonerName'},
    function(summonerName,password,done){
        User.findOne({summonerName: summonerName}, (err,user) => {
            console.log(user)
            if(err){
                return done(err)
            } else {
                if(!user) {
                    return done(null,false,{message: "Summoner was not found in the database."})
                } else {
                    if(!user.isValidPassword(password)){
                        return done(null,false,{message: "Password was incorrect."}) 
                    } else {
                        return done(null, user)
                    }
                }
            }
        })
    }
)