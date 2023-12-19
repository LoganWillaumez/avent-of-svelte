export const load = async ({ fetch }) => {
	const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	const data = await response.json();
	const naughty = data.filter((item: { name: string; tally: number }) => item.tally < 0);
	const nice = data.filter((item: { name: string; tally: number }) => item.tally >= 0);
	return { naughty, nice };
};
