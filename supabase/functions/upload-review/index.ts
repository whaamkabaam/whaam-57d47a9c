import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const gameTag = formData.get("gameTag") as string | null;
    const isFeatured = formData.get("isFeatured") === "true";

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `${timestamp}-${randomId}.${extension}`;
    const storagePath = filename;

    console.log(`Uploading file: ${filename}, size: ${file.size}, type: ${file.type}`);

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("reviews")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: `Upload failed: ${uploadError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert database record
    const { data: dbData, error: dbError } = await supabase
      .from("review_screenshots")
      .insert({
        filename: file.name,
        storage_path: storagePath,
        game_tag: gameTag || null,
        is_featured: isFeatured,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Try to clean up the uploaded file
      await supabase.storage.from("reviews").remove([storagePath]);
      return new Response(
        JSON.stringify({ error: `Database error: ${dbError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully uploaded and recorded: ${filename}`);

    return new Response(
      JSON.stringify({
        success: true,
        data: dbData,
        url: `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/reviews/${storagePath}`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
