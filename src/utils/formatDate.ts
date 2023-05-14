export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: any = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}