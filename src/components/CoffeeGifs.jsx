import React, {Component} from 'react';
import CoffeeGifsUI from "./CoffeeGiffsUI";

class CoffeeGifs extends Component {
    state = {
        giphyImage: [],
        giphyTitle: {}
    };

    componentDidMount() {
        // For initial data
        this.fetchData();
    }

    fetchData = () => {
        fetch('https://api.giphy.com/v1/gifs/random?api_key=iJhoDfdfapFRq6jIUgnapKlsS1K8wsnQ&tag=coffee&rating=g')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    giphyImage: data.data.images.fixed_height_small.url,
                    giphyTitle: data.data.title
                })
            })
            .catch(console.log)
    };

    render() {
        const data = this.state;
        const fetchData = this.fetchData;

        return <CoffeeGifsUI data={data} change={fetchData}/>
    }
}

export default CoffeeGifs