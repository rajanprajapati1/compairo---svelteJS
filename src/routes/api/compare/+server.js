import { reqGroqAI } from "../../../utils/GroqClient";

export async function POST({request}) {
    try {
        const data = await request.json();
        const res = await reqGroqAI(data);
        const results = await res?.choices[0]?.message?.content ;
        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

}