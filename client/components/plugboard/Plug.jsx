import React from 'react';

const Plug = (props) => {
  return (<div className='plug' id={props.id}>
    {props.id}
    <div className='plug_inner'>
      <div></div>
    </div>
  </div>);
}

export default Plug;