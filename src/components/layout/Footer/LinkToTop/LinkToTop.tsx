"use client"

import { ArrowRightIcon } from '@/components/icons/ArrowRight';

import s from "./LinkToTop.module.css";
import Link from 'next/link';

const LinkToTop = () => {
	return (
		<Link className={s.toTop} href="#headerId"  ><ArrowRightIcon iconStyle={s.arrow} /></Link>
	);
};

export default LinkToTop;
