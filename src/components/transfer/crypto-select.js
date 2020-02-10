import React, { useState } from 'react'
import Select from 'react-select'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { colors } from '../common/theme'

const SelectLabel = ({
  menuIsOpen,
  selectedOption,
  asset,
  displayName,
  id,
}) => {
  const selected = selectedOption && selectedOption.id == id

  if (menuIsOpen) {
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 10px;
          color: ${selected ? 'white' : 'black'};
          background: ${selected ? colors.primary : ''};
        `}
      >
        <div>
          <img
            src={`/logos/color/${asset}.svg`}
            css={css`
              width: 32px;
              height: 32px;
            `}
          />
        </div>
        <span
          css={css`
            margin-left: 0.5rem;
          `}
        >{`${asset} - ${displayName}`}</span>
      </div>
    )
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 10px;
      `}
    >
      <div>
        <img
          css={css`
            height: 60px;
            width: 60px;
          `}
          src={`/logos/color/${asset}.svg`}
        />
      </div>
      <div
        css={css`
          margin-left: 0.5rem;
        `}
      >
        <div
          css={css`
            font-size: 1.8rem;
            font-weight: 700;
          `}
        >
          {asset}
        </div>
        <div>{displayName}</div>
      </div>
    </div>
  )
}

const CryptoSelect = ({
  options,
  selectedOption,
  setSelectedOption,
  label,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
  }

  const groupOptions = () => {
    let popularOptions = [],
      stableCoinOptions = [],
      otherOptions = [],
      saiOptions = []

    options.forEach(opt => {
      opt.categories.map(cat => {
        const catId = cat.id

        if (catId == 'popular') {
          popularOptions.push(opt)
        } else if (catId == 'stablecoin') {
          stableCoinOptions.push(opt)
        } else if (catId == 'sai') {
          saiOptions.push(opt)
        } else {
          otherOptions.push(opt)
        }
      })
    })

    let groupOptions = [
      {
        label: 'Popular',
        options: popularOptions,
      },
      {
        label: 'Stablecoin',
        options: stableCoinOptions,
      },
      {
        label: 'Other',
        options: otherOptions,
      },
      {
        label: 'SideShift.ai',
        options: saiOptions,
      },
    ]
    return groupOptions
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      boxShadow: `none`,
      borderColor: state.isFocused ? colors.primary : provided.borderColor,
      '&:hover': { borderColor: colors.primary },
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
    groupHeading: (provided, state) => ({
      ...provided,
      padding: '10px',
      fontSize: '1rem',
      color: colors.primary,
      background: '#f8f8f8',
      textTransform: 'none',
    }),
    input: (provided, state) => ({
      ...provided,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      fontSize: '1.8rem',
      width: '100%',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      padding: '10px',
      fontSize: '1.8rem',
      color: '#e6e6e6',
      fontWeight: 300,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: '0px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      padding: '0px',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      background: 'transparent',
    }),
  }

  return (
    <>
      <label
        css={css`
          margin-bottom: 5px;
          display: block;
          color: #898989;
        `}
      >
        {label}
      </label>
      <Select
        value={menuIsOpen ? null : selectedOption}
        styles={customStyles}
        onChange={handleChange}
        options={groupOptions()}
        getOptionLabel={({ asset, displayName, id }) => (
          <SelectLabel
            menuIsOpen={menuIsOpen}
            selectedOption={selectedOption}
            asset={asset}
            displayName={displayName}
            id={id}
          />
        )}
        getOptionValue={({ asset, id, displayName }) =>
          `${asset} ${id} ${displayName}`
        }
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
      />
    </>
  )
}

CryptoSelect.propTypes = {
  options: PropTypes.array.isRequired,
}

SelectLabel.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  selectedOption: PropTypes.object,
  asset: PropTypes.string,
  displayName: PropTypes.string,
}

export default CryptoSelect
