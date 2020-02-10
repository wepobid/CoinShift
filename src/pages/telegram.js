import React, { useEffect } from 'react'
import Layout from '../components/common/layout'
import { css } from '@emotion/core'
import SEO from '../components/common/seo'
import Card from '../components/common/card'
import { authActions } from '../state/ducks/auth'
import { connect } from 'react-redux'
import { QRCode } from 'react-qrcode-logo'

const Telegram = ({ session, initializeSessionWatcher }) => {
  useEffect(() => {
    initializeSessionWatcher()
  }, [])

  return (
    <Layout>
      <SEO title="Telegram" />
      <div
        css={css`
          margin: 0 auto;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            margin-bottom: 20px;
            margin-top: 20px;
            text-align: center;
          `}
        >
          <h2
            css={css`
              margin-bottom: 4px;
            `}
          >
            GET NOTIFIED
          </h2>
          <div>Receive Telegram notifications about your shifts.</div>
        </div>
        <Card>
          <div
            css={css`
              text-align: center;
              @media (max-width: 425px) {
                display: none;
              }
            `}
          >
            <div
              css={css`
                font-weight: 700;
              `}
            >
              Scan QR with your phone
            </div>
            <QRCode
              value={`https://t.me/sideshiftbot?start=${session?.telegramPairingPayload}`}
              logoImage={'/img/qr-logo.svg'}
              fgColor={'#000000'}
            />
            <div>
              <a
                href="https://support.apple.com/en-us/HT208843"
                target="_blank"
                rel="noopener noreferrer"
              >
                iPhone Instructions
              </a>
            </div>
            <div>
              <a
                href="https://medium.com/turunen/built-in-qr-reader-on-android-696e0f38113b"
                target="_blank"
                rel="noopener noreferrer"
              >
                Android Instructions
              </a>
            </div>
          </div>

          <div
            css={css`
              text-align: center;
              @media (min-width: 425px) {
                display: none;
              }
            `}
          >
            <div
              css={css`
                font-weight: 700;
              `}
            >
              1. Open Telegram by clicking on{' '}
              <a href="https://t.me/sideshiftbot?start=${session?.telegramPairingPayload}">
                this link
              </a>
            </div>
            <div
              css={css`
                font-weight: 700;
              `}
            >
              2. Click "start" or type "/start" on Telegram
            </div>
          </div>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Telegram)
