/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */


import React from 'react';

class Collapsible extends React.Component {
    constructor(props) {
      super(props);
      this.state = { open: false };
    }

    toggle=() => {
        const { open } = this.state;
        this.setState({ open: !open });
    }
    
    render() {
        const { open } = this.state;
        const { title, children, type } = this.props;

        return (
               <div className={`panel ${open ? "panel-open" : "panel-close"} ${type}`} >
                    <button type="button" className="panel-title" onClick={this.toggle}>
                        {title}
                    </button>
                    <div className="panel-content">
                        {children}
                    </div>
                </div>
            );
        }
  }

  export default Collapsible;