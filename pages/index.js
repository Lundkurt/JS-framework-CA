import Head from "../components/layout/Head";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { BASE_URL, RAWG_KEY } from "../constants/api";
import Image from "next/image";
import { Circles } from "react-loader-spinner";
import { useState } from "react";

export default function Index(props) {
  console.log(props);

  const [loading, setLoading] = useState(false);

  function toggleLoading() {
    if (!loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Head title="" />
      <div className="games-container">
        {props.games.map((game) => {
          return (
            <div className="game-card" key={game.id}>
              <a href={`detail/${game.slug}`}>{game.name}</a>
              <Image
                className="games-img"
                src={game.background_image}
                alt={game.name}
                width="200"
                height="100"
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let games = [];

  try {
    const response = await axios.get(BASE_URL + RAWG_KEY);
    console.log(response.data);
    games = response.data.results;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      games: games,
    },
  };
}
