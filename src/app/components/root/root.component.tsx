import * as React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import { Header } from '../header';
import { Nav } from '../nav';
import * as styles from './root.component.scss';


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
    <iframe id="frame" allowFullScreen src="http://localhost:4000/"></iframe>
  );
};
const ProjectTwo = () => <div>Project Two</div>;
const ProjectThree = () => <div>Project Three</div>;

const Albums = () => <div>Albums</div>;
const About = () => <div>About</div>;

export const Root = () => (
  <div className={styles.rootWrap}>
    <div className={styles.navWrap}>
      <Nav></Nav>
    </div>
    <div className={styles.headerWrap}>
      <Header></Header>
      <div className={styles.contentWrap}>
        <Switch>
          <Route path='/projects' component={Projects} />
          <Route path='/albums' component={Albums} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    </div>
  </div>
);


