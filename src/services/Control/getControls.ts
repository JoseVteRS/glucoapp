

export async function createControl() {
    try {
        const response = await fetch('/api/control/all', { method: 'POST' });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        return data

    } catch (error) {
        console.log(error);
    }

}