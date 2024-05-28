import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent, useRef } from 'react';
import { useOutsideClickClose } from './components/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './components/arrow-button';
import { Text } from './components/text';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//Состояние настроек страницы
	const [appState, setAppState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		bgColor: defaultArticleState.backgroundColor,
	});

	const [formState, setFormState] = useState(appState);

	//Состояние открытия/закрытия меню настроек
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	//Обработчик клика по кнопке открытия/закрытия меню настроек
	function handleArrowClick() {
		setIsMenuOpened(!isMenuOpened);
	}

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpened,
		rootRef,
		onClose: () => setIsMenuOpened(false),
		onChange: setIsMenuOpened,
	});

	function onChangeFontFamilyOption(option: OptionType) {
		setFormState({
			fontFamily: option,
			fontSize: formState.fontSize,
			fontColor: formState.fontColor,
			containerWidth: formState.containerWidth,
			bgColor: formState.bgColor,
		});
	}

	function onChangeFontSizeOption(option: OptionType) {
		setFormState({
			fontFamily: formState.fontFamily,
			fontSize: option,
			fontColor: formState.fontColor,
			containerWidth: formState.containerWidth,
			bgColor: formState.bgColor,
		});
	}

	function onChangeFontColorOption(option: OptionType) {
		setFormState({
			fontFamily: formState.fontFamily,
			fontSize: formState.fontSize,
			fontColor: option,
			containerWidth: formState.containerWidth,
			bgColor: formState.bgColor,
		});
	}

	function onChangeContainerWidthOption(option: OptionType) {
		setFormState({
			fontFamily: formState.fontFamily,
			fontSize: formState.fontSize,
			fontColor: formState.fontColor,
			containerWidth: option,
			bgColor: formState.bgColor,
		});
	}

	function onChangeBackGroundOption(option: OptionType) {
		setFormState({
			fontFamily: formState.fontFamily,
			fontSize: formState.fontSize,
			fontColor: formState.fontColor,
			containerWidth: formState.containerWidth,
			bgColor: option,
		});
	}

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setAppState(formState);
	}

	function handleFormReset(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setAppState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			containerWidth: defaultArticleState.contentWidth,
			bgColor: defaultArticleState.backgroundColor,
		});

		setFormState({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			containerWidth: defaultArticleState.contentWidth,
			bgColor: defaultArticleState.backgroundColor,
		});
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamily.value,
					'--font-size': appState.fontSize.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.containerWidth.value,
					'--bg-color': appState.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				rootRef={rootRef}
				toggleVisibilityButton={
					<>
						<ArrowButton
							clickHandler={handleArrowClick}
							isOpened={isMenuOpened}
						/>
					</>
				}
				options={
					<>
						<Text
							as={'h2'}
							size={31}
							dynamic={false}
							weight={800}
							fontStyle={'normal'}
							uppercase={true}
							align={'left'}
							family={'open-sans'}
							dynamicLite={false}>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamily}
							title={'Шрифт'}
							onChange={onChangeFontFamilyOption}></Select>
						<RadioGroup
							title={'Размер шрифта'}
							name={'font-size'}
							options={fontSizeOptions}
							selected={formState.fontSize}
							onChange={onChangeFontSizeOption}></RadioGroup>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							title={'Цвет шрифта'}
							onChange={onChangeFontColorOption}></Select>
						<Separator></Separator>
						<Select
							options={backgroundColors}
							selected={formState.bgColor}
							title={'Цвет фона'}
							onChange={onChangeBackGroundOption}></Select>
						<Select
							options={contentWidthArr}
							selected={formState.containerWidth}
							title={'Ширина контента'}
							onChange={onChangeContainerWidthOption}></Select>
					</>
				}
				isOpened={isMenuOpened}
				onReset={handleFormReset}
				onSubmit={handleFormSubmit}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
