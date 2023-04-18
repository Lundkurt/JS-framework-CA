import axios from "axios";
import Image from "next/image";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { BASE_URL, RAWG_KEY } from "../../constants/api";

export default function Game({ game }) {
  return (
    <Layout>
      <Head title={game.name} />
      <h1>{game.name}</h1>
      <Image
        src={game.background_image}
        alt={game.name}
        width="200"
        height="100"
        priority="true"
      />
      <p>Rating: {game.rating}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(BASE_URL + RAWG_KEY);

    const games = response.data.results;

    const paths = games.map((game) => ({
      params: { slug: game.slug },
    }));

    console.log(paths);

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${BASE_URL}/${params.slug}${RAWG_KEY}`;

  let game = null;

  try {
    const response = await axios.get(url);
    game = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { game: game },
  };
}
