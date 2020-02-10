/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { colors } from './theme'
import { connect } from 'react-redux'
import Header from './header'

const Layout = ({ children, isLoading }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  if (isLoading) {
    return (
      <div
        css={css`
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src="/img/loading.gif" alt="loading" />
      </div>
    )
  }

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

          * {
            box-sizing: border-box;
            margin: 0;
          }

          body {
            background: ${colors.bodyBackground};
            font-family: 'Roboto', sans-serif;
          }

          input {
            &:focus {
              border-color: ${colors.primary};
              box-shadow: none;
              outline: 0 none;
            }
          }
        `}
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        css={css`
          margin: 0 auto;
          max-width: 960px;
          min-height: 100vh;
          padding: 0 1.0875rem 1.45rem;
          @media (max-width: 425px) {
            padding: 1rem;
          }
        `}
      >
        <main>{children}</main>
      </div>
      <footer
        css={css`
          color: white;
          background: black;
        `}
      >
        <div
          css={css`
            margin: 0 auto;
            max-width: 960px;
            padding: 1rem 1.0875rem 1.45rem;
            text-align: center
          `}
        >
          <div>
            <div>
              🚀 {new Date().getFullYear()}, Built with{' '}
              <a
                css={css`
                  color: white;
                `}
                href="https://sideshift.ai"
              >
                SideShift AI
              </a>{' '}
              APIs
            </div>
            <div>
              (For{' '}
              <a
                css={css`
                  color: white;
                `}
                href="https://angel.co/company/sideshift-ai/jobs/671391-software-engineer-frontend"
              >
                Software Enggineer Application
              </a>{' '}
              Purpose Only)
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.common?.isLoading,
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(mapStateToProps, {})(Layout)
