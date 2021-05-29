import Modal from '@material-ui/core/Modal';

function LostSectorMap(props) {
    const lostSector = props.lostSector
    return (
      <div className="LostSectorMap">
          MAP OF {lostSector}
        {/* <Modal> MAP OF {lostSector}.</Modal> */}
      </div>
    );
  }
  
  export default LostSectorMap;
  