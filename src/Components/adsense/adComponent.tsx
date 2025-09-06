import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins className="adsbygoogle" 
            data-ad-client="ca-pub-1237998470405831"
            data-ad-slot="3028450107"
            data-ad-format="auto"
            data-full-width-responsive="true" />
    );
  }
}