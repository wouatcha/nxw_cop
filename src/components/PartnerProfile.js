import React, { Component } from 'react';
import PartnerMockups from './PartnerMockups';
import PartnerJTickets from './PartnerJTickets';
import PartnerUrlsPrep from './PartnerUrlsPrep';
import PartnerUrlsProd from './PartnerUrlsProd';
import PartnerConnectInfos from './PartnerConnectInfos';
import Button from './Button';

class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerid : '',
      siteType :  '',
      mockupVersions : {},
      connectInfos : {},
      jiratickets : {},
      urlsprep : {},
      urlsprod : {},
    }
  }
  onMockupsChange(versions) {
    this.props.onProfileChange(this.state.partnerid, 'versions', versions);
  }
  onConnectInfosChange(connectInfos) {
    this.props.onProfileChange(this.state.partnerid, 'connectInfos', connectInfos);
  }
  onTicketsChange(tickets) {
    this.props.onProfileChange(this.state.partnerid, 'jiratickets', tickets);
  }
  onUrlsPrepChange(urlsprep) {
    this.props.onProfileChange(this.state.partnerid, 'urlsprep', urlsprep);
  }
  onUrlsProdChange(urlsprod) {
    this.props.onProfileChange(this.state.partnerid, 'urlsprod', urlsprod);
  }
  componentWillMount() {
    this.setState({
      partnerid : this.props.partner.id,
      siteType : this.props.partner.sitetype,
      mockupVersions : this.props.partner.versions,
      connectInfos : this.props.partner.connectInfos,
      jiratickets : this.props.partner.jiratickets,
      urlsprep : this.props.partner.urlsprep,
      urlsprod : this.props.partner.urlsprod,
    })
  }
  render() {
    console.log('this.props : '+this.props+'    -  this.state.siteType : '+this.state.siteType);
    return(
      <div className='sections profile-sections'>
        <Button text='Partners list' path='/nxw_cop/' styleClass='btn-default' icon='back'/>
        { this.state.siteType !== 'CONNECT' ?
          <PartnerMockups versions={this.state.mockupVersions} onMockupsChange={ this.onMockupsChange.bind(this) }/>
          : <PartnerConnectInfos connectInfos={this.state.connectInfos} onConnectInfosChange={ this.onConnectInfosChange.bind(this) }/>
        }
        <PartnerJTickets jiratickets={this.state.jiratickets} onTicketsChange={ this.onTicketsChange.bind(this) }/>
        { (this.state.siteType === 'CART' || this.state.siteType === 'STORE') && <PartnerUrlsPrep urlsprep={this.state.urlsprep} siteType={ this.state.siteType } onUrlsPrepChange={ this.onUrlsPrepChange.bind(this) }/> }
      { !(this.state.siteType === 'CONNECT') && <PartnerUrlsProd urlsprod={this.state.urlsprod} siteType={ this.state.siteType } onUrlsProdChange={ this.onUrlsProdChange.bind(this) }/> }
      </div>
    );
  }
}

export default PartnerProfile;
