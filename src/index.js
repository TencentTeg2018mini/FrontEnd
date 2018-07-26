import React from 'react';
import { render } from 'react-dom';
import {  BrowserRouter,HashRouter, Route,Switch } from 'react-router-dom'
import { browserHistory } from 'history'
//css
import less from './style/index.less'
import Commend from './commend'
import UserInfo from './userInfo'
import Citywide from './citywide'
import Attention from './attention'
import Message from './message'
import Video from './video'
import Test from './test'
import { TransitionGroup, CSSTransition ,ReactCSSTransitionGroup} from "react-transition-group";
// console.log(browserHistory);
render(
    <BrowserRouter className={less.index}>
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                    // key={location.pathname}
                    key={location.key}
                    classNames="fade"
                    timeout={1000}
                    >   
                        <Switch location={location}>
                            {console.log(location)}
                            <Route exact path='/' component={Commend}/>
                            <Route exact path="/user/:uid" component={UserInfo}/>
                            {/* <Route exact path='/user/me' component={UserInfo}/> */}
                            <Route exact path='/citywide' component={Citywide}/>
                            <Route exact path='/user/me/attention' component={Attention}/>
                            <Route exact path='/user/me/message' component={Message}/>
                            <Route exact path='/user/:uid/attention' component={Attention}/>
                            <Route exact path='/user/:uid/message' component={Message}/>
                            <Route exact path='/user/:uid/video/:uid' component={Video}/>
                            <Route exact path='/test' component={Test}/>
                            <Route render={() => <div>Not Found</div>} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    </BrowserRouter>
    ,
    document.getElementById('app')
);