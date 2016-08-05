import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainSection from '../components/MainSection.jsx'
import * as TodoActions from '../actions/index.jsx'


export default class App extends Component {
    render() {
        return (
            <div>
                <MainSection />
            </div>
        )
    }
}
