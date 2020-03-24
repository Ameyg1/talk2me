import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import env_variable from "../../Reusables/EnvironmentVariables";

export default class OAuth extends Component {

    state = {
        user: {},
        disabled: ''
    }

    componentDidMount() {
        const { socket, provider } = this.props

        socket.on(provider, user => {
            console.log('console user', user);
            this.popup.close()
            this.setState({ user })
        })
    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({ disabled: '' })
            }
        }, 1000)
    }

    openPopup() {
        const { provider, socket } = this.props
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${env_variable.BACKEND_URL}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({ disabled: 'disabled' })
        }
    }

    closeCard = () => {
        this.setState({ user: {} })
    }

    render() {
        const { name, photo } = this.state.user
        const { provider } = this.props
        const { disabled } = this.state
        const atSymbol = provider === 'twitter' ? '@' : ''

        return (
            <div className="inlineBlock">
                {name
                    ? <div className='button-wrapper fadein-fast'>
                        <button
                            onClick={this.startAuth}
                            className={`${provider} ${disabled} custom-button`}
                        >
                            <img src={photo} alt={name} />
                            <FontAwesome
                                name='times-circle'
                                className='close'
                                onClick={this.closeCard}
                            />
                        </button>
                    </div>
                    : <div className='button-wrapper fadein-fast float-left'>
                        <button
                            onClick={this.startAuth}
                            className={`${provider} ${disabled} custom-button`}
                        >
                            <FontAwesome
                                name={provider}
                            />
                        </button>
                    </div>
                }
            </div>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
}
