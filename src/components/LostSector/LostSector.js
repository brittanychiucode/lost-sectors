import React, { Component } from 'react';
import LostSectorData from '../../data/lost_sectors_splicer.json';
import './LostSector.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import LostSectorMap from '../LostSectorMap/LostSectorMap';

const LostSectorOrder = ["concealed_void", "bunker_e15", "perdition", "the_quarry", "scavengers_den", "excavation_site", "exodus_garden", "veles_labyrinth", "empty_tank", "k1_logistics", "k1_communion", "k1_crew_quarters", "k1_revelation"];
const LostSectorRewardOrder = ["Legs", "Guantlet", "Chest", "Helmet"];
const LengendModifiers = ["Extra Shields", "Match Game", "Locked Equipment"];
const MasterModifiers = ["Extra Shields", "Match Game", "Locked Equipment", "Extra Champions"];

// Master lost sector is legend index -1 
// Master reward is legend index -1 

class LostSector extends Component {
 
  constructor(){
    super();

    this.state = {
      curLegendLostSector: this.getLegendLostSector(),
      curLegendLostSectorReward: this.getLegendLostSectorAward(),
      curMasterLostSector: this.getMasterLostSector(),
      curMasterLostSectorReward: this.getMasterLostSectorAward(),
      showMap: false
    }

    this.getDeltaDays = this.getDeltaDays.bind(this);
    this.getLegendLostSector = this.getLegendLostSector.bind(this)
    this.getLegendLostSectorAward = this.getLegendLostSectorAward.bind(this);
    this.getMasterLostSector = this.getMasterLostSector.bind(this)
    this.getMasterLostSectorAward = this.getMasterLostSectorAward.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  getDeltaDays(){
    const msDays = 1000 * 60 * 60 * 24; 
    const seedDate = new Date('09 May 2021 5:00 UTC');
    const seedDateMs = seedDate.getTime();
  
    var today = new Date();
    var todayMs = today.getTime();
    var delta = todayMs - seedDateMs;
    var days = Math.floor(delta/msDays);

    return days;

  }

  getLegendLostSector() {
    const days = this.getDeltaDays();

    var LegendLostSectorIndex = days % LostSectorOrder.length;

    return LostSectorOrder[LegendLostSectorIndex];
  }

  getLegendLostSectorAward() {
    const days = this.getDeltaDays();

    var LegendRewardIndex = days % LostSectorRewardOrder.length;

    return LostSectorRewardOrder[LegendRewardIndex];
  }

  getMasterLostSector() {
    const days = this.getDeltaDays();

    var MasterLostSectorIndex = (days % LostSectorOrder.length)-1;

    return LostSectorOrder[MasterLostSectorIndex];
  }

  getMasterLostSectorAward() {
    const days = this.getDeltaDays();
    var masterRewardIndex = 0;

    if(days % LostSectorRewardOrder.length === 0){
      masterRewardIndex = LostSectorRewardOrder.length-1 
    } else {
      masterRewardIndex = (days % LostSectorRewardOrder.length)-1;
    }

    return LostSectorRewardOrder[masterRewardIndex];
  }

  onMapClick(){
    this.setState({
      showMap: true
    })
  }

  render(){
   return (
      <div className="lost">
        <Card raised="true" className="legend shadow-lg p-3 mb-5 bg-white rounded">
          <p><b>Legend Lost Sector:</b> {LostSectorData[this.state.curLegendLostSector]["name"]}</p> 
          <p><b>Legend Reward</b>: {this.state.curLegendLostSectorReward}</p>
          <p><b>Location</b>: {LostSectorData[this.state.curLegendLostSector]["location"]}</p>
          <p><b>Champions</b>: {LostSectorData[this.state.curLegendLostSector]["champions"].join(", ")}</p>
          <CardActions>
            {/* <Button variant="contained" color="primary" lostSector={this.state.curLegendLostSector} onClick={this.onMapClick} >Map</Button> */}
            {/* <Button variant="contained" color="primary">Video</Button> */}
          </CardActions>
        </Card>
        <LostSectorMap show={this.state.showMap}></LostSectorMap>
        <br></br>
        <Card raised="true" className="master shadow-lg p-3 mb-5 bg-white rounded">
          <p><b>Master Lost Sector</b>: {LostSectorData[this.state.curMasterLostSector]["name"]}</p>
          <p><b>Master Reward</b>: {this.state.curMasterLostSectorReward}</p>
          <p><b>Location</b>: {LostSectorData[this.state.curLegendLostSector]["location"]}</p>
          <p><b>Champions</b>: {LostSectorData[this.state.curMasterLostSector]["champions"].join(", ")}</p>
          <CardActions>
            {/* <Button variant="contained" color="primary" lostSector={this.state.curMasterLostSector} onClick={this.onMapClick}>Map</Button> */}
            {/* <Button variant="contained" color="primary">Video</Button> */}
          </CardActions>
        </Card>        
      </div>
    );
  }
}

export default LostSector;