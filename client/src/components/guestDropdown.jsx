import React from 'react';

let GuestDropdown = props => {

  return (
    <div>
      <div>
        <span>Adults</span><button name='adults'>-</button><span>{props.adults}</span><button name='adults'>+</button>
      </div>
      <div>
        <span>Children</span><button name='children'>-</button><span>{props.children}</span><button name='children'>+</button>
      </div>
      <div>
        <span name='infants'>Infants</span><button>-</button><span>{props.infants}</span><button name='infants'>+</button>
      </div>
    </div>
  );
}

export default GuestDropdown;