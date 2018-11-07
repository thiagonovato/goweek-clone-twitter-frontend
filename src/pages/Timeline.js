import React, { Component } from 'react'
import api from '../services/api'
import Tweet from '../components/Tweet'
import socket from 'socket.io-client'

import './Timeline.css'
import twitterlogo from '../twitter.svg'

class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
    }

    async componentDidMount() {
        this.subscribeToEvents()

        const response = await api.get('tweets')
        this.setState({
            tweets: response.data
        })
    }


    subscribeToEvents = () => {
        const io = socket('http://localhost:3000')

        io.on('tweet', data => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            })
        })

        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet => (
                    tweet._id === data._id ? data : tweet
                ))
            })
        })
    }

    handleNewTweet = async (e) => {
        if (e.keyCode !== 13) return

        const content = this.state.newTweet
        const author = localStorage.getItem('@GoTwitter:username')

        await api.post('tweets', {
            content, author
        }).then(() => {
            this.setState({ newTweet: '' })
        })
    }

    handleInputChange = (e) => {
        this.setState({ newTweet: e.target.value })
    }

    render() {
        return (
            <div className='timeline-wrapper'>
                <img src={twitterlogo} height={24} alt='GoTwitter' />
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder='O que está acontecendo?'
                    ></textarea>
                </form>
                <ul className='tweet-list'>
                    {this.state.tweets.map(tweet =>
                        <Tweet key={tweet._id} tweet={tweet} />
                    )}
                </ul>
            </div>
        )
    }
}

export default Timeline