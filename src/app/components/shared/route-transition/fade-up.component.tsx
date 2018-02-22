import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as gsap from 'gsap';

var Easing = require('EasePack');

export const fadeUp = (Component) => {
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
      return <Component {...this.props} />;
    }
  }
};
