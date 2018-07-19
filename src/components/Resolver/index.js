import {Component} from 'react';
import {getResource} from '../../services/api';

export default component =>
  class extends Component {
    state = {data: {}};

    componentDidMount() {
      this.resolve();
    }

    componentDidUpdate(prevProps) {
      const {url} = this.props;

      if (url !== prevProps.url) {
        this.resolve();
      }
    }

    resolve() {
      const {url} = this.props;
      if (!url) return;

      this.setState({isLoading: true});
      getResource(url).then(this.save);
    }

    save = data => {
      this.setState({
        data,
        isLoading: false
      });
    };

    render() {
      return component({...this.props, ...this.state});
    }
  };
