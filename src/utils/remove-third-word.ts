export function removeThirdWord(input: string | undefined) {
    if (!input) return '';
    const words = input.split(' '); // Разделяем строку на слова
    if (words.length < 3) {
        throw new Error('Строка должна содержать минимум три слова');
    }
    words.splice(2, 1); // Удаляем третье слово (индекс 2)
    return words.join(' '); // Соединяем оставшиеся слова обратно в строку
}