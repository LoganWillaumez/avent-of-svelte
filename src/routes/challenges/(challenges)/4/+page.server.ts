export const load = async ({ fetch }) => {
	const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
	const data = await response.json();
	return {data};
};
