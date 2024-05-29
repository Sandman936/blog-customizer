import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';

import styles from './index.module.scss';

export const App = () => {
	//Состояние настроек страницы
	const [appState, setAppState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentAppState={appState}
				setCurrentAppState={setAppState}
			/>
			<Article />
		</main>
	);
};
