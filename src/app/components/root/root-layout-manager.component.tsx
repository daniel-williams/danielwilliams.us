import * as React from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';

import { Albums } from '../albums';
import { About } from '../about';
import { Nav } from '../nav';
import {
  Breakpoints,
  compactModes,
  RouteTransition,
  ViewportService,
  Viewport
} from '../shared';
import * as styles from './root-layout-manager.component.scss';

interface RootLayoutManagerProps {}
interface RootLayoutManagerState {
  hover: boolean;
}

export class RootLayoutManager extends React.Component<RootLayoutManagerProps, RootLayoutManagerState> {
  constructor(props: RootLayoutManagerProps) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  render() {
    return (
      <ViewportService>{viewport =>
        <div className={styles.rootWrap}>
          <div
            className={styles.leftSizer}
            style={this.getLeftStyle(viewport)}
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleLeave}>
            <Nav/>
          </div>
          <div className={styles.rightSizer} style={this.getRightStyle(viewport)}>
            <RouteTransition>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/projects' component={Projects} />
                <Route path='/albums' component={Albums} />
                <Route path='/about' component={About} />
              </Switch>
            </RouteTransition>
          </div>
        </div>
      }</ViewportService>
    );
  }

  getLeftStyle = (viewport: Viewport) => {
    const { hover } = this.state;
    const width = (!hover && compactModes.includes(viewport.breakpoint))
    ? 50
    : 220;

    return {
      width,
    };
  };

  getRightStyle(viewport: Viewport) {
    const { hover } = this.state;
    const width = viewport.dimensions.width - (
      (!hover && compactModes.includes(viewport.breakpoint))
        ? 50
        : 220
    );

    return {
      width,
    };
  }

  handleEnter = (e) => {
    this.setState({
      hover: true,
    });
  }

  handleLeave = (e) => {
    this.setState({
      hover: false,
    });
  }
}

const Home = () => <div>Home</div>;
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
    <>
      <div>Projects</div>
      <div className={styles.links}>
        <div><Link to='/projects/one'>One</Link></div>
        <div><Link to='/projects/two'>Two</Link></div>
        <div><Link to='/projects/three'>three</Link></div>
      </div>
    </>
  );
};
const ProjectOne = () => {
  return (
    <iframe id={styles.frame} allowFullScreen src="http://localhost:4000/"></iframe>
  );
};
const ProjectTwo = () => {
  return (
    <ViewportService>
      {(viewport) => <div>Project Two: {viewport.breakpoint}, {viewport.dimensions.width}x{viewport.dimensions.height}</div> }
    </ViewportService>
  );
}
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
