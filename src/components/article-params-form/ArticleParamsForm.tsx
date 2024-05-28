import { FormEvent, LegacyRef, ReactElement, ReactNode } from 'react';
import { Button } from '../button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type FormProps = {
	rootRef: LegacyRef<HTMLDivElement>;
	toggleVisibilityButton: ReactNode;
	options: ReactNode;
	isOpened: boolean;
	onReset: (event: FormEvent<HTMLFormElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const ArticleParamsForm = (formProps: FormProps): ReactElement => {
	return (
		<div ref={formProps.rootRef}>
			{formProps.toggleVisibilityButton}
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: formProps.isOpened,
				})}>
				<form
					className={styles.form}
					onReset={formProps.onReset}
					onSubmit={formProps.onSubmit}>
					{formProps.options}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' color='black' />
						<Button title='Применить' type='submit' color='gold' />
					</div>
				</form>
			</aside>
		</div>
	);
};
