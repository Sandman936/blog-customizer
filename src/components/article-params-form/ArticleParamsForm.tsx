import { FormEvent, ReactElement, useRef, useState } from 'react';
import { Button } from '../button';
import { ArrowButton } from '../../components/arrow-button';
import { Text } from '../../components/text';
import { Select } from '../../components/select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type FormProps = {
	currentAppState: ArticleStateType;
	setCurrentAppState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentAppState,
	setCurrentAppState,
}: FormProps): ReactElement => {
	//Состояние значения шрифта в форме
	const [newFontFamily, setFontFamily] = useState<OptionType>(
		currentAppState.fontFamilyOption
	);

	//Состояние значения размера текста в форме
	const [newFontSize, setFontSize] = useState<OptionType>(
		currentAppState.fontSizeOption
	);

	//Состояние значения цвета текста в форме
	const [newFontColor, setFontColor] = useState<OptionType>(
		currentAppState.fontColor
	);

	//Состояние значения цвета фона в форме
	const [newBackgroundColor, setBackgroundColor] = useState<OptionType>(
		currentAppState.backgroundColor
	);

	//Состояние значения ширины контента в форме
	const [newContentWidth, setContentWidth] = useState<OptionType>(
		currentAppState.contentWidth
	);

	//Состояние открытия/закрытия меню настроек
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	//Ссылка на элемент, используемый хуком закрытия меню
	const rootRef = useRef<HTMLDivElement>(null);

	//Хук, который закрывает меню, если произошел клик вне формы
	useOutsideClickClose({
		isOpen: isMenuOpened,
		rootRef,
		onClose: () => setIsMenuOpened(false),
		onChange: setIsMenuOpened,
	});

	//Обработчик отправки формы
	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setCurrentAppState({
			fontFamilyOption: newFontFamily,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSize,
		});
	}

	//Обработчик сброса значений формы
	function handleFormReset(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setCurrentAppState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	}

	return (
		<div ref={rootRef}>
			<ArrowButton
				onClick={() => setIsMenuOpened(!isMenuOpened)}
				isOpened={isMenuOpened}
			/>
			<aside
				className={clsx(
					styles.container,
					isMenuOpened && styles.container_open
				)}>
				<form
					className={styles.form}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}>
					<Text
						as='h2'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={newFontFamily}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={newFontSize}
						onChange={setFontSize}
					/>
					<Select
						options={fontColors}
						selected={newFontColor}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={newBackgroundColor}
						title='Цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={newContentWidth}
						title='Ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' color='black' />
						<Button title='Применить' type='submit' color='gold' />
					</div>
				</form>
			</aside>
		</div>
	);
};
