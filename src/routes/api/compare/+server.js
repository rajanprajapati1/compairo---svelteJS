import { reqGroqAI } from "../../../utils/GroqClient";

export async function POST({ request }) {
  try {
    const data = await request.json();
    const BASE_PROMPT = `Compare the products and return a JSON response in the following format:
{
  "reviewdata": [
    { "name": "Product 1 Name", "revieweddata": "Review of Product 1" },
    { "name": "Product 2 Name", "revieweddata": "Review of Product 2" }
  ],
  "finaldecision": "Which product is better and why.",
  "conclusion": "General recommendation or summary."
}

Use the product details provided to write concise and accurate reviews. Highlight which product is better in the "finaldecision" field. Summarize the comparison in the "conclusion" field.

Here is the product data: ${JSON.stringify(data)}
        `;

    const res = await reqGroqAI(BASE_PROMPT);
    const results = await res?.choices[0]?.message?.content;

    // Extract the JSON part from the results
    const jsonStart = results.indexOf("{");
    const jsonEnd = results.lastIndexOf("}") + 1;
    const jsonPart = results.substring(jsonStart, jsonEnd);

    // Parse the JSON string into a JavaScript object
    const parsedResults = JSON.parse(jsonPart);

    return new Response(JSON.stringify(parsedResults ,results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
