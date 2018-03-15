import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { InfoCard, LayoutManager } from '../shared';
import * as styles from './album-directory.component.scss';


interface AlbumDirectoryProps {
  history: any;
}

export const AlbumDirectory = withRouter(class extends React.Component<AlbumDirectoryProps, {}> {
  render() {
    const names = `${styles.layoutItem} ${styles.clickable}`;

    return (
      <div>
        <h1>Albums</h1>
        <LayoutManager>
          <div className={names} onClick={() => this.toRoute('/albums/one')}>
            <InfoCard>
              <h2>Emerald City</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, possimus! Asperiores, non nemo, dolorum voluptas, a repellat excepturi ratione ipsam sit magni rem placeat ipsum. Accusamus ducimus aspernatur quod tenetur!</p>
            </InfoCard>
          </div>
          <div className={names} onClick={() => this.toRoute('/albums/two')}>
            <InfoCard>
              <h2>Microsoft Life</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit asperiores, neque saepe quisquam impedit quae consequatur, harum tempora temporibus quo. Iusto, quasi ratione corporis corrupti deserunt officiis nisi aspernatur!</p>
              <p>Ex unde sunt id facere, enim quia numquam tempore cupiditate reiciendis nisi voluptatibus aliquid vitae, atque hic quas. Consectetur dolorem vero possimus sint modi minus placeat, laudantium eveniet error debitis.</p>
            </InfoCard>
          </div>
        </LayoutManager>
      </div>
    );
  }

  toRoute = (path: string) => {
    this.props.history.push(path);
  };
});
