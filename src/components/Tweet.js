import React, { Component } from 'react'

import './Tweet.css'
import like from '../like.svg'
import api from '../services/api';

class Tweet extends Component {

    handleLlike = async () => {
        const { _id } = this.props.tweet

        await api.post('likes/' + _id)
    }

    render() {
        const { tweet } = this.props
        return (
            <li className='tweet'>
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type='button' onClick={this.handleLlike}>
                    <img src={like} alt='GoWeek' />
                    {tweet.likes}
                </button>
            </li>
        )
    }
}

export default Tweet