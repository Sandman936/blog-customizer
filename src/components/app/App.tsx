import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';

import styles from './index.module.scss';

export const App = () => {
	//Состояние настроек страницы
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentAppState={articleState}
				setCurrentAppState={setArticleState}
			/>
			<Article />
		</main>
	);
};
