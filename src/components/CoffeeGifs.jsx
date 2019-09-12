import React, {Component} from 'react';
import CoffeeGifsUI from "./CoffeeGiffsUI";

class CoffeeGifs extends Component {
    state = {
        loading: false,
        giphyImage: [],
        giphyTitle: {}
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const giphyKeyAPI = '';

        fetch('https://api.giphy.com/v1/gifs/random?api_key=' + giphyKeyAPI + '&tag=coffee&rating=g')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    giphyImage: data.data.images.fixed_height_small.url,
                    giphyTitle: data.data.title
                })
            })
            .catch(console.log)
    };

    onLoad = () => {
        this.setState({loading: true});
        //console.log("Loaded!");
    };

    render() {
        const onLoad = this.onLoad;

        const data = this.state;
        const fetchData = this.fetchData;

        return <CoffeeGifsUI data={data} change={fetchData} onLoad={onLoad}/>

    }
}

export default CoffeeGifs