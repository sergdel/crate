// Imports
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'

// UI Imports
import {Grid, GridCell} from '../../ui/grid'
import {H3} from '../../ui/typography'
import {grey, grey2} from '../../ui/common/colors'

// App Imports
import {getList as getCratesList} from './api/actions'
import Loading from '../common/Loading'
import CrateItem from './Item'

// Component
class List extends Component {

  // Runs on server only for SSR
  static fetchData({store}) {
    return store.dispatch(getCratesList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCratesList()
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Crates for everyone! - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{backgroundColor: grey}}>
          <GridCell style={{padding: '2em', textAlign: 'center'}}>
            <H3 font="secondary">Crates for everyone!</H3>

            <p style={{marginTop: '1em', color: grey2}}>You can choose crate which suits your need. You can also
              subscribe to multiple crates.</p>
          </GridCell>
        </Grid>

        {/* Crate list */}
        <Grid>
          <GridCell>
            {
              this.props.crates.isLoading
                ?
                <Loading/>
                :
                (
                  this.props.crates.list.length > 0
                    ?
                    this.props.crates.list.map(crate => (
                      <div key={crate.id} style={{margin: '2em', float: 'left'}}>
                        <CrateItem crate={crate}/>
                      </div>
                    ))
                    :
                    <p>No crates to show.</p>
                )
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  crates: PropTypes.object.isRequired,
  getCratesList: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    crates: state.crates
  }
}

export default connect(listState, {getCratesList})(List)
