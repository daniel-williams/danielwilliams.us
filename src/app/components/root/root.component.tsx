import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as gsap from 'gsap';

import { Header } from '../header';
import { Nav } from '../nav';
import * as styles from './root.component.scss';


var Easing = require('EasePack');

export const Root = withRouter(class extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;

    return (
      <div className={styles.rootWrap}>
        <div className={styles.navWrap}>
          <Nav></Nav>
        </div>
        <div className={styles.headerWrap}>
          <Header></Header>
          <TransitionGroup>
            <RouteFade key={location.pathname}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/projects' component={Projects} />
                <Route path='/albums' component={Albums} />
                <Route path='/about' component={About} />
              </Switch>
            </RouteFade>
          </TransitionGroup>
        </div>
      </div>
    );
  }
});


function fadeUp(Component) {
  return class FadesUp extends React.Component {
    componentWillAppear(cb) {
      this.fadeIn(cb);
    }

    componentWillEnter(cb) {
      this.fadeIn(cb);
    }

    fadeIn(cb) {
      const hostEl = findDOMNode(this);
      gsap.TweenLite.fromTo(
        hostEl,
        0.3,
        {
          transform: 'translateY(20px)',
          opacity: 0,
        },
        {
          transform: 'translateY(0)',
          opacity: 1,
          ease: Easing.easeOut,
          delay: 0.3,
          onComplete: cb,
        }
      );
    }

    render () {
      return (
        <Component {...this.props} />
      );
    }
  }
}

const RouteFade = fadeUp(class extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.contentWrap}>{this.props.children}</div>
    );
  }
});

const Home = () => <div>Home</div>;
const Albums = () => <div>Albums</div>;
const About = () => <div>About</div>;
const Projects = () => {
  return (
    <Switch>
      <Route exact path='/projects' component={ProjectsHome} />
      <Route path='/projects/one' component={ProjectOne} />
      <Route path='/projects/two' component={ProjectTwo} />
      <Route path='/projects/three' component={ProjectThree} />
    </Switch>
  );
};
const ProjectsHome = () => {
  return (
    <div>
      <div>Projects</div>
      <div className={styles.links}>
        <div><Link to='/projects/one'>One</Link></div>
        <div><Link to='/projects/two'>Two</Link></div>
        <div><Link to='/projects/three'>three</Link></div>
      </div>
    </div>
  );
};
const ProjectOne = () => {
  return (
    <iframe id={styles.frame} allowFullScreen src="http://localhost:4000/"></iframe>
  );
};
const ProjectTwo = () => <div>Project Two</div>;
const ProjectThree = () => <div>Project Three</div>;