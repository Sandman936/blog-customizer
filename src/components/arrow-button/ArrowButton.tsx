import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	clickHandler?: OnClick;
	isOpened?: boolean;
};

export const ArrowButton = (propsArrowButton: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: propsArrowButton.isOpened,
			})}
			onClick={propsArrowButton.clickHandler}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: propsArrowButton.isOpened,
				})}
			/>
		</div>
	);
};
