import { writable } from 'svelte/store';
import { getRequest } from '../utils/request';
export const dicts = writable<any>({});
export const search = writable('');
export const lang = writable('en');
export const coverage = writable<any>({});
export const translations = writable<any>({});

export const loadDicts = async () => {
	dicts.set(await getRequest('api/dictionaries'));
};

export const loadCoverage = async () => {
	coverage.set(await getRequest('api/coverage'));
};

let langValue = '';
let dictsValue: { [id: string]: string } = {};
let translationsValue: { [id: string]: string } = {};

lang.subscribe((value) => {
	langValue = value;
});

dicts.subscribe((value) => {
	dictsValue = value;
});

translations.subscribe((value) => {
	translationsValue = value;
});

export const loadTranslations = async () => {
	if (!langValue) {
		lang.set(Object.keys(dictsValue)[0]);
	}

	for (const language of Object.keys(dictsValue)) {
		translationsValue[language] = await getRequest(`api/translations/${dictsValue[language]}`);
	}
	translations.set(translationsValue);
};
