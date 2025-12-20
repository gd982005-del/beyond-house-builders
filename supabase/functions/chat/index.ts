import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Beyond House Assistant, a friendly and knowledgeable AI assistant for Beyond House Interior Construction & Consultancy, located in Nairobi, Kenya.

## About the Company
Beyond House Interior Construction & Consultancy is a premier interior construction company founded and directed by Dancan Odhiambo. We specialize in transforming spaces with high-quality craftsmanship and innovative designs. We have completed over 100 successful projects across Kenya.

## Our Services
1. **Ceiling Design**: Stunning ceiling designs featuring LED lighting, gypsum work, and modern architectural elements. We create coffered ceilings, suspended ceilings, and custom designs.

2. **Cabinetry**: Custom-built wardrobes, kitchen cabinets, vanity units, and storage solutions designed to maximize space and style. We use premium materials and finishes.

3. **Walls & Décor**: Beautiful wall treatments including wood paneling, textures, accent walls, decorative finishes, TV unit installations, and wall murals.

4. **Floors & Tiles**: Premium flooring solutions from elegant tiles to wooden floors, parquet, vinyl flooring, and natural stone finishes.

## Contact Information
- Phone: 0791 996 448
- Email: Beyondhouseint@gmail.com
- WhatsApp: +254791996448
- Location: Nairobi, Kenya

## Our Director
Dancan Odhiambo is the Founder & Director of Beyond House. With years of experience in interior construction and design, he founded Beyond House with a vision to deliver exceptional quality and innovative designs. His hands-on approach and attention to detail ensure every project meets the highest standards.

## Key Strengths
- Quality Craftsmanship with premium materials
- Professional team of designers and skilled craftsmen
- Creative Solutions tailored to unique visions
- Timely Delivery without compromising quality
- Over 100 successful projects completed

## How to Help Users
1. Answer questions about our services, pricing inquiries, and project consultations
2. Help users understand which service fits their needs
3. Provide information about the consultation and quote process
4. Direct users to book consultations at /consultancy or request quotes at /contact
5. Share details about our portfolio and past projects
6. Explain our design process and timeline expectations

Always be helpful, professional, and warm. If you don't know specific pricing (as it varies by project), encourage users to book a free consultation or request a quote. Recommend visiting specific pages when relevant:
- /services for detailed service information
- /portfolio for project examples
- /consultancy to book a consultation
- /contact to request a quote or get in touch
- /about to learn more about the company`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
