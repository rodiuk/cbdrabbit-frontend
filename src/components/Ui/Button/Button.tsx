import React from 'react';
import cn from "clsx";

import s from "./s.module.css";
import { ArrowLeftIcon } from '@/components/icons/ArrowLeft';

interface ButtonProps {
	className?: string
	text: string
	iconLeft?: boolean
}

const Button: React.FC<ButtonProps> = ({className, iconLeft, text}) => {
	return (
		<button className={cn(s.button, className && s[className])}>
			{iconLeft && (
				<span className={s.icon_block_left}>
					<ArrowLeftIcon iconStyle={s.icon_left} />
				</span>
			)}
			{text}
		</button>
	);
};

export default Button;
