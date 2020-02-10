import React, { useEffect } from 'react'
import Layout from '../components/common/layout'
import { css } from '@emotion/core'
import SEO from '../components/common/seo'
import { authActions } from '../state/ducks/auth'
import { connect } from 'react-redux'

const History = ({ session, initializeSessionWatcher }) => {
  useEffect(() => {
    initializeSessionWatcher()
  }, [])

  return (
    <Layout>
      <SEO title="History" />
      <div
        css={css`
          margin: 0 auto;
          max-width: 600px;
          text-align: center
        `}
      >
        <p css={css`margin-bottom:20px`}>
          This feature is not existed. Please enjoy Super Bowl Commercials below
          😂< br/>
          <b>Pro tips:</b> Open <a href="https://sideshift.ai/a/LcOQGFuml">SideShift.ai</a> for real and full-feature application.
        </p>
        <div
          css={css`
            position: relative;
            padding-bottom: 56.25%;
            padding-top: 30px;
            height: 0;
            overflow: hidden;
          `}
        >
          <iframe
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            `}
            src="https://www.youtube.com/embed/SEitIMlnR70"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    session: state.auth.session,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeSessionWatcher: () =>
      dispatch(authActions.initializeSessionWatcher()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
