import * as React    from 'react';
import { mixin, Component } from 'flumpt';
var PureRenderMixin = require('react-addons-pure-render-mixin');

const ClickCounter = React.createClass({

  mixins: [PureRenderMixin, mixin],

  render () {
    return <span>{this.props.counter}</span>;
  },

});

const ClickButton = React.createClass({

  mixins: [PureRenderMixin, mixin],

  render () {
    return (
      <div>
        <button
          onClick={() => this.dispatch('incrementSync')}>
          {this.props.button + 'sync'}!
        </button>
        <button
          onClick={() => this.dispatch('incrementAsync')}>
          {this.props.button + ' async'}!
        </button>
      </div>
    );
  },

});

class Clicker extends Component {

  componentDidMount () {
    this.dispatch('incrementSync');
  }

  render () {
    return (
      <div>
        <ClickCounter counter={this.props.count} />
        <ClickButton button={this.props.button} />
      </div>
    );
  }

}

export default Clicker;
