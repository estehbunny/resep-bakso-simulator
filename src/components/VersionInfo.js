import React from 'react'

class VersionInfo extends React.Component {
  render() {
    this.platform = this.props.platform
    this.onChangePlatform = this.props.onChangePlatform
    this.selected = this.props.selected
    const parsedReleaseDate = new Date(this.platform.releaseDate)

    return (
      <div>
        <input
          id={this.platform.id}
          type='radio'
          name='platform'
          value={this.platform.id}
          onChange={this.onChangePlatform}
          defaultChecked={this.selected}
          className='hidden-radio'
        />
        <label htmlFor={this.platform.id}>
          <div
            className={`bigcard bigcard--version ${
              this.selected ? 'bigcard--selected' : ''
            }`}
          >
            <div>Platform: <strong>{this.platform.name}</strong></div>
            <div>Version: {this.platform.version}</div>
            <div>
              Release Date: {parsedReleaseDate.toLocaleDateString('ID')}
            </div>
          </div>
        </label>
      </div>
    )
  }
}

export default VersionInfo
