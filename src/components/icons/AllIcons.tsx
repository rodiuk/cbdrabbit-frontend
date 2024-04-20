import React from 'react';
import { ArrowDownIcon } from './ArrowDown';
import { ArrowLeftIcon } from './ArrowLeft';
import { ArrowRightIcon } from './ArrowRight';
import { ArrowRightFilterIcon } from './ArrowRightFilter';
import SwitcherArrowIcon from './SwitcherArrow';
import { CartIcon } from './Cart';
import Close from './Close';
import DotsIcon from './DotsIcon';
import CheckIcon from './CheckIcon';

const AllIcons = () => {
	return (
		<div style={{"background": "white"} }>
			<p>ArrowDownIcon</p>
			<ArrowDownIcon />
			<p>ArrowLeftIcon</p>
			<ArrowLeftIcon />
			<p>ArrowRightIcon</p>
			<ArrowRightIcon />
			<p>ArrowRightFilterIcon</p>
			<ArrowRightFilterIcon iconStyle="b" />
			<p>SwitcherArrowIcon</p>
			<SwitcherArrowIcon />
			<p>CartIcon</p>
			<CartIcon />
			<p>Close</p>
			<Close />
			<p>DotsIcon</p>
			<DotsIcon />
			<p>CheckIcon</p>
			<CheckIcon />
		</div>
	);
};

export default AllIcons;
