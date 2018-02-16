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
        <div className={styles.headerWrap}>
          <Header></Header>
        </div>
        <div className={styles.bodyWrap}>
          <Nav></Nav>
          <div className={styles.content}>
            <TransitionGroup component='div'>
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
const ProjectThree = () => {
  return (
    <div>
      <h1>Project Three</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae alias laborum, ipsam consectetur sed ex doloremque eligendi nobis molestiae, quasi mollitia cupiditate asperiores vitae harum fuga fugit voluptate iure? Asperiores?</p>
      <p>Eligendi maxime sapiente non repellat dolor velit aperiam ipsa architecto magnam quisquam soluta numquam et, sunt corporis odio officia possimus similique expedita rem vero? Nemo molestiae quaerat quibusdam possimus odio?</p>
      <p>Voluptatum omnis molestiae quos odit pariatur sed tempora corporis voluptas quod fugiat sapiente molestias, earum a amet. Eligendi voluptatum necessitatibus modi, iure non nemo, architecto nisi aliquam quos adipisci fuga!</p>
      <p>Iste, eius aliquam minus illum consequuntur distinctio atque dolores, blanditiis voluptatibus placeat ut saepe. Vitae consectetur sapiente id, quaerat delectus optio. Ratione, facilis laboriosam! Iste ea assumenda optio libero dolores.</p>
      <p>Facere rem officia quo delectus provident error totam sapiente pariatur necessitatibus reprehenderit eligendi quod tenetur dicta ipsa at nostrum magni voluptate consectetur, iste est. Commodi autem atque deleniti veritatis delectus.</p>
      <p>Veniam obcaecati voluptates repellendus sint modi tempora perferendis blanditiis incidunt! Accusantium tempore dolorem id exercitationem architecto odit libero modi aliquam ipsum repellat sed mollitia voluptates laudantium placeat, eligendi eaque consectetur.</p>
      <p>Quae officiis reprehenderit ut blanditiis aliquam quas repellendus. Commodi quasi, libero similique exercitationem molestiae necessitatibus, accusamus fugit voluptatibus corporis adipisci, voluptates cum sequi quisquam pariatur. Quos reiciendis corporis voluptatum eius.</p>
      <p>Neque quidem temporibus placeat, doloribus nisi atque aspernatur accusantium maxime dolores doloremque nostrum ipsam cum quae facilis voluptate excepturi perspiciatis numquam alias est sunt dolore ex natus. Doloribus, doloremque totam!</p>
      <p>Doloribus repellat cum veritatis, aliquam voluptatum voluptatem consequatur sapiente accusantium at earum soluta dolore, in porro tenetur expedita vitae voluptatibus rem debitis quo inventore quos voluptate architecto? Praesentium, esse commodi?</p>
      <p>Dignissimos, placeat molestiae ipsum laborum eaque culpa unde magni necessitatibus repudiandae dolorum repellat corrupti perferendis iusto hic cupiditate fuga quo officia, odio obcaecati commodi. Saepe, fuga quibusdam! Commodi, iusto quam?</p>
    </div>
  );
};