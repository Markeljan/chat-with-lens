export const runtime = 'edge'

export async function POST(req: Request) {

    const json = await req.json();
    const { text, voiceId } = json;

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
        method: 'POST',
        headers: {
            'accept': "audio/mpeg",
            'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                similarity_boost: 1,
                stability: 0.3,
                style: 0.25,
                use_speaker_boost: true
            }
        })
    });

    // Error handling
    if (!res.ok || !res.body) {
        return new Response('Failed to get voice response', { status: res.status });
    }

    //create a readable stream from the response body
    const stream = res.body;


    // const { readable, writable } = new TransformStream();


    // res.body.pipeTo(writable);


    return new Response(stream);
}