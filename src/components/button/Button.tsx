import { Text } from 'components/text';

import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({
	title,
	onClick,
	type,
	color,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	color?: string;
}) => {
	return (
		<button
			className={clsx({
				[styles.button]: true,
				[styles.reset]: color === 'black',
				[styles.submit]: color == 'gold',
			})}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
