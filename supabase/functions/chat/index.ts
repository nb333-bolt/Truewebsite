// Chatbot edge function grounded on TRU Community Fund site content
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_CONTEXT = `
You are the TRU Community Fund assistant. Answer questions based ONLY on the site content below. If a user asks about something outside this scope, politely say you can only help with TRU Community Fund topics and suggest relevant sections.

## About
The Transpennine Route Upgrade (TRU) is a multi-billion-pound programme upgrading the 70-mile railway between Manchester, Huddersfield, Leeds and York. As part of this, the TRU Community Fund reinvests into the communities along the route.

## The TRU Community Fund
Local community groups, schools and charities along the route can apply for funding to improve local spaces — restoring green areas, renovating facilities, and enhancing the places that matter most to residents.

## 2025 Fund
The 2025 Community Fund is open for applications from eligible groups along the TRU corridor. Recipients will be announced on the Recipients section of the site.

## 2024 Projects
In 2024, the fund supported a range of community-led projects across Manchester, Huddersfield, Leeds, York and stations in between — including green space restoration, community hall refurbishments, youth programmes and heritage projects.

## Strategy
The fund is part of TRU's Sustainable Development Strategy: investing meaningfully in the places the railway serves, ensuring long-term benefit beyond the infrastructure upgrade itself.

## Route / Stations
Key stations on the route include Manchester Victoria, Stalybridge, Huddersfield, Dewsbury, Leeds, Garforth, Micklefield, Church Fen, and York.

## How to apply / Get involved
Visit the "2025 Fund" and "Recipients" sections on this page. For queries, direct users to the fund contact info in the footer.

Tone: warm, concise, helpful. Use short paragraphs or bullet points. Never invent names of recipients or award amounts.
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SITE_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached, please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
