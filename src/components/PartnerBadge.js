import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PartnerBadge extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      sitetypes : ["CART", "STORE", "IAP", "CONNECT"],
      partner : {},
      editBtn : false,
      deleteBtn : false,
      showPartnerEditForm : false,
      partnerEdited : false,
    });
    this.onSubmit = this.onEditedPartner.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  onClick(e){
    if ((e.target.title.indexOf('Confluence') === -1) && (this.props.clickable)) this.props.history.push(`/nxw_cop/${this.props.partner.name.split(' ').join('')}`);
  }
  onEditPartner(e) {
    this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
  }
  onDeletePartner(e) {
    e.preventDefault();
    this.props.onDeleted(this.state.partner);
  }
  updateState(e){
    const stateObj = this.state.partner;
    if (stateObj[e.target.name] !== e.target.value) {
      this.setState({ partnerEdited : true });
      stateObj[e.target.name] = e.target.value;
      this.setState({ partner : stateObj });
    }
  }
  onEditedPartner(e) {
    e.preventDefault();
    if (this.state.partnerEdited) {
      console.log('partnerEdited : '+this.state.partnerEdited);
      this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
      this.props.onEdited(this.state.partner);
    } else {
      this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
    }
  }

  componentDidMount() {
    let statePartnerInit = this.props.partner;
    statePartnerInit.fbdbkey = this.props.partner.fbdbkey;
    this.setState({ partner : statePartnerInit });
  }
  render() {
    const listTypeOptions = this.state.sitetypes.map( type => { return( <option key={type} value={type}>{type}</option> ) });
    let WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    let EditBtns = this.state.editBtn || this.state.deleteBtn ?
      <div className="btn-group">
        { this.state.editBtn ? <a className='btn btn-sign' onClick={ this.onEditPartner.bind(this) }>...</a> : null }
        { this.state.deleteBtn ? <a className='btn btn-sign lowered-sign' onClick={ this.onDeletePartner.bind(this) }>\<u>*</u>/</a> : null }
      </div> : null;
    return (
      this.state.showPartnerEditForm ?
        <li id="partner-editor" className="partner-badge">
          <form onSubmit={ this.onSubmit } >
            <select name="sitetype" value={ this.state.partner.sitetype } onChange={ this.updateState }>
              {listTypeOptions}
            </select>
            <input name="name" type="text" placeholder="Name" value={ this.state.partner.name } onChange={ this.updateState } />
            <input name="logo" type="text" placeholder="Logo Url" value={ this.state.partner.logo } onChange={ this.updateState } />
            <input name="confluence" type="text" placeholder="Confluence Url" value={ this.state.partner.confluence } onChange={ this.updateState } />
            <input type="submit" value="OK"/>
          </form>
        </li>
      :
        <WrapTag className="partner-badge">
          <div className="partner-header" onClick={this.onClick.bind(this)}>
            <div className="partner-logo"><img src={this.state.partner.logo} alt={this.state.partner.name} /></div>
            <h2 className="partner-id">{this.state.partner.name}</h2>
            <div className={`partner-type ${this.state.partner.sitetype}`}>{this.state.partner.sitetype}</div>
            { (this.state.partner.confluence !== "") && (this.state.partner.confluence !== undefined) ?  <a className='partner-confluence' href={ this.state.partner.confluence } target="_blank" title="Confluence Doc">DOC</a> : null }
          </div>
          { EditBtns }
        </WrapTag>
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ editBtn : nextProps.editMode });
    this.setState({ deleteBtn : nextProps.deleteMode });
  }
};

const PartnerBadgeWithRouter = withRouter(PartnerBadge);
export default PartnerBadgeWithRouter;
