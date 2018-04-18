import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { InfoCard, InfoCardGrid } from '../shared';
import * as styles from './album-directory.component.scss';


interface AlbumDirectoryProps {
  history: any;
}

export const AlbumDirectory = withRouter(class extends React.Component<RouteComponentProps<AlbumDirectoryProps>, {}> {
  render() {
    const cards = [
      {route: '/albums/one', comp: Card1},
      {route: '/albums/two', comp: Card2},
      {route: '/albums/one', comp: Card3},
      {route: '/albums/two', comp: Card4},
    ];
    const itemStyles = {
      minWidth: '300px',
      maxWidth: '500px',
      height: '100%',
    };
    const items = cards.map((x, i) => (
      <InfoCard
        key={x.route}
        onClick={e => this.toRoute(x.route)}
        style={itemStyles}>
        {x.comp}
      </InfoCard>
    ));

    return (
      <div>
        <h1>Albums</h1>
        <InfoCardGrid>
          {items}
        </InfoCardGrid>
      </div>
    );
  }

  toRoute = (path: string) => {
    this.props.history.push(path);
  };
});


const Card1 = (
  <>
    <h2>Emerald City</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, possimus! Asperiores, non nemo, dolorum voluptas, a repellat excepturi ratione ipsam sit magni rem placeat ipsum. Accusamus ducimus aspernatur quod tenetur!</p>
  </>
);

const Card2 = (
  <>
    <h2>Microsoft Life</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit asperiores, neque saepe quisquam impedit quae consequatur, harum tempora temporibus quo. Iusto, quasi ratione corporis corrupti deserunt officiis nisi aspernatur!</p>
    <p>Ex unde sunt id facere, enim quia numquam tempore cupiditate reiciendis nisi voluptatibus aliquid vitae, atque hic quas. Consectetur dolorem vero possimus sint modi minus placeat, laudantium eveniet error debitis.</p>
  </>
);

const Card3 = (
  <>
    <h2>Emerald City</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, possimus! Asperiores, non nemo, dolorum voluptas, a repellat excepturi ratione ipsam sit magni rem placeat ipsum. Accusamus ducimus aspernatur quod tenetur!</p>
  </>
);

const Card4 = (
  <>
    <h2>Microsoft Life</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit asperiores, neque saepe quisquam impedit quae consequatur, harum tempora temporibus quo. Iusto, quasi ratione corporis corrupti deserunt officiis nisi aspernatur!</p>
    <p>Ex unde sunt id facere, enim quia numquam tempore cupiditate reiciendis nisi voluptatibus aliquid vitae, atque hic quas. Consectetur dolorem vero possimus sint modi minus placeat, laudantium eveniet error debitis.</p>
  </>
);