

export async function createControl() {
    try {
        const response = await fetch('/api/control/all', { method: 'POST' });
        const data = await response.json();
        return data

    } catch (error) {
        console.log(error);
    }

}