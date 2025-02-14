import html2canvas from 'html2canvas';

export async function captureImage(index: number, userAnswerRefs: HTMLElement[]) {
    const element = userAnswerRefs[index];
    const canvas = await html2canvas(element);
    return canvas.toDataURL('image/png');
}

export async function downloadImage(index: number, userAnswerRefs: HTMLElement[]) {
    const imageUrl = await captureImage(index, userAnswerRefs);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `respuesta_${index + 1}.png`;
    link.click();
}