import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const button = ({children, onClick, tip, btnClassName, tipClassName, placement}) => {
	return(
		<Tooltip title={tip} className={tipClassName} placement={placement}>
			<IconButton onClick={onClick} className={btnClassName}>
				{children}
			</IconButton>
		</Tooltip>
		)
}

export default button;