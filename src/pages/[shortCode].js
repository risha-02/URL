import supabase from "../lib/supabaseClient";

export async function getServerSideProps({ params }) {
  const { shortCode } = params;

  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_code", shortCode)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: data.original_url,
      permanent: false,
    },
  };
}

export default function ShortCodeRedirect() {
  return null;
}
