export function successNotification(addNotification: any, text: string) {
	addNotification({
		text,
		position: 'top-right',
		type: 'success',
		removeAfter: 1000
	});
}
export function errorNotification(addNotification: any, text: string) {
	addNotification({
		text,
		position: 'top-right',
		type: 'errorr',
		removeAfter: 1000
	});
}
