import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colors } from './theme'

const StyledHeader = styled('header')`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    display: block;
  }
`

const NavLink = styled(Link)`
  display: inline-block;
  padding-left: 0.8rem;
  text-decoration: none;
  &:hover{
    color: black
  }
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <div
      css={css`
        display: inline-flex;
        justify-content: start;
        padding-right: 10px;
        @media (max-width: 425px) {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
          padding-right: 0px;
        }
      `}
    >
      <div>
        <Link to="/">
          <img src="/img/logo.svg" alt="logo" />
        </Link>
      </div>
      <div>
        <span
          css={css`
            font-size: 0.7rem;
            color: white;
            display: inline-block;
            background: ${colors.primary};
            padding: 0.2rem 0.3rem;
            font-weight: 700;
            margin-left: 0.15rem;
            border-radius: 4px;
            line-height: 0.7rem;
          `}
        >
          V0.5
        </span>
      </div>
    </div>
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <NavLink
        css={css`
          padding-left: 0px;
        `}
        to="/history"
      >
        Shift History
      </NavLink>
      <NavLink to="/affiliate">Affiliate Balance (0 SAI)</NavLink>
    </div>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
