import FileSaver from 'file-saver'
import { ideasPrompts } from '../data'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * ideasPrompts.length);
    const randomPrompt = ideasPrompts[randomIndex];

    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}