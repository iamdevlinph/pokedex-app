export async function GET() {
  const data = await fetch(`https://pokeapi.co/api/v2/type/`).then((res) => res.json());

  return Response.json({
    data: data,
  });
}
