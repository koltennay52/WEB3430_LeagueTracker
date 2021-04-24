// Required by Webpack - do not touch
//require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// TODO
import React from 'react'
import ReactDOM from 'react-dom'
import { Home } from './components/Home'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { ChampionRotationList } from './components/ChampionRotationList'
import { SummonerLeague } from './components/SummonerLeague'
import { SignOut } from './components/SignOut'
import 'bootstrap';


if (document.getElementById('main')) {
  ReactDOM.render(<Home/>, document.getElementById('main'))
} 
else if (document.getElementById('registerForm')) {
  ReactDOM.render(<Register/>, document.getElementById('registerForm'))
} 
else if (document.getElementById('loginForm')) {
  ReactDOM.render(<Login/>, document.getElementById('loginForm'))
} 
else if (document.getElementById('champions')) {
  ReactDOM.render(<ChampionRotationList/>, document.getElementById('champions'))
} 
else if (document.getElementById('summonerleague')) {
  ReactDOM.render(<SummonerLeague/>, document.getElementById('summonerleague'))
} 

if(document.querySelector('#_sign_user_out')) {
  document.querySelector('#_sign_user_out').onclick = (e) => {
      let el = document.createElement('div')
      document.body.appendChild(el)
      ReactDOM.render(<SignOut/>,el)
  }
}
