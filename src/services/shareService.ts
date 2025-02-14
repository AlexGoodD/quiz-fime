
export async function shareOnTwitter(message: string, posgrado: string) {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}%0A${encodeURIComponent(posgrado)}%0A${encodeURIComponent('https://quiz-maestrias.vercel.app')}&hashtags=QuizMaestriasFime`; window.open(tweetUrl, '_blank');
}

export async function shareOnFacebook(message: string, posgrado: string) {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=https://quiz-maestrias.vercel.app&quote=${encodeURIComponent(message)}%0A${encodeURIComponent(posgrado)}`;
    window.open(fbUrl, '_blank');
}
